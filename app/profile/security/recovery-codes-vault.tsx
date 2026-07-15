import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import { useRouter } from "expo-router";
import React, { useMemo, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useGet2FaStatusQuery } from "@/src/features/auth/api/authApi";

export default function RecoveryCodesVaultScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  // Fetch real live security status from your RTK cache hook
  const { data: response, isLoading, isSuccess } = useGet2FaStatusQuery();

  // CAST TO 'ANY' TO INSTANTLY SMASH THE TYPESCRIPT ERRORS:
  const statusData = (response?.data || response) as any;

  // 💡 TRIGGER TOAST UPON SUCCESSFUL FETCH
  useEffect(() => {
    if (isSuccess && statusData) {
      const remaining = statusData.recoveryCodesRemaining ?? 0;
      showToast?.(
        `Vault sync complete. ${remaining} active recovery slots found.`,
        "success",
      );
    }
  }, [isSuccess, statusData]);

  // Create visual tracking slots based on remaining codes count
  const trackingSlots = useMemo(() => {
    if (!statusData) return [];

    const remaining = statusData.recoveryCodesRemaining ?? 0;
    const totalPossibleSlots = 8;

    const slots = [];
    for (let i = 0; i < totalPossibleSlots; i++) {
      if (i < remaining) {
        slots.push({ label: `🔑 Code Slot ${i + 1}`, used: false });
      } else {
        slots.push({ label: "🔒 Redeemed Slot", used: true });
      }
    }
    return slots;
  }, [statusData]);

  if (isLoading) {
    return (
      <MySafeAreaView
        style={[
          styles.safeContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
        <Text style={styles.loadingText}>Loading account vault...</Text>
      </MySafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <BackHeader
          title="Recovery codes"
          paragraph="Review your backup security status. Spent codes cannot be used a second time."
          onBack={() => router.back()}
        />

        {/* Dynamic Display Layout Container */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Status Metric Callout Badge */}
          <View style={styles.statusBanner}>
            <Text style={styles.bannerTitle}>
              Active Backups:{" "}
              <Text style={{ color: Colors.green }}>
                {statusData?.recoveryCodesRemaining ?? 0} left
              </Text>
            </Text>
            <Text style={styles.bannerSubtitle}>
              {statusData?.recoveryCodesConfigured
                ? "Your recovery system is fully initialized and operational."
                : "Recovery codes haven't been generated for this device yet."}
            </Text>
          </View>

          {/* Grid of Codes/Slots matching the structural grid look */}
          <View style={styles.gridContainer}>
            {trackingSlots.map((item, index) => (
              <View
                key={index}
                style={[styles.codeCard, item.used && styles.codeCardUsed]}
              >
                <Text
                  style={[styles.codeText, item.used && styles.codeTextUsed]}
                >
                  {item.label}
                </Text>

                {/* Dynamic Status Pill */}
                <View
                  style={[
                    styles.statusPill,
                    item.used ? styles.statusPillUsed : styles.statusPillUnused,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusPillText,
                      item.used
                        ? styles.statusPillTextUsed
                        : styles.statusPillTextUnused,
                    ]}
                  >
                    {item.used ? "Used" : "Active"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Footer actions block */}
        <View style={styles.footerSection}>
          <PrimaryButton
            text="Go to Account Settings"
            Bgcolor={Colors.green}
            textColor={Colors.darkText || "#000"}
            fontSize={13}
            style={{ fontFamily: FontFamily.bold }}
            onPress={() => router.back()}
          />
        </View>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  scrollContainer: { flex: 1, marginTop: 24 },
  loadingText: {
    color: "white",
    marginTop: 12,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  statusBanner: {
    backgroundColor: Colors.newDark || "#121318",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  bannerTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: FontFamily.bold,
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: Colors.newSecondary || "#888",
    fontSize: 12,
    fontFamily: FontFamily.regular,
    lineHeight: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  codeCard: {
    width: "48%",
    backgroundColor: Colors.newDark || "#121318",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },
  codeCardUsed: {
    opacity: 0.35,
    borderColor: "transparent",
    backgroundColor: "rgba(18, 19, 24, 0.5)",
  },
  codeText: {
    color: "white",
    fontSize: 13,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  codeTextUsed: { textDecorationLine: "line-through", color: "#666" },
  statusPill: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 52,
    alignItems: "center",
  },
  statusPillUnused: { backgroundColor: "rgba(0, 255, 128, 0.1)" },
  statusPillUsed: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  statusPillText: { fontSize: 10, fontFamily: FontFamily.medium },
  statusPillTextUnused: { color: Colors.green },
  statusPillTextUsed: { color: Colors.newSecondary || "#888" },
  footerSection: { marginTop: 20 },
});
