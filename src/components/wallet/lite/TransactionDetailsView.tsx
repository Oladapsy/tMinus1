import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TransactionDetailsViewProps {
  tx: { title: string; amount: string; status: string };
  onGoBack: () => void;
  onBackToWallet: () => void;
}

export default function TransactionDetailsView({
  tx,
  onGoBack,
  onBackToWallet,
}: TransactionDetailsViewProps) {
  return (
    <View style={styles.container}>
      <BackHeader
        title="Transaction details"
        paragraph="A single ledger entry with status and reference."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Highlighted Banner Status Header Card */}
        <View style={styles.statusBannerCard}>
          <Paragraph
            text={`Sandbox ${tx.title}`}
            color={Colors.newWhite}
            size={15}
            textAlign="left"
          />
          <View style={{ marginTop: 8, marginBottom: 4 }}>
            <Title
              text={`${tx.amount} USDT`}
              color={Colors.green}
              size={32}
              fontFamily={FontFamily.bold}
              textAlign="left"
            />
          </View>
          <Paragraph
            text={tx.status}
            color={Colors.green}
            size={14}
            fontFamily={FontFamily.medium}
            textAlign="left"
          />
        </View>

        {/* Breakdown Receipt Card Meta list */}
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Paragraph text="Reference" color={Colors.newSecondary} size={14} />
            <Title text="txn_193e61b9" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Asset" color={Colors.newSecondary} size={14} />
            <Title text="USDT" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Network" color={Colors.newSecondary} size={14} />
            <Title text="TRC20" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Rate" color={Colors.newSecondary} size={14} />
            <Title text="$1.00" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Created" color={Colors.newSecondary} size={14} />
            <Title text="May 27, 2026" size={14} fontFamily={FontFamily.bold} />
          </View>

          <View
            style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}
          >
            <Paragraph text="Completed" color={Colors.newSecondary} size={14} />
            <Title text="May 27, 2026" size={14} fontFamily={FontFamily.bold} />
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
  scrollContent: { paddingBottom: 40, alignItems: "center" },
  statusBannerCard: {
    backgroundColor: "rgba(94, 213, 168, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(94, 213, 168, 0.1)",
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
