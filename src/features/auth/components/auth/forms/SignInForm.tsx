import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import SocialLoginButton from "../SocialLoginButton";
import FingerprintButton from "../FingerprintButton";
import AuthForm from "./AuthForm";
import Paragraph from "../../common/Paragraph";
import { Colors } from "@/src/constants/colors";

export default function SignInForm() {
  const [useEmail, setUseEmail] = useState(true);

  return (
    <View>
      <View style={styles.text}>
        <Title
          text="Sign in"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthForm
            fieldLabel={useEmail ? "Email" : "Mobile Number"}
            fieldPlaceholder={
              useEmail
                ? "Enter your email"
                : "Enter your mobile number"
            }
            fieldKeyboardType={
              useEmail
                ? "email-address"
                : "phone-pad"
            }
            toggleLinkText={
              useEmail
                ? "Sign in with mobile"
                : "Sign in with email"
            }
            onToggleLink={() => setUseEmail((prev) => !prev)}
            showForgotPassword
            buttonText="Sign in"
          />

          <View style={styles.extraText}>
            <Paragraph
              text="Or login with"
              color={Colors.secondary}
              size={14}
            />
          </View>

          <SocialLoginButton />
          <FingerprintButton />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    marginBottom: 10,
  },
  extraText: {
    marginTop: 20,
  },
});