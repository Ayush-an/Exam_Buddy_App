// app/welcome.tsx
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    image: require("../assets/images/login.png"),
    title: "The Best Time Of Your Soule",
    subtitle:
      "Exam Buddy is an online platform that helps you manage and track your exams seamlessly :)",
  },
  {
    image: require("../assets/images/welcome_image2.png"),
    title: "Fast & Secure",
    subtitle: "Your data and exam results are safe with industry-level security.",
  },
  {
    image: require("../assets/images/welcome_image3.png"),
    title: "Get Started Today",
    subtitle: "Sign up or login to begin your exam journey in just a few taps.",
  },
];

export default function Welcome() {
  const pagerRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      pagerRef.current?.setPage(currentIndex + 1);
    } else {
      router.replace("/login");
    }
  };

  const handleSkip = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo and Skip */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Exam_Buddy.png")} // put your KETY logo file
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.skipWrapper} onPress={handleSkip}>
          <View style={styles.skipBlob} />
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Pager */}
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
        ref={pagerRef}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.page}>
            <View style={styles.imageWrapper}>
              <View style={styles.circleBg} />
              <Image
                source={slide.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        ))}
      </PagerView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === currentIndex ? "#fb923c" : "#e5e7eb" },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? "Ready" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  logo: { width: 100, height: 100 },

  skipWrapper: {
    width: 90,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBlob: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#7c3aed", // purple background
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    transform: [{ rotate: "-00deg" }], // angled blob look
  },
  skipText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    zIndex: 1,
  },

  // Slide page
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60,
  },
  imageWrapper: {
  width: width * 0.7,
  height: width * 0.7,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
},
circleBg: {
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: width * 0.35,
  backgroundColor: "#e0f2fe",
},
image: {
  width: width * 0.80,  
  height: width * 0.80,  
  resizeMode: "contain",
},


  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  // Footer
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  nextButton: {
    backgroundColor: "#fb923c",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
