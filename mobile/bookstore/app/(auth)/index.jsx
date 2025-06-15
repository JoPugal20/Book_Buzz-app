import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import  useAuthStore  from "../../store/authStore";
import { useRouter } from "expo-router";


const COLORS = {
  primary: "#4CAF50",
  placeholderText: "#999",
};



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { isLoading, login } = useAuthStore();
  const router = useRouter();
  

const handleLogin = async () => {
  setErrorMessage("");

  if (!email || !password) {
    setErrorMessage("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    setErrorMessage("Password must be at least 6 characters long.");
    return;
  }

  const result = await login(email, password);

  if (!result.success) {
    setErrorMessage(result.error || "Invalid email or password.");
  } else {
    router.replace("/(tabs)"); // 👈 working now
  }
};




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          {/* ILLUSTRATION */}
          <View style={styles.topIllustration}>
            <Image
              source={require("../../assets/images/i2.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* FORM CARD */}
          <View style={styles.card}>
            <View style={styles.formContainer}>
              {/* EMAIL */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* PASSWORD */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>

              {/* ERROR MESSAGE */}
              {errorMessage !== "" && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errorMessage}
                </Text>
              )}

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* FOOTER */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
  <Text style={styles.link}>Sign Up</Text>
</TouchableOpacity>


              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9f5ec",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 40,
  },
  topIllustration: {
    marginTop: 50,
    alignItems: "center",
  },
  illustrationImage: {
    width: "80%",
    height: 200,
  },
  card: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  link: {
    marginLeft: 5,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
