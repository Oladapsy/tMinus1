import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { CryptoAsset } from "@/src/types/wallet";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";

interface Props {
  totalPortfolioValue: number;
  cryptoAssets: CryptoAsset[];
  onNavigateToDeposit: () => void;
}

export default function WalletDashboardView({
  totalPortfolioValue,
  cryptoAssets,
  onNavigateToDeposit,
}: Props) {
  const [tab, setTabs] = useState<"Deposit" | "Withdrawl" | "Trade">("Deposit");

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerTitleRow}>
        <TitleAndParagraph
          title="Wallet"
          paragraph="Aggregated in USD from active asset balances."
        />
      </View>

      <View style={styles.portfolioCard}>
        <Paragraph
          text="Total portfolio value"
          color={Colors.newSecondary}
          size={11}
          textAlign="left"
        />
        <View style={styles.balanceRow}>
          <Title
            text={`$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            color={Colors.newWhite}
            size={32}
            fontFamily={FontFamily.bold}
          />
        </View>
        <Text style={styles.growthText}>+2.8% today</Text>
      </View>

      <View style={styles.actionsButtonBar}>
        <PrimaryButton
          text="Deposit"
          Bgcolor={Colors.green}
          textColor={Colors.newDark}
          onPress={onNavigateToDeposit}
          style={styles.actionBtnFlex}
          fontSize={13}
        />
        <PrimaryButton
          text="Withdraw"
          Bgcolor={Colors.newDark}
          textColor={Colors.newWhite}
          onPress={() => console.log("Withdraw clicked")}
          style={[styles.actionBtnFlex, styles.outlineButtonBorder]}
          fontSize={13}
        />
        <PrimaryButton
          text="Trade"
          Bgcolor={Colors.newDark}
          textColor={Colors.newWhite}
          onPress={() => console.log("Trade clicked")}
          style={[styles.actionBtnFlex, styles.outlineButtonBorder]}
          fontSize={13}
        />
      </View>

      <View style={styles.listContainerStack}>
        {cryptoAssets.map((asset) => (
          <View key={asset.id} style={styles.assetItemRow}>
            <View style={styles.leftAssetMeta}>
              <View
                style={[styles.statusDot, { backgroundColor: asset.dotColor }]}
              />
              <View style={styles.textStackColumn}>
                <Title
                  text={asset.name}
                  color={Colors.newWhite}
                  size={13.5}
                  fontFamily={FontFamily.bold}
                />
                <Paragraph
                  text={`${asset.symbol} · ${asset.network}`}
                  color={Colors.newSecondary}
                  size={11}
                  textAlign="left"
                />
              </View>
            </View>
            <View style={styles.rightAssetValues}>
              <Title
                text={`$${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                color={Colors.newWhite}
                size={13.5}
                fontFamily={FontFamily.bold}
                textAlign="right"
              />
              <Paragraph
                text={`${asset.balance.toLocaleString()} ${asset.symbol}`}
                color={Colors.newSecondary}
                size={11}
                textAlign="right"
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  headerTitleRow: {
    marginTop: 24,
    marginBottom: 20,
    flexDirection: "column",
    gap: 4,
  },
  portfolioCard: {
    backgroundColor: Colors.walletCard,
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 36,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    width: "100%",
  },
  balanceRow: {
    marginTop: 4,
    marginBottom: 2,
  },
  growthText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.bold,
    marginTop: 2,
  },
  actionsButtonBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    marginTop: 24,
    marginBottom: 28,
  },
  actionBtnFlex: { flex: 1, height: 42, borderRadius: 12 },
  outlineButtonBorder: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  sectionHeader: { marginBottom: 12 },
  listContainerStack: { flexDirection: "column", gap: 10 },
  assetItemRow: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  leftAssetMeta: { flexDirection: "row", alignItems: "center", gap: 14 },
  statusDot: { width: 18, height: 18, borderRadius: 9 },
  textStackColumn: { flexDirection: "column", gap: 2 },
  rightAssetValues: { flexDirection: "column", gap: 2, alignItems: "flex-end" },
});
