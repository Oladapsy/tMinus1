import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { useGet2FaStatusQuery } from "@/src/services/authApi";
// 🌟 1. IMPORT YOUR NEW DEVICES HOOK
import { useGetRegisteredDevicesQuery } from "@/src/services/profileApi";

// for biometrics
import * as LocalAuthentication from "expo-local-authentication";
import { getBiometricStatus, setBiometricStatus } from "@/src/utils/biometrics";
import { useToast } from "@/src/context/ToastContext";

export default function SecurityScreen() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getBiometricStatus().then(setIsBiometricEnabled);
  }, []);

  const handleToggleBiometrics = async () => {
    try {
      if (isBiometricEnabled) {
        // If it's already on, simply turn it off
        await setBiometricStatus(false);
        setIsBiometricEnabled(false);
        showToast?.("Biometric login disabled.", "success");
        return;
      }

      // Verify hardware support before activating
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        showToast?.(
          "Biometrics not configured or supported on this device.",
          "error",
        );
        return;
      }

      // Trigger OS prompt challenge
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to enable biometric login",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        await setBiometricStatus(true);
        setIsBiometricEnabled(true);
        showToast?.("Biometric login enabled successfully!", "success");
      }
    } catch (error) {
      showToast?.("An error occurred during biometric setup.", "error");
      console.log("Biometric setup error:", error);
    }
  };
  const router = useRouter();

  // Read current profile data (instant from RTK Query cache)
  const { data: response, isLoading: isLoading2Fa } = useGet2FaStatusQuery();

  // 🌟 2. FETCH LIVE DEVICE STATUS FROM CACHE
  const { data: devicesResponse, isLoading: isLoadingDevices } =
    useGetRegisteredDevicesQuery();

  if (isLoading2Fa || isLoadingDevices) {
    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: Colors.newBlack || "#000" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  // Parse true system configurations from the server
  const statusData = (response?.data || response) as any;
  const is2FaEnabled = statusData?.twoFactorEnabled ?? false;
  const remainingCodes = statusData?.recoveryCodesRemaining ?? 0;
  // const isBiometricEnabled = false;

  // 🌟 3. PARSE DYNAMIC DEVICE METRICS
  const registeredDevicesCount = devicesResponse?.data?.length || 1;

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
              badgeText="Set"
              onPress={() => router.push("/profile/security/pin")}
            />

            <ProfileOptionRow
              title="Authenticator app"
              subtitle={
                is2FaEnabled
                  ? "Enabled for login protection"
                  : "Disabled · Tap to set up"
              }
              badgeText={is2FaEnabled ? "On" : "Off"}
              onPress={() => {
                if (!is2FaEnabled) {
                  router.push("/profile/security/two-factor");
                }
              }}
            />

            {is2FaEnabled && (
              <ProfileOptionRow
                title="Recovery codes vault"
                subtitle={`${remainingCodes} active backups remaining`}
                badgeText="View Status"
                onPress={() =>
                  router.push("/profile/security/recovery-codes-vault")
                }
              />
            )}

            {is2FaEnabled && (
              <ProfileOptionRow
                title="Disable Authenticator (2FA)"
                subtitle="Remove multi-factor layout verification"
                badgeText="Turn Off"
                onPress={() => router.push("/profile/security/disable-2fa")}
              />
            )}

            {/* 🌟 4. DYNAMIC LIVE REGISTERED DEVICES ROW */}
            <ProfileOptionRow
              title="Registered devices"
              subtitle={`Authorized session platforms active`}
              badgeText={String(registeredDevicesCount)} // Displays exact count from server!
              onPress={() =>
                router.push("/profile/security/registered-devices")
              }
            />

            <ProfileOptionRow
              title="Biometric login"
              subtitle={
                isBiometricEnabled
                  ? "Face ID / Touch ID enabled on this device"
                  : "Tap to enable biometrics"
              }
              badgeText={isBiometricEnabled ? "On" : "Off"}
              onPress={handleToggleBiometrics}
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
