import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";
// const BASE_URL = `${API_URL}/api/auth'; // Use your actual IP

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true, // 🟡 Add this

  register: async (username, email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false }); // ✅ Mark check as done
    }
  },
 
login: async (email, password) => {
  set({ isLoading: true });

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Read as text first
    const text = await response.text();

    if (!text) {
      throw new Error('Server returned empty response.');
    }

    let data;
    try {
      data = JSON.parse(text); // Parse manually
    } catch (parseError) {
      throw new Error('Invalid JSON from server.');
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.token);

    set({ token: data.token, user: data.user, isLoading: false });

    return { success: true };
  } catch (error) {
    set({ isLoading: false });
    return { success: false, error: error.message };
  }
},



 logout: async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
  set({ token: null, user: null });
},

}));
export default useAuthStore;
