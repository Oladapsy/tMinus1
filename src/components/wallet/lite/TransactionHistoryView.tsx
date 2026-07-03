import React, { useState } from "react";
import {
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
import { Transaction } from "@/src/types/wallet";

interface TransactionHistoryViewProps {
  transactions: Transaction[]; // 🟢 Fed directly from RTK query response
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
  transactions = [],
  onSelectTx,
  onGoBack,
}: TransactionHistoryViewProps) {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Deposits" | "Withdrawals"
  >("All");

  // 🟢 Dynamically filter live backend transaction structures
  const filteredTxList = transactions.filter((tx) => {
    if (activeFilter === "Deposits")
      return tx.type?.toLowerCase() === "deposit";
    if (activeFilter === "Withdrawals")
      return tx.type?.toLowerCase() === "withdrawal";
    return true;
  });

  return (
    <View style={styles.container}>
      <BackHeader
        title="Transactions"
        paragraph="Deposits, withdrawals, and historical ledger actions."
        onBack={onGoBack}
      />

      {/* Categories Filter Selection Row */}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredTxList.length === 0 ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Paragraph
              text="No transactions found matching this group."
              color={Colors.newSecondary}
            />
          </View>
        ) : (
          filteredTxList.map((tx) => {
            const isDeposit = tx.type?.toLowerCase() === "deposit";
            const assetSymbol = tx.assetSymbol || "USDT";
            const badgeBg = ASSET_COLORS[assetSymbol] || Colors.green;
            const displayDate = tx.createdAt
              ? new Date(tx.createdAt).toLocaleDateString()
              : "Pending";

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
                      text={`${assetSymbol} ${tx.type || "Transaction"}`}
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
                    text={`${isDeposit ? "+" : "-"}${Number(tx.amount).toLocaleString(undefined, { maximumFractionDigits: 6 })}`}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40 },
  filterBar: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    marginTop: 16,
    justifyContent: "flex-start",
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
