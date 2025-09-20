// app/login.tsx
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";

import API from "@/services/api"; // import axios instance
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const [mobile_number, setMobile_Number] = useState("");
  const [password, setPassword] = useState("");

  // app/login.tsx
const handleLogin = async () => {
  if (!mobile_number || !password) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    const response = await API.post("/user/login", { mobile_number, password });


    if (response.data?.token) {
      const token = await AsyncStorage.getItem("token");
console.log("Saved token:", token);
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      router.replace("/home/dashboard");
    } else {
      alert(response.data?.message || "Login failed");
    }
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Logo */}
        <Image
          source={require("../assets/images/Exam_Buddy.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Card */}
        <View style={styles.card}>
          {/* Mobile Number */}
          <View style={styles.inputContainer}>
            <Feather name="phone" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              value={mobile_number}
              onChangeText={setMobile_Number}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Ionicons name="eye-outline" size={20} color="#555" />
          </View>

          {/* Forgot Password */}
          <Text
            style={styles.forgot}
            onPress={() => router.push("/home/dashboard")}
          >
            Forgot Password?
          </Text>

          {/* Login Button */}
          <TouchableOpacity activeOpacity={0.9} onPress={handleLogin} style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#f59e0b", "#f97316"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.divider}>- OR -</Text>

          {/* Social Login */}
          <View style={styles.socialRow}>
            <Ionicons name="logo-google" size={28} color="#db4437" />
            <Ionicons name="logo-facebook" size={28} color="#1877f2" />
            <Ionicons name="logo-apple" size={28} color="#000" />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <Text style={styles.signup} onPress={() => router.push("/signup")}>
              {" "}
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#111",
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#f97316",
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#f97316",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    textAlign: "center",
    color: "#6b7280",
    marginVertical: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },
  signup: {
    color: "#f97316",
    fontWeight: "700",
    fontSize: 14,
  },
});
