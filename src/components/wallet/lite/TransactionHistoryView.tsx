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

interface TransactionItem {
  id: string;
  title: string;
  type: "deposit" | "withdraw" | "buy" | "swap" | "alert";
  status: string;
  amount: string;
  timeContext: string;
  badgeLetter: string;
  badgeBg: string;
}

interface TransactionHistoryViewProps {
  onSelectTx: (tx: TransactionItem) => void;
  onGoBack: () => void;
}

export default function TransactionHistoryView({
  onSelectTx,
  onGoBack,
}: TransactionHistoryViewProps) {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Deposits" | "Withdrawals"
  >("All");

  const mockTxList: TransactionItem[] = [
    {
      id: "1",
      title: "USDT deposit",
      type: "deposit",
      status: "Completed",
      amount: "+$250.00",
      timeContext: "Today",
      badgeLetter: "U",
      badgeBg: Colors.green,
    },
    {
      id: "2",
      title: "BTC buy",
      type: "buy",
      status: "Completed",
      amount: "-$100.00",
      timeContext: "Today",
      badgeLetter: "B",
      badgeBg: Colors.newCryptoYellow,
    },
    {
      id: "3",
      title: "USDT withdrawal",
      type: "withdraw",
      status: "Pending",
      amount: "-100.00",
      timeContext: "Review",
      badgeLetter: "U",
      badgeBg: Colors.green,
    },
    {
      id: "4",
      title: "ETH swap",
      type: "swap",
      status: "Completed",
      amount: "0.03 ETH",
      timeContext: "Yesterday",
      badgeLetter: "E",
      badgeBg: Colors.purple,
    },
    {
      id: "5",
      title: "Price alert",
      type: "alert",
      status: "Triggered",
      amount: "BTC",
      timeContext: "Read",
      badgeLetter: "A",
      badgeBg: Colors.green,
    },
  ];

  return (
    <View style={styles.container}>
      <BackHeader
        title="Transactions"
        paragraph="Deposits, withdrawals, buys, sells, and swaps."
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
        {mockTxList.map((tx) => (
          <TouchableOpacity
            key={tx.id}
            style={styles.txCard}
            activeOpacity={0.7}
            onPress={() => onSelectTx(tx)}
          >
            <View style={styles.leftContent}>
              <View style={[styles.avatar, { backgroundColor: tx.badgeBg }]}>
                <Text style={styles.avatarText}>{tx.badgeLetter}</Text>
              </View>
              <View style={styles.meta}>
                <Title text={tx.title} size={15} textAlign="left" />
                <View style={{ marginTop: 2 }}>
                  <Paragraph
                    text={tx.status}
                    color={Colors.newSecondary}
                    size={12}
                    textAlign="left"
                  />
                </View>
              </View>
            </View>

            <View style={styles.rightContent}>
              <Title text={tx.amount} size={15} textAlign="right" />
              <View style={{ marginTop: 2 }}>
                <Paragraph
                  text={tx.timeContext}
                  color={Colors.newSecondary}
                  size={12}
                  textAlign="right"
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40 },
  filterBar: { flexDirection: "row", gap: 8, marginBottom: 24 },
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
