import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView, // 🌟 Import KeyboardAvoidingView
  Platform, // 🌟 Import Platform to adjust behaviors
  TouchableWithoutFeedback, // 🌟 Optional: To dismiss keyboard by tapping outside
  Keyboard,
} from "react-native";
import { useVerify2FaMutation } from "@/src/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/src/store/authSlice";
import * as SecureStore from "expo-secure-store";

export default function TwoFactorVerificationScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  const [verify2Fa, { isLoading }] = useVerify2FaMutation();
  const [code, setCode] = useState("");
  const [isUsingRecovery, setIsUsingRecovery] = useState(false);

  const dispatch = useDispatch();

  const handleContinue = async () => {
    if (!code) return;

    try {
      const payload = isUsingRecovery
        ? { challengeId, recoveryCode: code }
        : { challengeId, code };

      const response = await verify2Fa(payload).unwrap();

      if (response && response.data) {
        await SecureStore.setItemAsync(
          "user_session",
          JSON.stringify(response.data),
        );
        dispatch(setCredentials(response.data));
      }

      const userName = response?.data?.user?.fullName || "User";
      showToast?.(`Welcome back, ${userName}!`, "success");
    } catch (err: any) {
      showToast?.(err?.data?.message || "Verification failed.", "error");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        {/* 🌟 KEYBOARD AVOIDING WRAPPER */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidContainer}
        >
          {/* Tapping layout space automatically dismisses input frame focus */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContent}>
              <View>
                <BackHeader
                  title="Two-factor auth"
                  paragraph={
                    isUsingRecovery
                      ? "Enter one of your backup recovery codes."
                      : "Enter the code from your authenticator app."
                  }
                  onBack={() => router.back()}
                />

                {/* Dynamic Abstract Visual Ring Segment */}
                <View style={styles.visualContainer}>
                  <View style={styles.outerRing}>
                    <View style={styles.innerRing}>
                      <Text style={styles.dotPlaceholder}>••••••</Text>
                    </View>
                  </View>
                </View>

                {/* Input Block */}
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.customInput}
                    value={code}
                    onChangeText={setCode}
                    placeholder={isUsingRecovery ? "XXXXX-XXXXX" : "Enter Code"}
                    placeholderTextColor={Colors.newSecondary}
                    keyboardType={isUsingRecovery ? "default" : "numeric"}
                    maxLength={isUsingRecovery ? 11 : 6}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              {/* Action Button Blocks */}
              <View style={styles.footerSection}>
                <PrimaryButton
                  text={isLoading ? "Verifying..." : "Continue"}
                  Bgcolor={code.length >= 6 ? Colors.green : Colors.newDark}
                  textColor={
                    code.length >= 6 ? Colors.newBlack : Colors.newSecondary
                  }
                  fontSize={13}
                  style={{ fontFamily: FontFamily.bold, marginBottom: 12 }}
                  onPress={handleContinue}
                  disabled={!code || isLoading}
                />

                <PrimaryButton
                  text={
                    isUsingRecovery
                      ? "Use authenticator app pin"
                      : "Use recovery code"
                  }
                  Bgcolor="transparent"
                  textColor={Colors.newSecondary}
                  fontSize={13}
                  style={styles.outlineBtn}
                  onPress={() => {
                    setCode("");
                    setIsUsingRecovery(!isUsingRecovery);
                  }}
                />
              </View>

              {/* Bottom Banner Card Callout */}
              <View style={styles.protectedCard}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
                <View style={styles.protectedTextContent}>
                  <Text style={styles.protectedTitle}>Protected account</Text>
                  <Text style={styles.protectedSubtitle}>
                    This extra step protects your trading balance and saved
                    devices.
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  visualContainer: { alignItems: "center", marginTop: 20 },
  outerRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(0, 255, 128, 0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 128, 0.05)",
  },
  innerRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    justifyContent: "center",
    alignItems: "center",
  },
  dotPlaceholder: { color: Colors.green, fontSize: 18, letterSpacing: 2 },
  inputWrapper: { marginTop: 30 },
  customInput: {
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    height: 56,
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: FontFamily.bold,
    letterSpacing: 1,
  },
  footerSection: { marginTop: "auto" },
  outlineBtn: { borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)" },
  protectedCard: {
    flexDirection: "row",
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    gap: 14,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 255, 128, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: { color: Colors.green, fontSize: 14, fontFamily: FontFamily.bold },
  protectedTextContent: { flex: 1 },
  protectedTitle: {
    color: "white",
    fontSize: 13,
    fontFamily: FontFamily.bold,
    marginBottom: 2,
  },
  protectedSubtitle: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
    lineHeight: 15,
  },
});
