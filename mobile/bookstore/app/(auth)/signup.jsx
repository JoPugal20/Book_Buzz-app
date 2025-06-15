import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useAuthStore  from "../../store/authStore";

const COLORS = {
  primary: "#4CAF50",
  background: "#e9f5ec",
  card: "#fff",
  text: "#333",
};

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, isLoading ,register, token } = useAuthStore();
  const router = useRouter();

 const handleSignUp = async () => {
  console.log("Sign Up button pressed");

  if (!username || !email || !password) {
    Alert.alert("Error", "All fields are required");
    return;
  }

  setLoading(true);
  setTimeout(async () => {
    const result = await register(username, email, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert("Error", result.error);
    } else {
      Alert.alert("Success", "Account created!");
      router.replace("/"); // or "/login"
    }
  }, 1500);
};
// console.log(user)
// console.log(token)


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BookBuzz 📖💬</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={COLORS.primary} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color={COLORS.primary} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              contextMenuHidden={true}
              selectTextOnFocus={false}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
              <Text style={styles.link} onPress={() => router.replace("/")}>
                {" "}Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2fdf5",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: "100%",
    marginBottom: 15,
    borderWidth: 1.2,
    borderColor: COLORS.primary,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.text,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
