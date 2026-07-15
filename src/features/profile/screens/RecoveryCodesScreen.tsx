import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// 🌟 TypeScript warning resolved! Now securely importing the real live hook
import { useRegenerate2FaCodesMutation } from "@/src/features/auth/api/authApi";

export default function RecoveryCodesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { showToast } = useToast();

  // 🌟 Real RTK Mutation State Management
  const [regenerate2FaCodes, { isLoading: isRegenerating }] =
    useRegenerate2FaCodesMutation();
  const [currentCodes, setCurrentCodes] = useState<string[] | null>(null);

  const recoveryCodes: string[] = useMemo(() => {
    if (currentCodes) return currentCodes;

    if (params?.codes && typeof params.codes === "string") {
      try {
        return JSON.parse(params.codes);
      } catch (e) {
        console.log("Failed to parse codes:", e);
      }
    }
    return [
      "CRT-2800",
      "CRT-2937",
      "CRT-3074",
      "CRT-3211",
      "CRT-3348",
      "CRT-3485",
      "CRT-3622",
      "CRT-3759",
    ];
  }, [params?.codes, currentCodes]);

  const handleCopyAndSave = async () => {
    const serializedCodes = recoveryCodes.join("\n");
    await Clipboard.setStringAsync(serializedCodes);
    showToast?.("All recovery codes copied to clipboard!", "success");
    router.dismissAll();
  };

  const handleRegenerate = async () => {
    try {
      const response = await regenerate2FaCodes({}).unwrap();
      setCurrentCodes(response.data.recoveryCodes);
      showToast?.("Fresh recovery codes generated!", "success");
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || "Failed to regenerate codes on server.";
      showToast?.(errorMsg, "error");
    }
  };

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
          {/* Header configuration */}
          <BackHeader
            title="Recovery codes"
            paragraph="Save these once. Each code can only be used one time."
            onBack={() => router.dismissAll()}
          />

          {/* 2-Column Matrix Layout with 01, 02 indicators restored */}
          <View style={styles.gridContainer}>
            {recoveryCodes.map((code, index) => (
              <View key={code || index} style={styles.codeBadge}>
                <Text style={styles.badgeIndexNum}>
                  {(index + 1).toString().padStart(2, "0")}
                </Text>
                <Text style={styles.codeText}>{code}</Text>
              </View>
            ))}
          </View>

          {/* Combined Actions Sector */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text={isRegenerating ? "Regenerating..." : "Regenerate codes"}
              Bgcolor={Colors.newDark}
              textColor={Colors.newWhite}
              fontSize={13}
              style={{ fontFamily: FontFamily.bold, marginBottom: 12 }}
              onPress={handleRegenerate}
              disabled={isRegenerating}
            />

            <PrimaryButton
              text="Copy & Continue"
              Bgcolor={Colors.green}
              textColor={Colors.newBlack}
              fontSize={13}
              style={{ fontFamily: FontFamily.bold }}
              onPress={handleCopyAndSave}
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
  scrollContainer: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginTop: 30,
  },
  codeBadge: {
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    width: "48%",
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  badgeIndexNum: {
    color: Colors.green,
    fontSize: 11,
    fontFamily: FontFamily.bold,
    opacity: 0.6,
  },
  codeText: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.5,
  },
  footerSection: {
    width: "100%",
    marginTop: "auto",
    paddingBottom: 10,
  },
});
