import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// This mirrors the backend contract structure from: GET /market/assets/{symbol}/trades
export interface TradeItemPayload {
  id: string;
  side: "buy" | "sell";
  priceUsd: number;
  amount: number;
  totalUsd: number;
  createdAt: string;
}

interface RecentTradeCardProps {
  trade: TradeItemPayload;
}

export default function RecentTradeCard({ trade }: RecentTradeCardProps) {
  const isBuy = trade.side === "buy";

  return (
    <View style={styles.cardWrapper}>
      {/* Column 1: Side Label (Buy/Sell) */}
      <View style={styles.columnLeft}>
        <Text style={[styles.sideText, { color: isBuy ? Colors.green : Colors.newRed }]}>
          {isBuy ? "Buy" : "Sell"}
        </Text>
      </View>

      {/* Column 2: Execution PriceUsd */}
      <View style={styles.columnPrice}>
        <Text style={styles.mainPrice}>
          ${trade.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* Column 3: Token Asset Amount */}
      <View style={styles.columnAmount}>
        <Text style={styles.amountText}>{trade.amount.toFixed(4)}</Text>
      </View>

      {/* Column 4: Gross Total Usd Value */}
      <View style={styles.columnRight}>
        <Text style={styles.totalText}>{trade.totalUsd.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  // Column width allocations to ensure perfect structural alignment
  columnLeft: {
    flex: 1,
  },
  columnPrice: {
    flex: 2.2,
  },
  columnAmount: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  columnRight: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  sideText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
    textTransform: "capitalize",
  },
  mainPrice: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  amountText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  totalText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
});