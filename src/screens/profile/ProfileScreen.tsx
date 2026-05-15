import Back from "@/assets/icons/main/backward.svg";
import ListItem from "@/src/components/common/ListItem";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import IconAndText from "@/src/components/common/tab/IconAndText";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const username = "User1234";
  return (
    <MySafeAreaView style={Style.container}>
      <LinearGradient
        colors={["#1B232A00", "rgba(94, 213, 168, 0.1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={Style.gradient}
      />
      <View style={Style.headWrapper}>
        <IconAndText
          icon={<Back color={Colors.secondary} />}
          label="Profile"
          labelStyle={Style.headLabel}
          onPress={() => {
            router.back();
          }}
          containerStyle={{ flexDirection: "row", gap: 10 }}
        />
      </View>

      {/* Profile Image */}
      <Image
        style={Style.profileImage}
        source={require("@/assets/images/profile/profileImage.png")}
      />

      <View style={Style.content}>
        <Title
          text={username}
          size={18}
          fontFamily={FontFamily.bold}
          textAlign="center"
        />

        {/* List Item */}
        <View style={Style.list}>
          <ListItem
            label="Username"
            value="Username1234"
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <ListItem
            label="Email"
            value="example@mail.com"
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <ListItem
            label="Mobile Number"
            value="+1 234 567 8900"
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <ListItem
            label="Password"
            value="*********"
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <ListItem
            label="Settings"
            value=""
            onPress={() => router.push("/settings/Settings")}
          />
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  headLabel: {
    color: "white",
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  //gradient
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 175,
    zIndex: -1,
  },
  profileImage: {
    borderRadius: 100,
    position: "absolute",
    top: 115,
    left: "40%",
  },
  content: {
    marginTop: 150,
  },
  list: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.thinWhite,
    marginTop: 30,
  },
});
