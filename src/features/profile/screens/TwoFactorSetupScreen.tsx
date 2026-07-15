import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PinInputField from "@/src/components/common/PinInputField";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import {
  useSetup2FaMutation,
  useEnable2FaMutation,
} from "@/src/features/auth/api/authApi";
import { useToast } from "@/src/context/ToastContext";

export default function TwoFactorSetupScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [triggerSetup, { data: setupResponse, isLoading: isSetupLoading }] =
    useSetup2FaMutation();
  const [enable2Fa, { isLoading: isSubmitting }] = useEnable2FaMutation();
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    triggerSetup();
  }, [triggerSetup]);

  const secretKey = setupResponse?.data?.secret || "";
  const otpauthUri = setupResponse?.data?.otpauthUri || "";

  const handleCopyKey = async () => {
    if (!secretKey) return;
    await Clipboard.setStringAsync(secretKey);
    showToast?.("Copied!");
  };

  const handleEnable2FA = async () => {
    if (verificationCode.length !== 6) return;
    try {
      const responseData = await enable2Fa({ code: verificationCode }).unwrap();
      router.push({
        pathname: "/profile/security/recovery-codes" as any,
        params: { codes: JSON.stringify(responseData.data.recoveryCodes) },
      });
    } catch (err: any) {
      showToast?.(err?.data?.message || "Invalid code.", "error");
    }
  };

  if (isSetupLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: Colors.newBlack }]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
        >
          <BackHeader
            title="Set up 2FA"
            paragraph="Scan code or copy key into your authenticator app."
            onBack={() => router.back()}
          />

          {/* QR Code */}
          {otpauthUri ? (
            <View style={styles.qrCard}>
              <QRCode
                value={otpauthUri}
                size={130}
                color="black"
                backgroundColor="white"
              />
            </View>
          ) : null}

          {/* Compact Secret Key Input */}
          <View style={styles.keyContainer}>
            <Text style={styles.label}>Secret Key</Text>
            <View style={styles.inputRow}>
              <Text style={styles.secretText} numberOfLines={1}>
                {secretKey || "Generating..."}
              </Text>
              <Pressable onPress={handleCopyKey} style={styles.copyButton}>
                <Text style={styles.copyText}>Copy</Text>
              </Pressable>
            </View>
          </View>

          {/* Verification Code */}
          <View style={styles.inputContainer}>
            <PinInputField
              label="Enter 6-digit Authenticator Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="••••••"
              maxLength={6}
            />
          </View>

          {/* Action Button */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text={isSubmitting ? "Enabling..." : "Enable 2FA"}
              Bgcolor={
                verificationCode.length === 6 ? Colors.green : Colors.newDark
              }
              textColor={
                verificationCode.length === 6
                  ? Colors.newBlack
                  : Colors.newSecondary
              }
              fontSize={13}
              style={{ fontFamily: FontFamily.bold }}
              onPress={handleEnable2FA}
              disabled={verificationCode.length !== 6 || isSubmitting}
            />
          </View>
        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 24,
  },
  qrCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  keyContainer: {
    marginTop: 20,
  },
  label: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: Colors.newDark,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  secretText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Courier",
    flex: 1,
    marginRight: 10,
  },
  copyButton: {
    backgroundColor: "rgba(0, 255, 128, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  copyText: {
    color: Colors.green,
    fontSize: 11,
    fontFamily: FontFamily.bold,
  },
  inputContainer: {
    marginTop: 12,
  },
  footerSection: {
    marginTop: 70,
  },
});
