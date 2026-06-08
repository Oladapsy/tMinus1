import CalloutBox from "@/src/components/common/CalloutBox";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext"; // 2. Context Integration
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function RecoveryCodesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); // 3. Reads parameters out of current URL route context
  const { showToast } = useToast(); // Hooking global toast engine
  const [regenerating, setRegenerating] = useState(false);
  const [currentCodes, setCurrentCodes] = useState<string[] | null>(null);

  // 1. Decodes string passcodes payload or defaults safely to fallbacks
  const recoveryCodes: string[] = useMemo(() => {
    if (currentCodes) return currentCodes; // Use freshly regenerated codes if available

    if (params?.codes && typeof params.codes === "string") {
      try {
        return JSON.parse(params.codes);
      } catch (e) {
        console.error("Failed to parse stringified recovery codes array:", e);
      }
    }
    return [
      "A1B2C-D3E4F",
      "8A9B0-C1D2E",
      "C3D4E-F5G6H",
      "7B8C9-D0E1F",
      "E5F6G-H7I8J",
      "9C0D1-E2F3G",
      "G7H8I-J9K0L",
      "1D2E3-F4G5H",
    ];
  }, [params?.codes, currentCodes]);

  const handleCopyAllCodes = () => {
    const serializedCodes = recoveryCodes.join("\n");
    Clipboard.setString(serializedCodes); // Physically copies to clipboard string array
    showToast("Recovery codes copied to clipboard!"); // Global Toast feedback response
  };

  const handleRegenerateCodes = async () => {
    try {
      setRegenerating(true);
      // later will pass: await api.post('/auth/2fa/recovery-codes/regenerate', { password, code })
      // Simulating a fresh response sequence from backend schema
      setTimeout(() => {
        const freshData = [
          "X9Y8Z-W7V6U",
          "5T4S3-R2Q1P",
          "M1N2O-P3Q4R",
          "S5T6U-V7W8X",
          "A1B2C-D3E4F",
          "8A9B0-C1D2E",
          "H7I8J-K9L0M",
          "N1O2P-Q3R4S",
        ];
        setCurrentCodes(freshData);
        setRegenerating(false);
        showToast("Fresh recovery codes generated successfully!");
      }, 1000);
    } catch (err) {
      console.error(err);
      setRegenerating(false);
    }
  };

  const handleExitScreen = () => {
    router.dismissAll();
    router.push("/profile/security" as any);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        {/* Navigation Exit Bar Anchor */}
        <View style={styles.topNavBar}>
          <Pressable onPress={handleExitScreen} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>Close</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. TOP SECTION: Header Info */}
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Recovery codes"
              paragraph="Save these once. Each code can only be used one time."
            />
          </View>

          {/* 2. MIDDLE REGION: Code Matrix Grid */}
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

          {/* 3. UTILITY ACTION ELEMENT: Copy Shortcut */}
          <Pressable
            onPress={handleCopyAllCodes}
            style={styles.copyLinkWrapper}
          >
            <Text style={styles.copyLinkText}>Copy all recovery codes</Text>
          </Pressable>

          {/* 4. WARNING FOOTER INFORMATION BLOCK */}
          <View style={styles.warningWrapper}>
            <CalloutBox
              title="Keep these codes private"
              paragraph="Each code can only be used once. Anyone with access to these strings can override account protection parameters."
              backgroundColor={Colors.newYellowSlim}
              titleColor={Colors.newWhite}
              paragraphColor={Colors.newYellowWarning}
              titleSize={13}
              paragraphSize={12}
            />
          </View>

          {/* 5. REFACTORED FOOTER ACTION LAYOUT */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text={regenerating ? "" : "Regenerate codes"}
              Bgcolor={Colors.primary}
              textColor={Colors.newWhite}
              fontSize={13.5}
              style={{ fontFamily: FontFamily.bold }}
              onPress={handleRegenerateCodes}
              disabled={regenerating}
              icon={
                regenerating ? (
                  <ActivityIndicator size="small" color={Colors.newWhite} />
                ) : undefined
              }
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
  topNavBar: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: "flex-end",
  },
  closeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.newDark,
    borderRadius: 12,
  },
  closeBtnText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: { marginTop: 14, marginBottom: 24 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  codeBadge: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  badgeIndexNum: {
    color: Colors.green,
    fontSize: 11,
    fontFamily: FontFamily.bold,
    opacity: 0.8,
  },
  codeText: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.5,
  },
  copyLinkWrapper: {
    marginTop: 18,
    alignSelf: "center",
    paddingVertical: 6,
  },
  copyLinkText: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.bold,
    textDecorationLine: "underline",
  },
  warningWrapper: {
    width: "100%",
    marginTop: 32,
  },
  footerSection: {
    width: "100%",
    marginTop: 48,
  },
});
