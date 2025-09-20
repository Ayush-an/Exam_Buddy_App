// src/app/Home/dashboard.tsx
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const levelSections = {
  Beginner: ["Beginner", "Intermediate", "Advanced", "Pro Advanced"],
  Intermediate: [
    "Beginner Challenge",
    "Intermediate Challenge",
    "Advanced Challenge",
    "Pro Advanced Challenge",
  ],
  Advanced: [
    "Beginner Level",
    "Intermediate Level",
    "Advanced Level",
    "Pro Advanced Level",
  ],
};

const sectionColors = ["#e0f2fe", "#fef9c3", "#fce7f3", "#ede9fe"];
const sectionIcons = [
  "https://cdn-icons-png.flaticon.com/512/1041/1041888.png",
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  "https://cdn-icons-png.flaticon.com/512/190/190411.png",
];

const Dashboard: React.FC = () => {
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Beginner"
  );

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dateText}>{today}</Text>
          <Text style={styles.welcomeText}>Welcome back, Ayush 👋</Text>
          <Text style={styles.subText}>Ready to continue your journey?</Text>
        </View>
      </Animated.View>

      {/* Level Buttons */}
      <View style={styles.levelContainer}>
        {levels.map((lvl, i) => {
          const scale = useSharedValue(1);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }));

          return (
            <Animated.View
              key={lvl}
              entering={FadeInDown.delay(200 + i * 100)}
              style={[{ flex: 1, marginHorizontal: 4 }, animatedStyle]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.levelButton,
                  lvl === level
                    ? styles.levelButtonActive
                    : styles.levelButtonInactive,
                ]}
                onPressIn={() => {
                  scale.value = withSpring(0.95);
                }}
                onPressOut={() => {
                  scale.value = withSpring(1);
                }}
                onPress={() => setLevel(lvl as any)}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    lvl === level ? { color: "white" } : { color: "#374151" },
                  ]}
                >
                  {lvl}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Sections */}
      <Text style={styles.sectionTitle}>{level} Study Sections</Text>
      <View style={styles.sectionWrapper}>
        {levelSections[level].map((title, idx) => {
          const scale = useSharedValue(1);
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }));

          return (
            <Animated.View
              key={title}
              entering={FadeInDown.delay(400 + idx * 120)}
              style={[styles.sectionCard, { backgroundColor: sectionColors[idx] }, animatedStyle]}
            >
              <TouchableOpacity
  activeOpacity={0.9}
  onPressIn={() => { scale.value = withSpring(0.96); }}
  onPressOut={() => { scale.value = withSpring(1); }}
>
  <Image
    source={{ uri: sectionIcons[idx] }}
    style={styles.sectionIcon}
    resizeMode="contain"
  />
  <Text style={styles.sectionText}>{title}</Text>
  <Text
    style={[styles.priceText, { color: level === "Beginner" ? "#16a34a" : "#dc2626" }]}
  >
    {level === "Beginner" ? "Free" : "Premium"}
  </Text>
</TouchableOpacity>

            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    marginBottom: 24,
    backgroundColor: "#2563eb",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#e0f2fe",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 6,
  },
  subText: {
    fontSize: 14,
    color: "#bfdbfe",
    marginTop: 4,
  },
  levelContainer: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",
  },
  levelButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  levelButtonActive: {
    backgroundColor: "#f97316",
  },
  levelButtonInactive: {
    backgroundColor: "#e5e7eb",
  },
  levelButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  sectionWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionCard: {
    width: "48%",
    marginBottom: 16,
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionIcon: {
    width: 70,
    height: 70,
    marginBottom: 12,
  },
  sectionText: {
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    color: "#1f2937",
  },
  priceText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
  },
});
export default Dashboard;