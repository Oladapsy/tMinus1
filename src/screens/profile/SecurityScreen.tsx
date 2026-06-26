import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
// 🌟 Import your active query cache hook
import { useGetProfileQuery } from "@/src/services/profileApi";

export default function SecurityScreen() {
  const router = useRouter();

  // 🌟 Read current profile data (instant from RTK Query cache)
  const { data: profileResponse, isLoading } = useGetProfileQuery();
  const profile = profileResponse?.data;

  if (isLoading) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: Colors.newBlack }]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  // 🌟 Parse true system configurations from the server
  const is2FaEnabled = profile?.twoFactorEnabled ?? false;
  const isBiometricEnabled = profile?.settings?.biometricEnabled ?? false;

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
              title="Security"
              paragraph="Protect account access and sensitive actions."
              onBack={() => router.back()}
            />
          </View>

          {/* SECURITY CONFIGURATION LIST ROWS */}
          <View style={styles.menuSection}>
            <ProfileOptionRow
              title="Transaction PIN"
              subtitle="Required for trades and withdrawals"
              badgeText="Set" // Hardcoded for now until PIN endpoint is created
              onPress={() => router.push("/profile/security/pin")}
            />

            <ProfileOptionRow
              title="Authenticator app"
              // 🌟 Dynamic subtitle based on live backend state
              subtitle={
                is2FaEnabled
                  ? "Enabled for login protection"
                  : "Disabled · Tap to set up"
              }
              badgeText={is2FaEnabled ? "On" : "Off"}
              onPress={() => router.push("/profile/security/two-factor")}
            />

            <ProfileOptionRow
              title="Recovery codes"
              subtitle="8 backup codes remaining"
              badgeText="View"
              onPress={() => router.push("/profile/security/recovery-codes")}
            />

            <ProfileOptionRow
              title="Registered devices"
              subtitle="iPhone 15 Pro · push enabled"
              badgeText="2"
              onPress={() =>
                router.push("/profile/security/registered-devices")
              }
            />

            <ProfileOptionRow
              title="Biometric login"
              subtitle={
                isBiometricEnabled
                  ? "Face ID enabled on this device"
                  : "Tap to enable biometrics"
              }
              badgeText={isBiometricEnabled ? "On" : "Off"}
              onPress={() =>
                console.log("Toggle Biometrics via client hardware hooks")
              }
            />
          </View>

          {/* ADMIN CALLOUT WARNING BOX */}
          <View style={styles.warningBox}>
            <Title
              text="Admin will never ask for codes"
              size={13}
              fontFamily={FontFamily.bold}
            />
            <View style={styles.warningDescMargin}>
              <Paragraph
                text="Keep recovery codes private and regenerate them if exposed."
                color={Colors.newYellowWarning}
                size={12}
                lineHeight={17}
                textAlign="left"
              />
            </View>
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
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    marginTop: 14,
    marginBottom: 28,
  },
  menuSection: {
    width: "100%",
    gap: 12,
  },
  warningBox: {
    backgroundColor: Colors.newYellowSlim,
    borderRadius: 16,
    padding: 20,
    marginTop: 42,
    width: "100%",
  },
  warningDescMargin: {
    width: "100%",
    marginTop: 6,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
