import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { useLocalSearchParams, router } from "expo-router";

import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

import {
  useVerifyEmailOtpMutation,
  useRequestEmailOtpMutation,
} from "@/src/features/auth/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/src/store/authSlice";
import { useToast } from "@/src/context/ToastContext";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import NavigateIconText from "@/src/features/shared/components/NavigateIconText";
import Title from "@/src/features/shared/components/Title";
import Paragraph from "@/src/features/shared/components/Paragraph";
import OTPInput from "@/src/features/auth/components/auth/OTPInput";
import ResendTimer from "@/src/features/auth/components/auth/ResendTimer";
import PrimaryButton from "@/src/features/shared/components/PrimaryButton";
// 🌟 Import your toast hook context

export default function OtpScreen() {
  const { email, codeOnMount } = useLocalSearchParams<{
    email: string;
    codeOnMount?: string;
  }>();
  const dispatch = useDispatch();

  // 🌟 Bring in the toast trigger function
  const { showToast } = useToast();

  const [code, setCode] = useState("");

  const [verifyEmailOtp, { isLoading: isSubmitting }] =
    useVerifyEmailOtpMutation();
  const [requestEmailOtp] = useRequestEmailOtpMutation();

  const handleCompleteOTP = (completedCode: string) => {
    setCode(completedCode);
  };

  const handleVerifySubmit = async () => {
    if (code.length < 6) {
      showToast(
        "Please enter the complete 6-digit validation code.",
        "warning",
      );
      return;
    }

    try {
      const response = await verifyEmailOtp({
        email: email!,
        code: code,
      }).unwrap();

      if (response?.data?.accessToken) {
        dispatch(setCredentials(response.data));

        // 🌟 Trigger success state animation notice
        showToast("Authentication successful! Welcome back.", "success");

        router.replace("/(tabs)/home");
      } else {
        router.push("/(auth)/success");
      }
    } catch (err: any) {
      const msg =
        err?.data?.error?.message ||
        err?.data?.message ||
        "Invalid verification code.";
      // 🌟 Trigger error toast notification overlay layout
      showToast(msg, "error");
    }
  };

  const handleResendOtp = async () => {
    try {
      // 1. Attempt to hit your RTK-Query mutation trigger endpoint
      const response = await requestEmailOtp({ email: email! }).unwrap();

      // 2. Extract code, falling back to 123456 if undefined
      const nextCode = response?.data?.demoCode || "123456";

      // 3. Trigger the success toast
      showToast(`A fresh code has been issued: ${nextCode}`, "success");
    } catch (err: any) {
      console.warn(
        "OTP Resend network catch triggered, falling back to demo mode:",
        err,
      );

      showToast("Demo Code Reissued: 123456", "success");
    }
  };

  // 🌟 TRIGGER TOAST ON LANDING
  useEffect(() => {
    if (codeOnMount) {
      const timer = setTimeout(() => {
        showToast(`Demo verification code: ${codeOnMount}`, "success");
      }, 150); // Small buffer lets screen entry layout paint gracefully first!

      return () => clearTimeout(timer);
    }
  }, [codeOnMount, showToast]);

  return (
    <MySafeAreaView style={styles.container}>
      <View style={styles.topIcon}>
        <NavigateIconText title="Verification" onClickIcon={router.back} />
      </View>

      <View style={styles.title}>
        <Title
          text="Enter your code"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
        />
      </View>

      <View>
        <Paragraph
          text="Please type the code we sent to"
          textAlign="left"
          size={14}
        />
      </View>

      <View style={styles.identifierRow}>
        <Paragraph
          text={email || "your-email@domain.com"}
          textAlign="left"
          size={14}
          color={Colors.green}
        />
      </View>

      {/* ✂️ REMOVED: Old manual red errorBanner code blocks for pristine clean alignment! */}

      <View style={styles.inputWrapper}>
        <OTPInput length={6} onComplete={handleCompleteOTP} />
      </View>

      <ResendTimer seconds={42} onResend={handleResendOtp} />

      <View style={styles.buttonWrapper}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color={Colors.green} />
        ) : (
          <PrimaryButton
            text="Continue"
            onPress={handleVerifySubmit}
            Bgcolor={Colors.green}
            textColor={Colors.darkText}
          />
        )}
      </View>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 24,
  },
  topIcon: { marginTop: 5 },
  title: { marginTop: 26, marginBottom: 16 },
  identifierRow: { marginBottom: 12 },
  inputWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  buttonWrapper: { marginTop: 40 },
});
