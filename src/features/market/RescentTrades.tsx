import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import RecentTradeCard from "./component/RecentTradeCard";
import { useGetRecentTradesQuery } from "@/src/features/market/api/marketApi";
import BackHeader from "../shared/components/BackHeader";

interface RecentTradesProps {
  symbol: string; // 🌟 Passed down from parent context
  onGoBack: () => void;
  onToggleView: () => void;
}

export default function RecentTrades({
  symbol,
  onGoBack,
  onToggleView,
}: RecentTradesProps) {
  // 🔄 Hook into live transaction prints stream
  const {
    data: tradesResponse,
    isLoading,
    refetch,
  } = useGetRecentTradesQuery({
    symbol,
  });

  // ⏱️ Auto-poll every 10 seconds to catch live trade tape fills
  useEffect(() => {
    const tradePoller = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(tradePoller);
  }, [refetch]);

  const tradesList = tradesResponse?.data ?? [];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <BackHeader
        title={`${symbol.toUpperCase()} recent trades`}
        paragraph="Latest simulated market prints."
        onBack={onGoBack}
      />

      {/* Styled Navigation Toggle Bar Component */}
      <View style={styles.toggleBarContainer}>
        <TouchableOpacity style={styles.togglePill} onPress={onToggleView}>
          <Text style={styles.toggleText}>Order book</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.togglePill, styles.activePill]}
          onPress={() => {}}
        >
          <Text style={[styles.toggleText, styles.activeToggleText]}>
            Trades
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading && tradesList.length === 0 ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator size="small" color={Colors.green} />
        </View>
      ) : (
        <View style={styles.listSection}>
          {tradesList.map((item) => (
            <RecentTradeCard key={item.id} trade={item} />
          ))}

          {!isLoading && tradesList.length === 0 && (
            <Text style={styles.emptyText}>
              No transaction records found for this asset.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  centerLoader: {
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
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
  emptyText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    marginTop: 40,
  },
});
