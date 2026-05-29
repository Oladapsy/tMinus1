import Back from "@/assets/icons/main/backward.svg";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import IconAndText from "@/src/components/common/tab/IconAndText";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

export default function EditProfileScreen() {
  const [username, setUsername] = useState("Username1234");
  const [email, setEmail] = useState("example@mail.com");
  const [mobile, setMobile] = useState("+1 234 567 8900");
  const [password, setPassword] = useState("*********");

  return (
    <MySafeAreaView style={Style.container}>
      <LinearGradient
        colors={["#1B232A00", "rgba(94, 213, 168, 0.1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={Style.gradient}
      />

      {/* Header */}
      <View style={Style.headWrapper}>
        <IconAndText
          icon={<Back color={Colors.secondary} />}
          label="Edit Profile"
          labelStyle={Style.headLabel}
          onPress={() => router.back()}
          containerStyle={{ flexDirection: "row", gap: 10 }}
        />
      </View>

      {/* Profile Image with edit icon */}
      <View style={Style.imageWrapper}>
        <Image
          style={Style.profileImage}
          source={require("@/assets/images/profile/profileImage.png")}
        />
        <TouchableOpacity style={Style.cameraIcon}>
          <Text style={{ color: "white" }}>📷</Text>
        </TouchableOpacity>
      </View>

      {/* Editable fields */}
      <View style={Style.form}>
        <TextInput
          style={Style.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor={Colors.thinWhite}
        />
        <TextInput
          style={Style.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={Colors.thinWhite}
        />
        <TextInput
          style={Style.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          placeholderTextColor={Colors.thinWhite}
        />
        <TextInput
          style={Style.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={Colors.thinWhite}
        />
      </View>

      {/* Action buttons */}
      <View style={Style.actions}>
        <TouchableOpacity
          style={[Style.button, { backgroundColor: Colors.tabDark }]}
          onPress={() => router.back()}
        >
          <Text style={Style.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Style.button, { backgroundColor: Colors.green }]}
          onPress={() => console.log("Save changes")}
        >
          <Text style={[Style.buttonText, { color: Colors.primary }]}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </MySafeAreaView>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
  },
  headWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headLabel: {
    color: "white",
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 175,
    zIndex: -1,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: Colors.green,
    borderRadius: 20,
    padding: 6,
  },
  form: {
    marginTop: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.thinWhite,
    color: "white",
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: "white",
  },
});
