import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors"; // <-- make sure this file exists and exports COLORS properly
import * as ImagePicker from "expo-image-picker";
import useAuthStore from "../../store/authStore";
import { API_URL } from "../../constants/api";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImageUri(asset.uri);
      }
    } catch (error) {
      console.error("Image pick error:", error);
      Alert.alert("Error", "Could not select image");
    }
  };

  const uploadImageToCloudinary = async (photoUri) => {
    try {
      const sigRes = await fetch(`${API_URL}/cloudinary/signature`);
      const sigText = await sigRes.text();
      console.log("Signature Response:", sigText);

      let sigData;
      try {
        sigData = JSON.parse(sigText);
      } catch (err) {
        throw new Error("Invalid signature response from backend (not JSON)");
      }

      const { timestamp, signature, apiKey, cloudName } = sigData;

      const formData = new FormData();
      formData.append("file", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const rawUploadText = await uploadRes.text();
      console.log("Cloudinary Upload Raw Response:", rawUploadText);

      try {
        const data = JSON.parse(rawUploadText);
        if (!uploadRes.ok) {
          throw new Error(data.error?.message || "Cloudinary upload failed");
        }
        return data.secure_url;
      } catch (err) {
        throw new Error("Cloudinary returned invalid JSON. Check network or credentials.");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageUri || !rating) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const cloudinaryUrl = await uploadImageToCloudinary(imageUri);

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: cloudinaryUrl,
        }),
      });

      const text = await response.text();
      console.log("Create book API raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Create book API returned invalid JSON");
      }

      if (!response.ok) throw new Error(data.message || "Failed to create post");

      Alert.alert("Success", "Your book recommendation has been posted!");
      setTitle("");
      setCaption("");
      setRating(3);
      setImageUri(null);
      router.push("/");
    } catch (error) {
      console.error("Create post error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
              size={32}
              color={i <= rating ? "#f4b400" : COLORS?.textSecondary || "#999"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="book-outline" size={20} color={COLORS?.textSecondary || "#999"} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS?.placeholderText || "#aaa"}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Rating</Text>
              {renderRatingPicker()}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS?.textSecondary || "#999"} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS?.placeholderText || "#aaa"}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS?.white || "#fff"} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={20} color={COLORS?.white || "#fff"} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
