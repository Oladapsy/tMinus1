import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// Atom and Core Imports
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import PortfolioValueCard from "./PortfolioValueCard";
import WalletAssetRow from "./WalletAssetRow";

interface AssetMockData {
  id: string;
  name: string;
  symbol: string;
  network: string;
  balance: string;
  value: string;
  color: string;
}

interface WalletDashboardViewProps {
  totalBalance: string;
  trendText: string;
  assets: AssetMockData[];
  onDepositPress?: () => void;
  onWithdrawPress?: () => void;
  onTradePress?: () => void;
  onBalancePress?: () => void;
}

export default function WalletDashboardView({
  totalBalance,
  trendText,
  assets,
  onDepositPress,
  onWithdrawPress,
  onTradePress,
  onBalancePress,
}: WalletDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "trade">("deposit");

  const handlePress = (tab: "deposit" | "withdraw" | "trade", callback?: () => void) => {
    setActiveTab(tab);
    
    // Fire the navigation redirect layout trigger after a tiny delay so they see the color shift
    if (callback) {
      setTimeout(() => {
        callback();
      }, 150);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* 1. Header Section */}
      <View style={styles.headerSection}>
        <TitleAndParagraph
          title="Wallet"
          paragraph="Aggregated in USD from active asset balances."
        />
      </View>

      {/* 2. Total Balance View Card */}
      <PortfolioValueCard
        totalValueString={totalBalance}
        percentageChangeString={trendText}
        onPress={onBalancePress}
      />

      {/* 3. Interactive Horizontal Action Matrix */}
      <View style={styles.actionButtonGrid}>
        <View style={styles.buttonFlexWrapper}>
          <PrimaryButton
            text="Deposit"
            fontSize={13}
            fontFamily={FontFamily.medium}
            Bgcolor={activeTab === "deposit" ? Colors.green : Colors.dark}
            textColor={activeTab === "deposit" ? Colors.darkText : Colors.newWhite}
            onPress={() => handlePress("deposit", onDepositPress)}
          />
        </View>
        <View style={styles.buttonFlexWrapper}>
          <PrimaryButton
            text="Withdraw"
            fontSize={14}
            fontFamily={FontFamily.medium}
            Bgcolor={activeTab === "withdraw" ? Colors.green : Colors.dark}
            textColor={activeTab === "withdraw" ? Colors.darkText : Colors.newWhite}
            onPress={() => handlePress("withdraw", onWithdrawPress)}
          />
        </View>
        <View style={styles.buttonFlexWrapper}>
          <PrimaryButton
            text="Trade"
            fontSize={14}
            fontFamily={FontFamily.medium}
            Bgcolor={activeTab === "trade" ? Colors.green : Colors.dark}
            textColor={activeTab === "trade" ? Colors.darkText : Colors.newWhite}
            onPress={() => handlePress("trade", onTradePress)}
          />
        </View>
      </View>

      {/* 4. Crypto Assets List Group */}

      <View style={styles.listSection}>
        {assets.map((asset) => (
          <WalletAssetRow
            key={asset.id}
            name={asset.name}
            symbol={asset.symbol}
            balanceString={asset.balance}
            valueString={asset.value}
            dotColor={asset.color}
            disabled={true}
          />
        ))}
      </View>

      {/* 5. Recent Transaction Module */}
      <View style={styles.recentTransactionsHeader}>
        <Text style={styles.sectionTitleText}>Recent transactions</Text>
      </View>

      <WalletAssetRow
        name="Sandbox deposit"
        symbol="USDT"
        network="Completed"
        balanceString="Today"
        valueString="+$250.00"
        dotColor={Colors.green}
        disabled={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 16,
  },
  actionButtonGrid: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 24,
    justifyContent: "space-between",
  },
  buttonFlexWrapper: {
    flex: 1,
  },
  listSection: {
    marginTop: 8,
  },
  recentTransactionsHeader: {
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitleText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});