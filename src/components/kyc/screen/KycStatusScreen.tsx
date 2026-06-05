import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import KycReviewRow from "@/src/components/kyc/KycReviewRow";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export type KycStatusType = "pending" | "success" | "rejected";

interface KycStatusScreenProps {
  status: KycStatusType;
  onAction: (status: KycStatusType) => void;
}

export default function KycStatusScreen({
  status,
  onAction,
}: KycStatusScreenProps) {
  // 1. DYNAMIC CONFIGURATION MAPPINGS FROM SCREENSHOT
  const contentConfig = {
    pending: {
      headline: "Pending review",
      sub: "You can browse markets while we review your documents. Trading and withdrawals stay locked.",
      icon: <Text style={styles.dotsIcon}>•••</Text>,
      iconBg: "rgba(245, 158, 11, 0.1)", // Amber tint
      iconBorder: "transparent",
      btnText: "Back to home",
      btnBg: Colors.green,
      btnTextClr: Colors.newBlack,
    },
    success: {
      headline: "Level 2 unlocked",
      sub: "", // Screenshot shows no subtext block on success layout
      icon: <Ionicons name="checkmark" size={32} color={Colors.newBlack} />,
      iconBg: Colors.green,
      iconBorder: "transparent",
      btnText: "Start trading",
      btnBg: Colors.green,
      btnTextClr: Colors.newBlack,
    },
    rejected: {
      headline: "Try again",
      sub: "",
      icon: <Ionicons name="alert" size={32} color={Colors.newRed} />,
      iconBg: "rgba(239, 68, 68, 0.1)", // Red tint
      iconBorder: "rgba(239, 68, 68, 0.2)",
      btnText: "Resubmit documents",
      btnBg: Colors.newRed || "#EF4444",
      btnTextClr: Colors.newWhite,
    },
  }[status];

  return (
    <View style={styles.container}>
      {/* 2. CENTRAL SCANNER ACCENT ICON */}
      <View style={styles.centerIconContainer}>
        <View
          style={[
            styles.outerCircle,
            {
              backgroundColor: contentConfig.iconBg,
              borderColor: contentConfig.iconBorder,
            },
          ]}
        >
          {contentConfig.icon}
        </View>
      </View>

      {/* HEADLINE TEXT */}
      <Text style={styles.headlineText}>{contentConfig.headline}</Text>

      {/* CONDITIONALLY RENDER SUBTEXT PARAGRAPH */}
      {contentConfig.sub ? (
        <View style={styles.subTextWrapper}>
          <Paragraph
            text={contentConfig.sub}
            size={13}
            color={Colors.newSecondary}
            lineHeight={18}
            fontFamily={FontFamily.regular}
            textAlign="center"
          />
        </View>
      ) : null}

      {/* 3. CONDITIONAL ROWS GRID BASED ON CURRENT SYSTEM STATE */}
      <View style={styles.rowsContainer}>
        {status === "pending" && (
          <>
            <KycReviewRow label="Current level" value="Review" />
            <KycReviewRow label="Sandbox deposit" value="$250 max" />
          </>
        )}

        {status === "success" && (
          <>
            <KycReviewRow label="Trade per quote" value="$5,000" />
            <KycReviewRow label="Withdrawal request" value="$2,250" />
            <KycReviewRow label="Daily withdrawal" value="$10,000" />
          </>
        )}

        {status === "rejected" && (
          <>
            {/* Reason Warning Banner Box */}
            <View style={styles.reasonCard}>
              <Text style={styles.reasonTitle}>Reason</Text>
              <Text style={styles.reasonBody}>
                Document photo was blurry. Upload a clearer image with all
                corners visible.
              </Text>
            </View>
            <KycReviewRow label="Current level" value="Starter" />
          </>
        )}
      </View>

      {/* 4. FOOTER INTERACTION BUTTON BUTTON CONTROL */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={contentConfig.btnText}
          onPress={() => onAction(status)}
          Bgcolor={contentConfig.btnBg}
          textColor={contentConfig.btnTextClr}
          fontSize={13}
          style={{ fontFamily: FontFamily.bold }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  centerIconContainer: { marginTop: 40, marginBottom: 24 },
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  dotsIcon: {
    color: "#F59E0B",
    fontSize: 28,
    letterSpacing: -1,
  },
  headlineText: {
    fontSize: 22,
    fontFamily: FontFamily.bold,
    color: Colors.newWhite,
    textAlign: "center",
    marginBottom: 12,
  },
  subTextWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  rowsContainer: {
    width: "100%",
    marginTop: 24,
  },
  reasonCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    width: "100%",
  },
  reasonTitle: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  reasonBody: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    lineHeight: 18,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 24,
    marginTop: "auto",
  },
});
