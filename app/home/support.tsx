// app/home/support.tsx
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Support() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to Settings > Account > Reset Password and follow the instructions.",
    },
    {
      question: "How can I view my exam results?",
      answer:
        "You can view results in the Dashboard under the 'Results' tab once graded.",
    },
    {
      question: "Can I retake a test?",
      answer:
        "Yes, retakes are allowed if your instructor enabled them. Check your test details.",
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Support</Text>

      <Text style={styles.subHeader}>Frequently Asked Questions</Text>
      {faqs.map((item, index) => (
        <View key={index} style={styles.faqCard}>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
          </TouchableOpacity>
          {expandedIndex === index && (
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          )}
        </View>
      ))}

      <Text style={styles.subHeader}>Contact Support</Text>
      <TextInput style={styles.input} placeholder="Your Name" />
      <TextInput style={styles.input} placeholder="Your Email" />
      <TextInput
        style={[styles.input, styles.messageBox]}
        placeholder="Your Message"
        multiline
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f9ff",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1e293b",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: "#1e3a8a",
  },
  faqCard: {
    marginBottom: 12,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },
  faqAnswer: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  messageBox: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
