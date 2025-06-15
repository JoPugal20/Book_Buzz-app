import { Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { ActivityIndicator, View } from "react-native";


// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token, isCheckingAuth } = useAuthStore();

//     useEffect(() => {
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded]);
// }


  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isCheckingAuth || segments.length === 0) return; // ✅ Wait here

    const isAuthScreen = segments[0] === "(auth)";
    const isLoggedIn = user && token;

    if (!isLoggedIn && !isAuthScreen) {
      router.replace("/(auth)");
    } else if (isLoggedIn && isAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [segments, user, token, isCheckingAuth]);

  // Optional: loading spinner while checking auth
  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
