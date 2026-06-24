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

// 🌟 Import your existing, asset row component and its types
import MarketAssetRow, {
  TrendingAssetData,
} from "@/src/components/market/component/MarketAssetRow";

// Mock dataset mapping perfectly to your TrendingAssetData schema contract
const MOCK_WATCHLIST_DATA: TrendingAssetData[] = [
  {
    id: "w1",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    priceUsd: 64200.5,
    change24h: 2.1,
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "",
    sparkline: [
      { time: "1", priceUsd: 63000 },
      { time: "2", priceUsd: 63400 },
      { time: "3", priceUsd: 63200 },
      { time: "4", priceUsd: 63900 },
      { time: "5", priceUsd: 64200.5 },
    ],
  },
  {
    id: "w2",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum",
    priceUsd: 3420.0,
    change24h: -1.1,
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "",
    sparkline: [
      { time: "1", priceUsd: 3500 },
      { time: "2", priceUsd: 3460 },
      { time: "3", priceUsd: 3480 },
      { time: "4", priceUsd: 3440 },
      { time: "5", priceUsd: 3420.0 },
    ],
  },
  {
    id: "w3",
    name: "Solana",
    symbol: "SOL",
    network: "Solana",
    priceUsd: 152.0,
    change24h: 4.2,
    isActive: true,
    minBuyUsd: 5,
    minSellUsd: 5,
    iconUrl: "",
    sparkline: [
      { time: "1", priceUsd: 142 },
      { time: "2", priceUsd: 145 },
      { time: "3", priceUsd: 148 },
      { time: "4", priceUsd: 150 },
      { time: "5", priceUsd: 152.0 },
    ],
  },
];

interface MarketWatchlistProps {
  onGoBack: () => void;
  onExploreMarkets: () => void;
  onSelectAsset: (symbol: string) => void;
}

export default function MarketWatchlist({
  onGoBack,
  onExploreMarkets,
  onSelectAsset,
}: MarketWatchlistProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Dynamic Context Header Block */}
        <BackHeader
          title="Watchlist"
          paragraph="Assets you follow with row sparklines."
          onBack={onGoBack}
        />

        {/* Watchlist Container wrapper adding layout spacing to match your designs */}
        <View style={styles.listSection}>
          {MOCK_WATCHLIST_DATA.map((coin) => (
            <View key={coin.id} style={styles.rowCardWrapper}>
              <MarketAssetRow coin={coin} onPress={onSelectAsset} />
            </View>
          ))}
        </View>

        {/* "Add more assets" Callout Container Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Add more assets</Text>
          <Text style={styles.infoDescription}>
            Use the market list to add coins to your watchlist.
          </Text>
        </View>
      </ScrollView>

      {/* Main Bottom Core Action Button Row */}
      <TouchableOpacity style={styles.actionButton} onPress={onExploreMarkets}>
        <Text style={styles.actionButtonText}>Explore markets</Text>
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
  listSection: {
    marginTop: 10,
  },
  rowCardWrapper: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 30,
    marginTop: 12,
    marginBottom: 10,
  },
  infoTitle: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginBottom: 5,
  },
  infoDescription: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    lineHeight: 18,
  },
  actionButton: {
    position: "absolute",
    bottom: 77,
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
