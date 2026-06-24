import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../common/BackHeader";

// 🌟 Import your row component and type safely
import MarketAssetRow, { TrendingAssetData } from "./component/MarketAssetRow";

const TIMELINE_DATA = [
  { timestamp: 1, value: 140 },
  { timestamp: 2, value: 142 },
  { timestamp: 3, value: 141 },
  { timestamp: 4, value: 146 },
  { timestamp: 5, value: 144 },
  { timestamp: 6, value: 149 },
  { timestamp: 7, value: 152 },
];

// 🛠️ Fixed: Filled out missing properties to pass types cleanly
const MOCK_TRENDING_LIST: TrendingAssetData[] = [
  { 
    id: "doge", 
    name: "Dogecoin", 
    symbol: "DOGE", 
    network: "Dogecoin", 
    priceUsd: 0.16, 
    change24h: 2.8, 
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/doge.svg"
  },
  { 
    id: "btc", 
    name: "Bitcoin", 
    symbol: "BTC", 
    network: "Bitcoin", 
    priceUsd: 64200.5, 
    change24h: 2.1, 
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/btc.svg"
  },
  { 
    id: "link", 
    name: "Chainlink", 
    symbol: "LINK", 
    network: "Ethereum", 
    priceUsd: 18.4, 
    change24h: 1.7, 
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/link.svg"
  },
  { 
    id: "bnb", 
    name: "BNB", 
    symbol: "BNB", 
    network: "BSC", 
    priceUsd: 612.0, 
    change24h: 1.3, 
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/bnb.svg"
  },
];

interface MarketTrendingViewProps {
  onGoBack: () => void;
  onSelectAsset: (symbol: string) => void;
}

export default function MarketTrendingView({
  onGoBack,
  onSelectAsset,
}: MarketTrendingViewProps) {
  const [period, setPeriod] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1D");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <BackHeader
        title="Trending"
        paragraph="Top moving assets from the simulated market feed."
        onBack={onGoBack}
      />

      {/* 🟢 TOP GAINER HERO CARD */}
      <View style={styles.gainerCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.gainerTag}>TOP GAINER · 24H</Text>
            <Text style={styles.gainerName}>Solana</Text>
            <Text style={styles.gainerSubtitle}>Highest 24h move</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.gainerPrice}>$152.00</Text>
            <Text style={styles.gainerPercent}>+4.2%</Text>
          </View>
        </View>

        <View style={styles.heroChartWrapper}>
          <LineChart.Provider data={TIMELINE_DATA}>
            <LineChart height={60}>
              <LineChart.Path color={Colors.green} width={2.5} />
            </LineChart>
          </LineChart.Provider>
        </View>

        <TouchableOpacity
          style={styles.viewAssetBtn}
          onPress={() => onSelectAsset("SOL")}
        >
          <Text style={styles.viewAssetBtnText}>View asset</Text>
        </TouchableOpacity>
      </View>

      {/* 📊 MARKET PULSE CHART COMPONENT */}
      <View style={styles.pulseCard}>
        <View style={styles.pulseHeader}>
          <View>
            <Text style={styles.pulseTitle}>Market pulse</Text>
            <Text style={styles.pulseSubtitle}>Simulated live feed</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.pulseAvg}>+2.8% avg</Text>
            <Text style={styles.refreshingText}>Refreshing</Text>
          </View>
        </View>

        <View style={styles.pulseChartArea}>
          <LineChart.Provider data={TIMELINE_DATA}>
            <LineChart height={100}>
              <LineChart.Path color={Colors.green} width={2.5} />
            </LineChart>
          </LineChart.Provider>
        </View>

        {/* Timeline Range Selectors Row */}
        <View style={styles.timeframeRow}>
          {(["1H", "1D", "1W", "1M", "1Y"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timePill, period === t && styles.activeTimePill]}
              onPress={() => setPeriod(t)}
            >
              <Text
                style={[styles.timeText, period === t && styles.activeTimeText]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ASSETS STACK LIST SECTION */}
      <View style={styles.listSection}>
        {MOCK_TRENDING_LIST.map((coin) => (
          <View key={coin.id} style={styles.rowCardWrapper}>
            <MarketAssetRow coin={coin} onPress={onSelectAsset} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 40 },
  gainerCard: {
    backgroundColor: "#063A24",
    borderRadius: 24,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  gainerTag: { color: Colors.green, fontSize: 10, fontFamily: FontFamily.bold },
  gainerName: {
    color: Colors.newWhite,
    fontSize: 24,
    fontFamily: FontFamily.bold,
    marginTop: 4,
  },
  gainerSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  gainerPrice: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  gainerPercent: {
    color: Colors.green,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  heroChartWrapper: { height: 60, marginVertical: 12 },
  viewAssetBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  viewAssetBtnText: {
    color: Colors.newWhite,
    fontSize: 11,
    fontFamily: FontFamily.bold,
  },
  pulseCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  pulseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pulseTitle: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  pulseSubtitle: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
  },
  pulseAvg: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  refreshingText: {
    color: Colors.green,
    fontSize: 11,
    fontFamily: FontFamily.bold,
  },
  pulseChartArea: { height: 100, marginBottom: 16 },
  timeframeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timePill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 12 },
  activeTimePill: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  timeText: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
  },
  activeTimeText: { color: Colors.green, fontFamily: FontFamily.bold },
  listSection: { gap: 14 },
  rowCardWrapper: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: -2,
  },
});
