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

// 🟢 Define complete runtime parameter models matching the unwrap payload mapping
interface SuccessDetails {
  status: string;
  amount: number;
  fee: number;
  reference: string;
  createdAt: string;
  isInternal: boolean;
}

interface WithdrawalSuccessViewProps {
  asset: SelectedAssetPayload;
  details: SuccessDetails | null;
  onViewTransaction: () => void;
}

export default function WithdrawalSuccessView({
  asset,
  details,
  onViewTransaction,
}: WithdrawalSuccessViewProps) {
  // Safe fallbacks to prevent crash issues if state hasn't fully loaded yet
  const displayAmount = details?.amount ?? 0;
  const displayFee = details?.fee ?? 0;
  const displayRef = details?.reference ?? "---";

  // Format the raw API timestamp into a cleaner UI string
  const displayDate = details?.createdAt
    ? new Date(details.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Just now";

  return (
    <View style={styles.container}>
      <BackHeader
        title={
          details?.isInternal ? "Transfer Completed" : "Withdrawal Submitted"
        }
        paragraph={
          details?.isInternal
            ? "Funds moved instantly to recipient user account."
            : "Finance review protocols can approve or reject this request."
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.successRingWrapper}>
          <View style={styles.innerSuccessCircle}>
            <Title text="✓" size={24} color="#0B0E14" />
          </View>
        </View>

        <View style={styles.receiptCard}>
          <View style={styles.row}>
            <Paragraph text="Status" color={Colors.newSecondary} size={14} />
            <Title
              text={
                details?.isInternal ? "Success" : (details?.status ?? "Pending")
              }
              size={14}
              fontFamily={FontFamily.bold}
              color={
                details?.isInternal ? Colors.green : Colors.newCryptoYellow
              }
            />
          </View>

          <View style={styles.row}>
            <Paragraph
              text="Sent Amount"
              color={Colors.newSecondary}
              size={14}
            />
            <Title
              text={`${displayAmount} ${asset.symbol}`}
              size={14}
              fontFamily={FontFamily.bold}
            />
          </View>

          <View style={styles.row}>
            <Paragraph
              text="Network Fee"
              color={Colors.newSecondary}
              size={14}
            />
            <Title
              text={`${displayFee} ${asset.symbol}`}
              size={14}
              fontFamily={FontFamily.bold}
            />
          </View>

          <View style={styles.row}>
            <Paragraph
              text="Reference ID"
              color={Colors.newSecondary}
              size={14}
            />
            <Title text={displayRef} size={14} fontFamily={FontFamily.bold} />
          </View>

          <View
            style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}
          >
            <Paragraph text="Timestamp" color={Colors.newSecondary} size={14} />
            <Title text={displayDate} size={14} fontFamily={FontFamily.bold} />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="View history logs"
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
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40, alignItems: "center", width: "100%" },
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
  buttonWrapper: { width: "100%", marginTop: 40 },
});
