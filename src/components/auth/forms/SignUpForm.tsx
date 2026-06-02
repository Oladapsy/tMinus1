import { StyleSheet, View } from "react-native";
import React from "react";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import SocialLoginButton from "../SocialLoginButton";
import AuthForm from "./AuthForm";
import { router } from "expo-router";
import Paragraph from "../../common/Paragraph";
import { Colors } from "@/src/constants/colors";

export default function SignUpForm() {
  return (
    <View>
      <View style={styles.text}>
        <Title
          text="Sign up"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
        />
      </View>
      {/* The form */}
      <AuthForm
        fieldLabel="Email"
        fieldPlaceholder="Please enter email"
        fieldKeyboardType="email-address"
        toggleLinkText="Register with mobile"
        onToggleLink={() => router.push("/(auth)/signup-mobile")}
        showForgotPassword={false}
        buttonText="Sign up"
      />

      <View style={styles.extraText}>
        <Paragraph text="Or login with" color={Colors.secondary} size={14} />
      </View>

      <SocialLoginButton />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    marginBottom: 10,
  },
  extraText: {
    marginVertical: 10,
  },
});
