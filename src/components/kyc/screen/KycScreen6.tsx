import React from "react";
import { StyleSheet, View } from "react-native";
import KycReviewRow from "@/src/components/kyc/KycReviewRow";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "@/src/components/common/Paragraph";

interface KycScreen6Props {
  onSubmit: () => void;
  userData?: {
    name: string;
    country: string;
    docType: string;
  };
}

export default function KycScreen6({ onSubmit, userData }: KycScreen6Props) {
  const displayName = userData?.name || "NO NAME";
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
        <Paragraph
          text="After submission your status changes to pending and trade/withdraw remain locked until approved."
          size={13}
          color={Colors.newSecondary}
          lineHeight={18}
          fontFamily={FontFamily.regular}
          textAlign="center"
        />
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
    marginTop: 36,
  },
  disclaimerBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    padding: 18,
    marginTop: 16,
    width: "100%",
  },
  buttonContainer: {
    paddingBottom: 24,
    marginTop: 56,
  },
});
