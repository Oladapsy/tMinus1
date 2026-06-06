import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import KycReviewRow from "@/src/components/kyc/KycReviewRow";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import VertDotIcon from "@/assets/icons/profile/kyc/vertDot.svg";
import Title from "../../common/Title";

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
      icon: <VertDotIcon />,
      iconBg: Colors.newLightYellow,
      iconInnerBg: Colors.newGrey,
      iconBorder: "transparent",
      btnText: "Back to home",
      btnBg: Colors.green,
      btnTextClr: Colors.newBlack,
    },
    success: {
      headline: "Level 2 unlocked",
      sub: "",
      icon: <Ionicons name="checkmark" size={32} color={Colors.newBlack} />,
      iconBg: Colors.newGreen,
      iconInnerBg: Colors.green,
      iconBorder: "transparent",
      btnText: "Level 2 unlocked",
      btnBg: Colors.green,
      btnTextClr: Colors.newBlack,
    },
    rejected: {
      headline: "Try again",
      sub: "",
      icon: <Ionicons name="alert" size={32} color={Colors.newRed} />,
      iconBg: Colors.newLightRed, // Red tint
      iconInnerBg: Colors.newGrey,
      iconBorder: "rgba(239, 68, 68, 0.2)",
      btnText: "Resubmit documents",
      btnBg: Colors.newRed,
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
          <View
            style={[
              styles.innerCircle,
              {
                backgroundColor: contentConfig.iconInnerBg,
              },
            ]}
          >
            {contentConfig.icon}
          </View>
        </View>
      </View>

      {/* HEADLINE TEXT */}
      <Title
        text={contentConfig.headline}
        size={22}
        fontFamily={FontFamily.bold}
        color={Colors.newWhite}
        textAlign="center"
      />
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
          <View style={styles.footerBlock}>
            <KycReviewRow label="Current level" value="Review" />
            <KycReviewRow label="Sandbox deposit" value="$250 max" />
          </View>
        )}

        {status === "success" && (
          <View style={styles.footerBlock}>
            <KycReviewRow label="Trade per quote" value="$5,000" />
            <KycReviewRow label="Withdrawal request" value="$2,250" />
            <KycReviewRow label="Daily withdrawal" value="$10,000" />
          </View>
        )}

        {status === "rejected" && (
          <View style={styles.rejectedBlock}>
            {/* Reason Warning Banner Box */}
            <View style={styles.reasonCard}>
              <Text style={styles.reasonTitle}>Reason</Text>
              <Text style={styles.reasonBody}>
                Document photo was blurry. Upload a clearer image with all
                corners visible.
              </Text>
            </View>
            <KycReviewRow label="Current level" value="Starter" />
          </View>
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
  container: {
    flex: 1,
    alignItems: "center",
  },
  centerIconContainer: {
    marginTop: 26,
    marginBottom: 28,
  },
  outerCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  innerCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  subTextWrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 12,
  },
  rowsContainer: {
    width: "100%",
    marginTop: 24,
  },
  // here

  reasonCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    padding: 16,
    paddingVertical: 25,
    marginBottom: 40,
    width: "100%",
  },
  reasonTitle: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  reasonBody: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    lineHeight: 18,
    maxWidth: 280,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 24,
    marginTop: "auto",
  },
  // here
  footerBlock: {
    marginBottom: 56,
    marginTop: 50,
  },
  rejectedBlock: {
    marginBottom: 56,
    marginTop: 30,
  },
});
