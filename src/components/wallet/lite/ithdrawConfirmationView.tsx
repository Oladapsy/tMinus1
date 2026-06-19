import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ItemAndAddress from "../../common/ItemAndAdress";

interface SelectedAssetPayload {
  symbol: string;
  network: string;
}

interface WithdrawConfirmationViewProps {
  asset: SelectedAssetPayload;
  onGoBack: () => void;
  onSubmitWithdrawal: () => void;
}

export default function WithdrawConfirmationView({
  asset,
  onGoBack,
  onSubmitWithdrawal,
}: WithdrawConfirmationViewProps) {
  return (
    <View style={styles.container}>
      <BackHeader
        title="Confirm withdrawal"
        paragraph="Review every detail before submitting."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Details Review Matrix Card */}
        <View style={styles.reviewCard}>
          <View style={styles.amountHeader}>
            <Title text={`100.00 ${asset.symbol}`} size={28} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Asset" color={Colors.newSecondary} size={14} />
            <Title text={asset.symbol} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Network" color={Colors.newSecondary} size={14} />
            <Title text={asset.network} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Address" color={Colors.newSecondary} size={14} />
            <Title text="TXYZ...8K21" size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Fee" color={Colors.newSecondary} size={14} />
            <Title text={`1.00 ${asset.symbol}`} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Paragraph text="You receive" color={Colors.newSecondary} size={14} />
            <Title text={`99.00 ${asset.symbol}`} size={14} fontFamily={FontFamily.medium} />
          </View>
        </View>

        {/* Transaction PIN Block Mask */}
        <View style={styles.spacer} />
        <ItemAndAddress title="Transaction PIN" address="••••" />

        {/* Action Button */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="Submit withdrawal"
            fontSize={14}
            fontFamily={FontFamily.medium}
            onPress={onSubmitWithdrawal}
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
  spacer: {
    height: 16,
    width: "100%",
  },
  reviewCard: {
    backgroundColor: Colors.newDark,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "stretch",
  },
  amountHeader: {
    alignItems: "center",
    marginBottom: 28,
    marginTop: 8,
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