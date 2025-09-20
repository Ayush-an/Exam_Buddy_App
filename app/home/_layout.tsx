// app/home/_layout.tsx
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Drawer } from "expo-router/drawer";
import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "../../global.css";

function MenuButton({ label, icon, onPress }: any) {
  return (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <LinearGradient
      colors={["#e0f2fe", "#e0f2fe"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/Exam_Buddy.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.brand}>EXAM.BUDDY</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuWrapper}>
          <MenuButton
            label="Dashboard"
            icon={<MaterialIcons name="dashboard" size={22} color="#3b82f6" />}
            onPress={() => props.navigation.navigate("dashboard")}
          />
          <MenuButton
            label="Profile"
            icon={<Ionicons name="person-circle-outline" size={22} color="#3b82f6" />}
            onPress={() => props.navigation.navigate("profile")}
          />
          <MenuButton
            label="Examination"
            icon={<MaterialCommunityIcons name="file-document-outline" size={22} color="#3b82f6" />}
            onPress={() =>  console.log("Examination pressed")}
          />
          <MenuButton
            label="Subscription"
            icon={<FontAwesome5 name="box-open" size={20} color="#3b82f6" />}
            onPress={() => console.log("Subscription pressed")}
          />
          <MenuButton
            label="Settings"
            icon={<Ionicons name="settings-outline" size={22} color="#3b82f6" />}
            onPress={() => props.navigation.navigate("settings")}
          />
          <MenuButton
            label="Support"
            icon={<Ionicons name="help-circle-outline" size={22} color="#3b82f6" />}
            onPress={() => props.navigation.navigate("support")}
          />
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.animationWrapper}>
          <LottieView
            source={require("../../assets/images/Animation1.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => props.navigation.navigate("login")}>
  {/* go to login page */}
  <Ionicons name="power-outline" size={18} color="#ef4444" />
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

      </View>
    </LinearGradient>
  );
}
export default function HomeLayout() {
  return (
    <Drawer
      initialRouteName="dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#facc15",
        drawerLabelStyle: { fontSize: 16 },
        headerStyle: {
          backgroundColor: "#e0f2fe",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#000",
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerRight: () => (
  <View>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.profileChip}
    >
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
        style={styles.profileImage}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.profileName}>Ayush</Text>
        <Text style={styles.profileRole}>Student</Text>
      </View>
    </TouchableOpacity>
  </View>
)

        }}
      />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
      <Drawer.Screen name="support" options={{ title: "Support" }} />
      <Drawer.Screen name="welcome" options={{ title: "welcome" }} />
      <Drawer.Screen name="login" options={{ title: "Login" }} />
      <Drawer.Screen name="signup" options={{ title: "Sign Up" }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
    
  },
  logoWrapper: {
    backgroundColor: "#e0f2fe",
    padding: 10,
    borderRadius: 50,
   
  },
  logo: { width: 60, height: 70, resizeMode: "contain" },
  brand: {
    color: "#1e3a8a",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 12,
  },
  menuWrapper: { marginTop: 20 },
  menuBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconWrapper: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1f2937",
  },
  bottomSection: {
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
  },
  animationWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  animation: { width: 180, height: 140 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#fee2e2",
  },
  logoutText: {
    color: "#b91c1c",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 15,
  },
  profileChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 30,
    borderBottomRightRadius:0,
    borderTopRightRadius:0,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  profileImage: {
    width: 35,
    height: 40,
    borderRadius: 16,
  },
  profileName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  profileRole: {
    fontSize: 12,
    color: "#6b7280",
  },
});
