import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// Atom and Core Imports
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import PortfolioValueCard from "./PortfolioValueCard";
import WalletAssetRow from "./WalletAssetRow";
import { AssetData } from "@/src/screens/wallet/NewWalletScreen";
import { Transaction } from "@/src/types/wallet";
// 🟢 Import your explicit layout interface structure

interface WalletDashboardViewProps {
  totalBalance: string;
  trendText?: string;
  assets: AssetData[]; // 🟢 Uses the shared global AssetData model directly
  onDepositPress?: () => void;
  onWithdrawPress?: () => void;
  onTradePress?: () => void;
  onBalancePress?: () => void;
  transactions: Transaction[];
  onViewTransactions: () => void;
}

export default function WalletDashboardView({
  totalBalance,
  trendText,
  assets,
  onDepositPress,
  onWithdrawPress,
  onTradePress,
  onBalancePress,
  transactions,
  onViewTransactions,
}: WalletDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<
    "deposit" | "withdraw" | "trade" | null
  >(null);

  const handlePress = (
    tab: "deposit" | "withdraw" | "trade",
    callback?: () => void,
  ) => {
    setActiveTab(tab);
    if (callback) {
      setTimeout(() => {
        callback();
        setActiveTab(null); // Reset after action executes
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
        percentageChangeString={trendText || ""}
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
            textColor={
              activeTab === "deposit" ? Colors.darkText : Colors.newWhite
            }
            onPress={() => handlePress("deposit", onDepositPress)}
          />
        </View>
        <View style={styles.buttonFlexWrapper}>
          <PrimaryButton
            text="Withdraw"
            fontSize={14}
            fontFamily={FontFamily.medium}
            Bgcolor={activeTab === "withdraw" ? Colors.green : Colors.dark}
            textColor={
              activeTab === "withdraw" ? Colors.darkText : Colors.newWhite
            }
            onPress={() => handlePress("withdraw", onWithdrawPress)}
          />
        </View>
        <View style={styles.buttonFlexWrapper}>
          <PrimaryButton
            text="Trade"
            fontSize={14}
            fontFamily={FontFamily.medium}
            Bgcolor={activeTab === "trade" ? Colors.green : Colors.dark}
            textColor={
              activeTab === "trade" ? Colors.darkText : Colors.newWhite
            }
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
      <TouchableOpacity
        style={styles.recentTransactionsHeader}
        activeOpacity={0.7}
        onPress={onViewTransactions}
      >
        <Text style={styles.sectionTitleText}>Recent transactions</Text>
        <Text
          style={{
            color: Colors.green,
            fontFamily: FontFamily.medium,
            fontSize: 13,
          }}
        >
          See All
        </Text>
      </TouchableOpacity>

      <View style={styles.listSection}>
        {transactions.map((tx) => {
          const transactionType = tx.type ?? "Transaction";
          const isDeposit =
            transactionType.toLowerCase() === "deposit" ||
            transactionType.toLowerCase() === "buy";

          // 🟢 Extract the correct symbol fallback if tx.assetSymbol is blank
          const assetSymbol =
            tx.assetSymbol || tx.toAsset || tx.fromAsset || "USDT";

          const currentStatus = tx.status ?? "Pending";

          const dateLabel = tx.createdAt
            ? new Date(tx.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })
            : "Today";

          // 🟢 Fallback chain to catch the correct numerical value from the server payload
          const resolvedAmount = tx.amount ?? tx.toAmount ?? tx.fromAmount ?? 0;

          return (
            <WalletAssetRow
              key={tx.id}
              name={`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}`}
              symbol={assetSymbol}
              network={currentStatus}
              balanceString={dateLabel}
              valueString={`${isDeposit ? "+" : "-"}$${Number(resolvedAmount).toFixed(2)}`}
              dotColor={isDeposit ? Colors.green : Colors.newCryptoYellow}
              disabled={true}
            />
          );
        })}
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitleText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
