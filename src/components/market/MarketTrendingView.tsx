import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "@/src/components/common/BackHeader";
import MarketAssetRow, { TrendingAssetData } from "./component/MarketAssetRow";

// Complete JSON fallback dump matching GET /market/trending contract exactly
const MOCK_TRENDING_PAYLOAD = {
  data: [
    {
      id: "asset_sol",
      symbol: "SOL",
      name: "Solana",
      network: "Solana Devnet",
      priceUsd: 152,
      change24h: 4.2,
      isActive: true,
      minBuyUsd: 10,
      minSellUsd: 10,
      iconUrl: "/assets/sol.svg",
      sparkline: [
        { time: "2026-05-25T08:00:00.000Z", priceUsd: 145.88 },
        { time: "2026-05-25T09:00:00.000Z", priceUsd: 149.31 },
        { time: "2026-05-25T10:00:00.000Z", priceUsd: 152 },
      ],
    },
    {
      id: "asset_btc",
      symbol: "BTC",
      name: "Bitcoin",
      network: "Bitcoin Testnet",
      priceUsd: 64200.5,
      change24h: 2.1,
      isActive: true,
      minBuyUsd: 10,
      minSellUsd: 10,
      iconUrl: "/assets/btc.svg",
      sparkline: [
        { time: "2026-05-25T08:00:00.000Z", priceUsd: 62916.49 },
        { time: "2026-05-25T09:00:00.000Z", priceUsd: 63879.5 },
        { time: "2026-05-25T10:00:00.000Z", priceUsd: 64200.5 },
      ],
    },
  ],
  meta: {
    count: 2,
    featured: {
      type: "top_gainer",
      symbol: "SOL",
      name: "Solana",
      priceUsd: 152,
      change24h: 4.2,
      reason: "Highest 24h percentage gain among active assets",
    },
  },
};

interface MarketTrendingViewProps {
  onGoBack: () => void;
  onSelectAsset: (symbol: string) => void;
}

export default function MarketTrendingView({
  onGoBack,
  onSelectAsset,
}: MarketTrendingViewProps) {
  const featured = MOCK_TRENDING_PAYLOAD.meta.featured;
  const listData = MOCK_TRENDING_PAYLOAD.data as TrendingAssetData[];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <BackHeader
        title="Trending"
        paragraph="Top moving assets from the simulated market feed."
        onBack={onGoBack}
      />

      {/* 🚀 Feature Spotlight: Dynamic Top Gainer Card */}
      <View style={styles.spotlightCard}>
        <View style={styles.badgeRow}>
          <View style={styles.tagLabel}>
            <Text style={styles.tagText}>
              {featured.type.toUpperCase().replace("_", " ")} · 24H
            </Text>
          </View>
          <Text style={styles.spotlightPrice}>
            ${featured.priceUsd.toFixed(2)}
          </Text>
        </View>

        <View style={styles.assetMetaRow}>
          <View>
            <Text style={styles.spotlightName}>{featured.name}</Text>
            <Text style={styles.spotlightSub}>{featured.reason}</Text>
          </View>
          <Text style={styles.spotlightPercentage}>+{featured.change24h}%</Text>
        </View>

        <TouchableOpacity
          style={styles.viewAssetButton}
          onPress={() => onSelectAsset(featured.symbol)}
        >
          <Text style={styles.viewAssetButtonText}>View asset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Market pulse</Text>
        <Text style={styles.sectionSubtitle}>
          Simulated live feed · Refreshing
        </Text>
      </View>

      <View style={styles.listContainer}>
        {listData.map((coin) => (
          <MarketAssetRow key={coin.id} coin={coin} onPress={onSelectAsset} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
     paddingHorizontal: 24, paddingBottom: 40 },
  spotlightCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 20,
    marginTop: 16,
    marginBottom: 28,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tagLabel: {
    backgroundColor: "rgba(94, 213, 168, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  tagText: { color: Colors.green, fontSize: 10, fontFamily: FontFamily.bold },
  spotlightPrice: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  assetMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  spotlightName: {
    color: Colors.newWhite,
    fontSize: 24,
    fontFamily: FontFamily.bold,
  },
  spotlightSub: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginTop: 4,
    maxWidth: "75%",
  },
  spotlightPercentage: {
    color: Colors.green,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  viewAssetButton: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  viewAssetButtonText: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  sectionSubtitle: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
    marginTop: 4,
  },
  listContainer: { gap: 18 },
});
