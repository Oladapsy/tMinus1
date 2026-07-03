import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { Transaction } from "@/src/types/wallet";

interface TransactionDetailsViewProps {
  tx: Transaction; // 🟢 Strong typed directly to the schema
  onGoBack: () => void;
  onBackToWallet: () => void;
}

export default function TransactionDetailsView({
  tx,
  onGoBack,
  onBackToWallet,
}: TransactionDetailsViewProps) {
  const isDeposit = tx.type?.toLowerCase() === "deposit";
  const displayAsset = tx.assetSymbol || "---";

  const formatDate = (rawStr?: string) => {
    if (!rawStr) return "---";
    return new Date(rawStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Transaction details"
        paragraph="Detailed ledger audit view for your account balance updates."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Highlighted Banner Status Header Card */}
        <View style={styles.statusBannerCard}>
          <Paragraph
            text={`${tx.type?.toUpperCase() || "TRANSACTION"}`}
            color={Colors.newWhite}
            size={13}
            textAlign="left"
          />
          <View style={{ marginTop: 8, marginBottom: 4 }}>
            <Title
              text={`${isDeposit ? "+" : "-"}${Number(tx.amount).toLocaleString(undefined, { maximumFractionDigits: 6 })} ${displayAsset}`}
              color={isDeposit ? Colors.green : Colors.newWhite}
              size={26}
              fontFamily={FontFamily.bold}
              textAlign="left"
            />
          </View>
          <Title
            text={tx.status ? tx.status.toUpperCase() : "PROCESSING"}
            color={tx.status === "completed" ? Colors.green : Colors.newCryptoYellow}
            size={12}
            fontFamily={FontFamily.bold}
            textAlign="left"
          />
        </View>

        {/* Breakdown Receipt Card Meta list */}
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Paragraph text="Reference Code" color={Colors.newSecondary} size={14} />
            <Title text={tx.id} size={12} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Asset" color={Colors.newSecondary} size={14} />
            <Title text={displayAsset} size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Fee Charge" color={Colors.newSecondary} size={14} />
            <Title text={`${tx.feeAmount ?? 0} ${displayAsset}`} size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Paragraph text="Timestamp" color={Colors.newSecondary} size={14} />
            <Title text={formatDate(tx.createdAt)} size={13} fontFamily={FontFamily.bold} />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="Back to wallet"
            fontSize={14}
            fontFamily={FontFamily.medium}
            onPress={onBackToWallet}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40, alignItems: "center", width: "100%" },
  statusBannerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  detailsCard: {
    backgroundColor: Colors.newDark,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 22,
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