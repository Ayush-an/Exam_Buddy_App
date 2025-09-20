// app/home/settings.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Enable animation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const settingsData = [
  {
    question: "Change Password",
    answer: "Go to Profile > Security > Change Password. Enter your old password, then set a new one.",
  },
  {
    question: "Notification Preferences",
    answer: "You can turn exam reminders, announcements, and updates on/off under Notification Settings.",
  },
  {
    question: "Language Settings",
    answer: "Select your preferred app language in Settings > Language. Currently supported: English, Hindi.",
  },
  {
    question: "Privacy Options",
    answer: "Control who can see your profile and exam history under Settings > Privacy.",
  },
  {
    question: "Delete Account",
    answer: "To delete your account permanently, go to Settings > Account > Delete Account.",
  },
];

export default function Settings() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {settingsData.map((item, index) => (
        <View key={index} style={styles.item}>
          <TouchableOpacity style={styles.question} onPress={() => toggleItem(index)}>
            <Text style={styles.questionText}>{item.question}</Text>
            <Ionicons
              name={activeIndex === index ? "chevron-up" : "chevron-down"}
              size={22}
              color="#3b82f6"
            />
          </TouchableOpacity>

          {activeIndex === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff", // light pastel background
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a8a", // dark navy
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937", // slate gray
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: "#4b5563", // medium gray
    lineHeight: 20,
  },
});
