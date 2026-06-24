import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../common/BackHeader";
import OrderBookRow, { OrderLevel } from "./component/OrderBookRow";

const MOCK_ORDER_BOOK_PAYLOAD = {
  data: {
    midPriceUsd: 64200.5,
    spreadUsd: 13.86,
    bids: [
      { priceUsd: 64193.57, amount: 0.03, total: 0.03 },
      { priceUsd: 64192.56, amount: 0.0354, total: 0.0654 },
      { priceUsd: 64191.55, amount: 0.0408, total: 0.1062 },
      { priceUsd: 64190.54, amount: 0.0462, total: 0.1524 },
      { priceUsd: 64189.53, amount: 0.0516, total: 0.204 },
    ],
    asks: [
      { priceUsd: 64207.43, amount: 0.03, total: 0.03 },
      { priceUsd: 64208.44, amount: 0.0354, total: 0.0654 },
      { priceUsd: 64209.45, amount: 0.0408, total: 0.1062 },
      { priceUsd: 64210.46, amount: 0.0462, total: 0.1524 },
      { priceUsd: 64211.47, amount: 0.0516, total: 0.204 },
    ],
  },
  meta: {
    symbol: "BTC",
    levels: 5,
  },
};

interface MarketOrderBookProps {
  symbol: string;
  onGoBack: () => void;
  onTradeAction?: (symbol: string) => void;
  onToggleView: () => void; // 🌟 Explicit property type registration
}

export default function MarketOrderBook({
  symbol,
  onGoBack,
  onTradeAction,
  onToggleView,
}: MarketOrderBookProps) {
  const orderBookData = MOCK_ORDER_BOOK_PAYLOAD.data;
  const rowCount = Math.max(
    orderBookData.bids.length,
    orderBookData.asks.length,
  );
  const rowsArray = Array.from({ length: rowCount });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <BackHeader
          title={`${symbol} order book`}
          paragraph="Bid and ask levels for the trade screen."
          onBack={onGoBack}
        />

        {/* Tab Toggle Navigation Row */}
        <View style={styles.toggleBarContainer}>
          <TouchableOpacity
            style={[styles.togglePill, styles.activePill]}
            onPress={() => {}} // Already active inside this component context
          >
            <Text style={[styles.toggleText, styles.activeToggleText]}>
              Order book
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.togglePill}
            onPress={onToggleView} // 🌟 Routes user cleanly over to Recent Trades
          >
            <Text style={styles.toggleText}>Trades</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Mid price</Text>
          <Text style={styles.summaryValue}>
            $
            {orderBookData.midPriceUsd.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Spread</Text>
          <Text style={styles.summaryValue}>
            $
            {orderBookData.spreadUsd.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
        </View>

        <View style={styles.tableHeadRow}>
          <Text style={[styles.headLabel, { color: Colors.green }]}>Bids</Text>
          <Text style={[styles.headLabel, { color: Colors.newRed }]}>Asks</Text>
        </View>

        <View style={styles.listContainer}>
          {rowsArray.map((_, index) => (
            <OrderBookRow
              key={index}
              bid={orderBookData.bids[index] as OrderLevel}
              ask={orderBookData.asks[index] as OrderLevel}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onTradeAction?.(symbol)}
      >
        <Text style={styles.actionButtonText}>Trade {symbol}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 110,
  },
  toggleBarContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 24,
  },
  togglePill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  activePill: {
    backgroundColor: Colors.green,
  },
  toggleText: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.newSecondary,
  },
  activeToggleText: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
  },
  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 12,
  },
  summaryLabel: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  summaryValue: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  tableHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  headLabel: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    flex: 1,
  },
  listContainer: {
    marginTop: 4,
  },
  actionButton: {
    position: "absolute",
    bottom: 80,
    left: 24,
    right: 24,
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
});
