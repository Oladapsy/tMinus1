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
import RecentTradeCard, { TradeItemPayload } from "./component/RecentTradeCard";

const MOCK_TRADES_ARRAY: TradeItemPayload[] = [
  {
    id: "t1",
    side: "buy",
    priceUsd: 64206.1,
    amount: 0.015,
    totalUsd: 963.09,
    createdAt: "2026-05-27T09:00:00.000Z",
  },
  {
    id: "t2",
    side: "sell",
    priceUsd: 64194.2,
    amount: 0.0201,
    totalUsd: 1290.3,
    createdAt: "2026-05-27T08:59:48.000Z",
  },
  {
    id: "t3",
    side: "buy",
    priceUsd: 64211.0,
    amount: 0.008,
    totalUsd: 513.69,
    createdAt: "2026-05-27T08:59:12.000Z",
  },
  {
    id: "t4",
    side: "buy",
    priceUsd: 64203.44,
    amount: 0.044,
    totalUsd: 2824.95,
    createdAt: "2026-05-27T08:58:30.000Z",
  },
  {
    id: "t5",
    side: "sell",
    priceUsd: 64188.17,
    amount: 0.019,
    totalUsd: 1219.58,
    createdAt: "2026-05-27T08:57:55.000Z",
  },
  {
    id: "t6",
    side: "buy",
    priceUsd: 64218.25,
    amount: 0.011,
    totalUsd: 706.4,
    createdAt: "2026-05-27T08:57:01.000Z",
  },
  {
    id: "t7",
    side: "sell",
    priceUsd: 64182.9,
    amount: 0.037,
    totalUsd: 2374.77,
    createdAt: "2026-05-27T08:56:44.000Z",
  },
];

interface RecentTradesProps {
  onGoBack: () => void;
  onToggleView: () => void;
}

export default function RecentTrades({
  onGoBack,
  onToggleView,
}: RecentTradesProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <BackHeader
        title="Recent trades"
        paragraph="Latest simulated market prints."
        onBack={onGoBack}
      />

      {/* Styled Navigation Toggle Bar Component */}
      <View style={styles.toggleBarContainer}>
        <TouchableOpacity
          style={styles.togglePill}
          onPress={onToggleView} // 🌟 Flips workflow state back over to Screen 4 orderbook
        >
          <Text style={styles.toggleText}>Order book</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.togglePill, styles.activePill]}
          onPress={() => {}} // Keep active locally
        >
          <Text style={[styles.toggleText, styles.activeToggleText]}>
            Trades
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        {MOCK_TRADES_ARRAY.map((item) => (
          <RecentTradeCard key={item.id} trade={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
  listSection: {
    marginTop: 4,
  },
});
