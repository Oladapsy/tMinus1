import BackHeader from "@/src/components/common/BackHeader";
import MockFormInputCard from "@/src/components/common/MockFormInputCard";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PinInputField from "@/src/components/common/PinInputField";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TwoFactorSetupScreen() {
  const router = useRouter();

  // Interactive UI States
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [otpauthUri, setOtpauthUri] = useState(""); // Fixed: Now fully read below!

  // 1. Hook endpoint on mount: /auth/2fa/setup
  useEffect(() => {
    async function fetchSetupCredentials() {
      try {
        setLoading(true);

        // Mocking the real schema payload returned by your backend endpoint:
        const responseData = {
          data: {
            secret: "JBSWY3DPEHPK3PXP",
            otpauthUri:
              "otpauth://totp/CryptoClass%3Astudent%40cryptoclass.test?secret=JBSWY3DPEHPK3PXP&issuer=CryptoClass&algorithm=SHA1&digits=6&period=30",
            enabled: false,
          },
        };

        setSecretKey(responseData.data.secret);
        setOtpauthUri(responseData.data.otpauthUri);
      } catch (err) {
        console.error("Failed to initialize 2FA setup details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSetupCredentials();
  }, []);

  const handleCopyKey = () => {
    console.log("Secret key copied safely:", secretKey);
  };

  // Helper function utilizing the read value to deep-link directly into authenticator apps
  const handleOpenAuthenticatorApp = () => {
    if (!otpauthUri) return;
    Linking.openURL(otpauthUri).catch(() => {
      console.log(
        "No compatible authenticator app available to resolve URI deep link.",
      );
    });
  };

  // 2. Form submission execution: /auth/2fa/enable
  const handleEnable2FA = async () => {
    if (verificationCode.length < 6) return;

    try {
      setSubmitting(true);

      const responseData = {
        data: {
          enabled: true,
          recoveryCodes: [
            "A1B2C-D3E4F",
            "8A9B0-C1D2E",
            "C3D4E-F5G6H",
            "7B8C9-D0E1F",
            "E5F6G-H7I8J",
            "9C0D1-E2F3G",
            "G7H8I-J9K0L",
            "1D2E3-F4G5H",
          ],
          recoveryCodeCount: 8,
        },
      };

      console.log("2FA Enabled successfully! Moving to Recovery display.");

      // Fixed: Cast path string as an open route pattern to bypass strict TS router generation limits
      router.push({
        pathname: "/profile/security/recovery-codes" as any,
        params: { codes: JSON.stringify(responseData.data.recoveryCodes) },
      });
    } catch (err) {
      console.error(
        "Failed to verify validation code against server signature:",
        err,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <MySafeAreaView style={[styles.safeContainer, styles.centered]}>
          <ActivityIndicator size="large" color={Colors.green} />
        </MySafeAreaView>
      </ImageBackground>
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
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER SECTOR */}
          <View style={styles.pageTitle}>
            <BackHeader
              title="Authenticator app"
              paragraph="Link your account to an authenticator app for secure login verification."
              onBack={() => {
                router.back();
              }}
            />
          </View>

          {/* SETUP STEP CARDS */}
          <View style={styles.stepsContainer}>
            <Title
              text="Setup instructions"
              size={13}
              color={Colors.newWhite}
              fontFamily={FontFamily.bold}
            />

            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1.</Text>
              <View style={styles.stepTextContainer}>
                <Paragraph
                  text="Download an authenticator app like Google Authenticator or Microsoft Authenticator."
                  color={Colors.newSecondary}
                  size={12.5}
                  lineHeight={18}
                  textAlign="left"
                />
              </View>
            </View>

            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2.</Text>
              <View style={styles.stepTextContainer}>
                <Paragraph
                  text="Copy the secret key below into your authenticator app to generate verification codes."
                  color={Colors.newSecondary}
                  size={12.5}
                  lineHeight={18}
                  textAlign="left"
                />
              </View>
            </View>
          </View>

          {/* LIVE SECRET KEY DISPLAY */}
          <View style={styles.keyContainer}>
            <MockFormInputCard
              label="Secret key"
              value={secretKey}
              rightContent={
                <Pressable onPress={handleCopyKey} style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </Pressable>
              }
            />
          </View>

          {/* DYNAMIC READ ACTION LINK USING DEEP-LINKING URI */}
          <Pressable
            onPress={handleOpenAuthenticatorApp}
            style={styles.linkWrapper}
          >
            <Text style={styles.linkText}>
              Open Authenticator App Automatically
            </Text>
          </Pressable>

          {/* 6-DIGIT CODE CAPTURE INPUT FIELD */}
          <View style={styles.inputContainer}>
            <PinInputField
              label="Verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="••••••"
              maxLength={6}
            />
          </View>

          {/* SUBMIT TRIGGERS */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text={submitting ? "Enabling..." : "Enable Authenticator"}
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
              disabled={verificationCode.length < 6 || submitting}
            />
          </View>
        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: { flex: 1, backgroundColor: "transparent" },
  centered: { justifyContent: "center", alignItems: "center" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  pageTitle: { marginTop: 14, marginBottom: 28 },
  stepsContainer: {
    width: "100%",
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 22,
    gap: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 4,
  },
  stepNumber: {
    color: Colors.green,
    fontSize: 12.5,
    fontFamily: FontFamily.bold,
    lineHeight: 18,
  },
  stepTextContainer: { flex: 1 },
  keyContainer: { width: "100%", marginTop: 16 },
  copyButton: {
    backgroundColor: "rgba(0, 255, 128, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  copyButtonText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  linkWrapper: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 4,
  },
  linkText: {
    color: Colors.green,
    fontSize: 12.5,
    fontFamily: FontFamily.bold,
    textDecorationLine: "underline",
  },
  inputContainer: { width: "100%", marginTop: 16 },
  footerSection: { width: "100%", marginTop: 60 },
});
