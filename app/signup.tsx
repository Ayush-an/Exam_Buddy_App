// app/signup.tsx
import API from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUp() {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [mobile_number, setMobile_Number] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [parent_number, setParent_Number] = useState("");
  const [whatsapp_number, setWhatsapp_Number] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // app/signup.tsx
const handleSignUp = async () => {
  if (
    !first_name ||
    !last_name ||
    !mobile_number ||
    !email ||
    !dob ||
    !parent_number ||
    !whatsapp_number ||
    !password ||
    !confirmPassword
  ) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await API.post("/user/register", {
      first_name,
      last_name,
      mobile_number,
      email,
      dob,
      parent_number,
      whatsapp_number,
      password,
    });

    if (response.data?.token) {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      router.replace("/home/dashboard");
    } else {
      alert(response.data?.message || "Signup failed");
    }
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <LinearGradient colors={["#f3f4f6", "#e5e7eb"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and start your journey 🚀</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.form,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Input placeholder="First Name" value={first_name} onChangeText={setFirst_Name} />
          <Input placeholder="Last Name" value={last_name} onChangeText={setLast_Name} />
          <Input
            placeholder="Mobile Number"
            value={mobile_number}
            onChangeText={setMobile_Number}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Date of Birth (DDMMYYYY)"
            value={dob}
            onChangeText={setDOB}
            keyboardType="number-pad"
            maxLength={8}
          />
          <Input
            placeholder="Parent Number"
            value={parent_number}
            onChangeText={setParent_Number}
            keyboardType="number-pad"
          />
          <Input
            placeholder="WhatsApp Number"
            value={whatsapp_number}
            onChangeText={setWhatsapp_Number}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.9}>
            <LinearGradient
              colors={["#10b981", "#059669"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signupButton}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    height: 52,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    height: "100%",
    fontSize: 16,
    color: "#111827",
  },
  signupButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },
  loginText: {
    color: "#10b981",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
});
