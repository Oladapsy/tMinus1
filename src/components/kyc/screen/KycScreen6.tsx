import React from "react";
import { StyleSheet, View, Text } from "react-native";

import KycReviewRow from "@/src/components/kyc/KycReviewRow";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface KycScreen6Props {
  onSubmit: () => void;
  // Optional mock props if you want to pass actual values down later from previous steps
  userData?: {
    name: string;
    country: string;
    docType: string;
  };
}

export default function KycScreen6({ onSubmit, userData }: KycScreen6Props) {
  // Graceful fallbacks pointing directly to matching fields in Screenshot 2026-06-05 at 11.22.49 PM.png
  const displayName = userData?.name || "Ada Student";
  const displayCountry = userData?.country || "Nigeria";
  const displayDocType = userData?.docType || "National ID";

  return (
    <View style={styles.container}>
      {/* 1. REVIEW DATA LIST SECTION */}
      <View style={styles.listWrapper}>
        <KycReviewRow label="Legal name" value={displayName} />
        <KycReviewRow label="Country" value={displayCountry} />
        <KycReviewRow label="Document" value={displayDocType} />
        <KycReviewRow label="Document image" value="Uploaded" />
        <KycReviewRow label="Selfie image" value="Uploaded" />
      </View>

      {/* 2. ADMIN STATUS DISCLAIMER BOX */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>
          After submission your status changes to pending and trade/withdraw
          remain locked until approved.
        </Text>
      </View>

      {/* 3. SUBMIT FINAL ACTION CONTROL */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text="Submit for review"
          onPress={onSubmit}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
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
  },
  listWrapper: {
    width: "100%",
    marginTop: 16,
  },
  disclaimerBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    padding: 18,
    marginTop: 16,
    width: "100%",
  },
  disclaimerText: {
    color: Colors.newSecondary || "#6B7280",
    fontSize: 13,
    fontFamily: FontFamily.regular,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingBottom: 24,
    marginTop: "auto", // Automatically pushes down flush to top of navigation footer line cleanly
  },
});
