import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useGetTransactionsQuery } from "@/src/features/wallets/api/walletApi"; // 🟢 Hook imported directly here
import { Transaction } from "@/src/types/wallet";

interface TransactionHistoryViewProps {
  onSelectTx: (tx: Transaction) => void;
  onGoBack: () => void;
}

const ASSET_COLORS: Record<string, string> = {
  BTC: Colors.newCryptoYellow,
  ETH: Colors.purple,
  USDT: Colors.green,
  USDC: "#2775CA",
  SOL: Colors.green,
};

export default function TransactionHistoryView({
  onSelectTx,
  onGoBack,
}: TransactionHistoryViewProps) {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Deposits" | "Withdrawals"
  >("All");

  // 🟢 Fetches a large list (up to 50 items) completely isolated from the dashboard view
  const { data: txResponse, isLoading } = useGetTransactionsQuery({
    limit: 50,
    page: 1,
  });
  const transactions = txResponse?.data || [];

  // 🟢 Dynamically filter live backend transaction structures securely
  const filteredTxList = transactions.filter((tx) => {
    const typeStr = (tx.type || "").toLowerCase();

    if (activeFilter === "Deposits") {
      return typeStr === "deposit" || typeStr === "buy";
    }
    if (activeFilter === "Withdrawals") {
      // Catches external "withdrawal" strings as well as internal "transfer" actions
      return (
        typeStr === "withdrawal" ||
        typeStr === "transfer" ||
        typeStr === "withdraw"
      );
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <BackHeader
        title="Transactions"
        paragraph="Deposits, withdrawals, and historical ledger actions."
        onBack={onGoBack}
      />

      <View style={styles.filterBar}>
        {(["All", "Deposits", "Withdrawals"] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.activeFilterTab,
            ]}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === filter && styles.activeFilterTabText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Colors.green}
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 🟢 Handles empty notification state dynamically */}
          {filteredTxList.length === 0 ? (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <Paragraph
                text="No transactions found matching this group."
                color={Colors.newSecondary}
              />
            </View>
          ) : (
            filteredTxList.map((tx) => {
              const transactionType = tx.type ?? "Transaction";
              const isDeposit =
                transactionType.toLowerCase() === "deposit" ||
                transactionType.toLowerCase() === "buy";

              const assetSymbol =
                tx.assetSymbol || tx.toAsset || tx.fromAsset || "USDT";
              const badgeBg = ASSET_COLORS[assetSymbol] || Colors.green;
              const displayDate = tx.createdAt
                ? new Date(tx.createdAt).toLocaleDateString()
                : "Pending";

              const rawAmount = tx.amount ?? tx.toAmount ?? tx.fromAmount ?? 0;
              const parsedAmount = isNaN(Number(rawAmount))
                ? 0
                : Number(rawAmount);

              return (
                <TouchableOpacity
                  key={tx.id}
                  style={styles.txCard}
                  activeOpacity={0.7}
                  onPress={() => onSelectTx(tx)}
                >
                  <View style={styles.leftContent}>
                    <View style={[styles.avatar, { backgroundColor: badgeBg }]}>
                      <Text style={styles.avatarText}>
                        {assetSymbol.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.meta}>
                      <Title
                        text={`${assetSymbol} ${transactionType}`}
                        size={15}
                        textAlign="left"
                      />
                      <View style={{ marginTop: 2 }}>
                        <Paragraph
                          text={tx.status || "Processing"}
                          color={
                            tx.status === "completed"
                              ? Colors.green
                              : Colors.newCryptoYellow
                          }
                          size={12}
                          textAlign="left"
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.rightContent}>
                    <Title
                      text={`${isDeposit ? "+" : "-"}${parsedAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })}`}
                      size={15}
                      textAlign="right"
                    />
                    <View style={{ marginTop: 2 }}>
                      <Paragraph
                        text={displayDate}
                        color={Colors.newSecondary}
                        size={12}
                        textAlign="right"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
}

// Keep your existing styles exactly as they are down below...
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40 },
  filterBar: {
    marginTop: 15,
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  activeFilterTab: { backgroundColor: "rgba(94, 213, 168, 0.15)" },
  filterTabText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  activeFilterTabText: {
    color: Colors.green || "#5ED5A8",
    fontFamily: FontFamily.bold,
  },
  txCard: {
    backgroundColor: Colors.newDark,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leftContent: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  meta: { alignItems: "flex-start" },
  rightContent: { alignItems: "flex-end" },
});
