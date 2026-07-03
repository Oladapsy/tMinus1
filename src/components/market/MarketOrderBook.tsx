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
import BackHeader from "../common/BackHeader";
import OrderBookRow, { OrderLevel } from "./component/OrderBookRow";
import { useGetMarketOrderBookQuery } from "@/src/services/marketApi";

interface MarketOrderBookProps {
  symbol: string;
  onGoBack: () => void;
  onTradeAction?: (symbol: string) => void;
  onToggleView: () => void;
}

export default function MarketOrderBook({
  symbol,
  onGoBack,
  onTradeAction,
  onToggleView,
}: MarketOrderBookProps) {
  // 📊 Hook directly into the automated order book API stream
  const { data: orderBookResponse, isLoading, refetch } = useGetMarketOrderBookQuery({
    symbol,
  });

  // 🔄 Setup active polling loops to refresh engine order weights every 10 seconds
  useEffect(() => {
    const bookPoller = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(bookPoller);
  }, [refetch]);

  const bookData = orderBookResponse?.data;
  const bids = bookData?.bids ?? [];
  const asks = bookData?.asks ?? [];
  
  const rowCount = Math.max(bids.length, asks.length);
  const rowsArray = Array.from({ length: rowCount });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <BackHeader
          title={`${symbol.toUpperCase()} order book`}
          paragraph="Bid and ask levels for the trade screen."
          onBack={onGoBack}
        />

        {/* Tab Toggle Navigation Row */}
        <View style={styles.toggleBarContainer}>
          <TouchableOpacity
            style={[styles.togglePill, styles.activePill]}
            onPress={() => {}} 
          >
            <Text style={[styles.toggleText, styles.activeToggleText]}>
              Order book
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.togglePill}
            onPress={onToggleView} 
          >
            <Text style={styles.toggleText}>Trades</Text>
          </TouchableOpacity>
        </View>

        {isLoading && !bookData ? (
          <View style={styles.centerLoader}>
            <ActivityIndicator size="small" color={Colors.green} />
          </View>
        ) : (
          <>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Mid price</Text>
              <Text style={styles.summaryValue}>
                $
                {(bookData?.midPriceUsd ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Spread</Text>
              <Text style={styles.summaryValue}>
                $
                {(bookData?.spreadUsd ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>

            <View style={styles.tableHeadRow}>
              <Text style={[styles.headLabel, { color: Colors.green }]}>Bids</Text>
              <Text style={[styles.headLabel, { color: Colors.newRed, textAlign: "right" }]}>Asks</Text>
            </View>

            <View style={styles.listContainer}>
              {rowsArray.map((_, index) => (
                <OrderBookRow
                  key={index}
                  bid={bids[index] as OrderLevel}
                  ask={asks[index] as OrderLevel}
                />
              ))}

              {!isLoading && rowCount === 0 && (
                <Text style={styles.emptyText}>No active orders on the book.</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onTradeAction?.(symbol)}
      >
        <Text style={styles.actionButtonText}>Trade {symbol.toUpperCase()}</Text>
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
    paddingBottom: 160,
  },
  centerLoader: {
    paddingVertical: 80,
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
  emptyText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    marginTop: 40,
  },
  actionButton: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
});