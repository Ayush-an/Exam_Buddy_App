// app/home/profile.tsx
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Profile() {
  const [image, setImage] = useState<string | null>(
    "https://via.placeholder.com/120"
  );
  const [form, setForm] = useState({ firstName: "Ayush", lastName: "Agrawal", mobile: "9657602184", email: "agrawalayush9657@gmail.com",
    dob: "24-07-2004", parentWhatsapp: "9657602184",});

  // Pick Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 1, });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: image! }} style={styles.avatar} />
        <Text style={styles.name}>
          {form.firstName} {form.lastName}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.uploadBtn]} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteBtn]}
            onPress={() => setImage("https://via.placeholder.com/120")}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Profile */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Edit Profile</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { marginRight: 8 }]}
            value={form.firstName}
            onChangeText={(t) => setForm({ ...form, firstName: t })}
            placeholder="First Name"
          />
          <TextInput
            style={[styles.input, { marginLeft: 8 }]}
            value={form.lastName}
            onChangeText={(t) => setForm({ ...form, lastName: t })}
            placeholder="Last Name"
          />
        </View>
        <TextInput
          style={styles.input}
          value={form.mobile}
          onChangeText={(t) => setForm({ ...form, mobile: t })}
          placeholder="Mobile"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={form.parentWhatsapp}
          onChangeText={(t) => setForm({ ...form, parentWhatsapp: t })}
          placeholder="Parent's WhatsApp"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={form.dob}
          onChangeText={(t) => setForm({ ...form, dob: t })}
          placeholder="Date of Birth"
        />
        <TouchableOpacity style={[styles.button, styles.uploadBtn, { alignSelf: "center", marginTop: 8 }]}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Performance Summary */}
      <View style={styles.row}>
        <View style={[styles.card, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.cardTitle}>Performance Summary</Text>
          <Text><Text style={styles.bold}>Subscription: </Text>Free</Text>
          <Text><Text style={styles.bold}>Papers Attempted: </Text>4</Text>
        </View>
        <View style={[styles.card, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.cardTitle}>Latest Attempt</Text>
          <Text><Text style={styles.bold}>Category: </Text>Beginner</Text>
          <Text><Text style={styles.bold}>Set: </Text>Physics</Text>
          <Text><Text style={styles.bold}>Score: </Text>4 / 4</Text>
        </View>
      </View>

      {/* Charts */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Latest Exam Chart</Text>
        <PieChart
          data={[
            { name: "Scored", population: 100, color: "green", legendFontColor: "#000" },
            { name: "Missed", population: 0, color: "red", legendFontColor: "#000" },
          ]}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="20"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Overall Performance</Text>
        <PieChart
          data={[
            { name: "Total Scored", population: 75, color: "green", legendFontColor: "#000" },
            { name: "Total Missed", population: 25, color: "red", legendFontColor: "#000" },
          ]}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Score Trend (Last 4 Exams)</Text>
        <BarChart
          data={{
            labels: ["Exam 1", "Exam 2", "Exam 3", "Exam 4"],
            datasets: [{ data: [4, 4, 3, 4] }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={{ borderRadius: 12 }}
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: () => "#4F46E5",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e0f2fe", // light
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  uploadBtn: {
    backgroundColor: "#2563eb",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  bold: {
    fontWeight: "600",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
});