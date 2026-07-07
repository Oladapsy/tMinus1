import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../common/BackHeader";
import MarketAssetRow from "./component/MarketAssetRow";
import { useGetTrendingAssetsQuery } from "@/src/services/marketApi";

interface MarketTrendingViewProps {
  onGoBack: () => void;
  onSelectAsset: (symbol: string) => void;
}

export default function MarketTrendingView({
  onGoBack,
  onSelectAsset,
}: MarketTrendingViewProps) {
  const [period, setPeriod] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1D");

  // 📈 Hook into the trending API endpoint with automatic live updates
  const {
    data: trendingResponse,
    isLoading,
    refetch,
  } = useGetTrendingAssetsQuery({
    include: "sparkline",
  });

  // 🔄 Keep values active via a 10-second automatic polling cycle
  useEffect(() => {
    const poller = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(poller);
  }, [refetch]);

  const trendingList = trendingResponse?.data ?? [];
  const featuredHero = trendingResponse?.meta?.featured;

  // 🛠️ Map API sparkline format ({ time, priceUsd }) to wagmi-charts expectation ({ timestamp, value })
  const mapChartData = (
    sparklinePoints?: { time: string; priceUsd: number }[],
  ) => {
    if (!sparklinePoints || sparklinePoints.length === 0) {
      return [
        { timestamp: 1, value: 0 },
        { timestamp: 2, value: 0 },
      ];
    }
    return sparklinePoints.map((pt, idx) => ({
      timestamp: idx + 1,
      value: pt.priceUsd,
    }));
  };

  // Find sparkline data for the hero asset from the list array
  const heroAssetItem = trendingList.find(
    (item) => item.symbol === featuredHero?.symbol,
  );
  const heroChartData = mapChartData(heroAssetItem?.sparkline);

  // Default fallback data for global market pulse timeline
  const fallbackPulseData = trendingList[0]
    ? mapChartData(trendingList[0].sparkline)
    : [
        { timestamp: 1, value: 100 },
        { timestamp: 2, value: 105 },
      ];

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

      {isLoading && trendingList.length === 0 ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator size="small" color={Colors.green} />
        </View>
      ) : (
        <>
          {/* 🟢 TOP GAINER HERO CARD - CONNECTED TO API */}
          {featuredHero && (
            <View style={styles.gainerCard}>
              {/* Left Column: Core Identity Metadata */}
              <View style={styles.gainerLeftColumn}>
                <Text style={styles.gainerTag}>
                  {featuredHero.type.replace("_", " ").toUpperCase()} · 24H
                </Text>
                <Text style={styles.gainerName} numberOfLines={1}>
                  {featuredHero.name}
                </Text>
                <Text style={styles.gainerSubtitle} numberOfLines={1}>
                  {featuredHero.reason || "Highest 24h move"}
                </Text>

                <TouchableOpacity
                  style={styles.viewAssetBtn}
                  onPress={() => onSelectAsset(featuredHero.symbol)}
                >
                  <Text style={styles.viewAssetBtnText}>View asset</Text>
                </TouchableOpacity>
              </View>

              {/* Right Column: Price Feed + Sparkline Stream */}
              <View style={styles.gainerRightColumn}>
                <View style={styles.priceContainer}>
                  <Text style={styles.gainerPrice}>
                    $
                    {featuredHero.priceUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                  <Text style={styles.gainerPercent}>
                    {featuredHero.change24h >= 0 ? "+" : ""}
                    {featuredHero.change24h.toFixed(1)}%
                  </Text>
                </View>

                {/* 🔒 Bounded Wrapper containing the SVG path overflows */}
                <View style={styles.heroChartWrapper}>
                  <LineChart.Provider data={heroChartData}>
                    <LineChart height={54} absolute>
                      <LineChart.Path color={Colors.green} width={2}>
                        <LineChart.Gradient color="rgba(0, 255, 163, 0.12)" />
                      </LineChart.Path>
                    </LineChart>
                  </LineChart.Provider>
                </View>
              </View>
            </View>
          )}

          {/* 📊 MARKET PULSE CHART COMPONENT */}
          <View style={styles.pulseCard}>
            <View style={styles.pulseHeader}>
              <View>
                <Text style={styles.pulseTitle}>Market pulse</Text>
                <Text style={styles.pulseSubtitle}>Simulated live feed</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.pulseAvg}>
                  {featuredHero
                    ? `${featuredHero.change24h >= 0 ? "+" : ""}${featuredHero.change24h.toFixed(1)}% max`
                    : "--"}
                </Text>
                <Text style={styles.refreshingText}>Refreshing</Text>
              </View>
            </View>

            <View style={styles.pulseChartArea}>
              <LineChart.Provider data={fallbackPulseData}>
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
                  style={[
                    styles.timePill,
                    period === t && styles.activeTimePill,
                  ]}
                  onPress={() => setPeriod(t)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      period === t && styles.activeTimeText,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ASSETS STACK LIST SECTION */}
          <View style={styles.listSection}>
            {trendingList.map((coin) => (
              <View key={coin.id} style={styles.rowCardWrapper}>
                <MarketAssetRow coin={coin} onPress={onSelectAsset} />
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 40 },
  centerLoader: {
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  gainerCard: {
    backgroundColor: "#063A24", // Deep forest green backdrop
    borderRadius: 24,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 154, // Perfectly scales text content and line path side by side
  },
  gainerLeftColumn: {
    flex: 1.1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  gainerRightColumn: {
    flex: 1.3,
    justifyContent: "space-between",
    alignItems: "stretch",
    overflow: "hidden", // 👈 Protects the right edge layout boundary
  },
  heroChartWrapper: {
    height: 54,
    marginTop: "auto",
    overflow: "hidden", // 👈 Clips the internal path canvas perfectly
    borderRadius: 12, // Matches the card flow aesthetics
  },
  priceContainer: {
    alignItems: "flex-end",
    marginBottom: 4,
  },
  gainerTag: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.5,
  },
  gainerName: {
    color: Colors.newWhite,
    fontSize: 26,
    fontFamily: FontFamily.bold,
    marginTop: 2,
  },
  gainerSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginTop: -2,
    marginBottom: 10,
  },
  gainerPrice: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  gainerPercent: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.bold,
    marginTop: 2,
  },
  viewAssetBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewAssetBtnText: {
    color: Colors.newWhite,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
