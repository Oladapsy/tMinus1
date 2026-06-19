import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface SelectedAssetPayload {
  symbol: string;
}

interface WithdrawalSuccessViewProps {
  asset: SelectedAssetPayload;
  onViewTransaction: () => void;
}

export default function WithdrawalSuccessView({
  asset,
  onViewTransaction,
}: WithdrawalSuccessViewProps) {
  return (
    <View style={styles.container}>
      <BackHeader
        title="Withdrawal submitted"
        paragraph="Finance review can approve or reject this request."
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Large Animated Success Badge Ring */}
        <View style={styles.successRingWrapper}>
          <View style={styles.innerSuccessCircle}>
            <Title text="✓" size={24} color={Colors.dark || "#0B0E14"} />
          </View>
        </View>

        {/* Receipt Key-Value Rows Card Layout */}
        <View style={styles.receiptCard}>
          <View style={styles.row}>
            <Paragraph text="Status" color={Colors.newSecondary} size={14} />
            <Title text="Pending review" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Amount" color={Colors.newSecondary} size={14} />
            <Title text={`100.00 ${asset.symbol}`} size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Fee" color={Colors.newSecondary} size={14} />
            <Title text={`1.00 ${asset.symbol}`} size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Reference" color={Colors.newSecondary} size={14} />
            <Title text="wd_8392" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Paragraph text="Created" color={Colors.newSecondary} size={14} />
            <Title text="May 27, 2026" size={14} fontFamily={FontFamily.bold} />
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="View transaction"
            fontSize={14}
            fontFamily={FontFamily.medium}
            onPress={onViewTransaction}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: "center",
  },
  successRingWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(94, 213, 168, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  innerSuccessCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.green || "#5ED5A8",
    alignItems: "center",
    justifyContent: "center",
  },
  receiptCard: {
    backgroundColor: Colors.newDark,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "stretch",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 40,
  },
});