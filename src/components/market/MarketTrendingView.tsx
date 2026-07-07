import React, { useState, useEffect, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../common/BackHeader";
import MarketAssetRow from "./component/MarketAssetRow";
import { useGetTrendingAssetsQuery } from "@/src/services/marketApi";
import MarketMiniSparkline from "./component/MarketMiniSparkline";

// Math to calculate exact inner width of the pulse card automatically
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PULSE_CHART_WIDTH = SCREEN_WIDTH - 24 * 2 - 16 * 2;

interface MarketTrendingViewProps {
  onGoBack: () => void;
  onSelectAsset: (symbol: string) => void;
}

export default function MarketTrendingView({
  onGoBack,
  onSelectAsset,
}: MarketTrendingViewProps) {
  const [period, setPeriod] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1D");

  // 📈 Hook into the trending API endpoint cleanly
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

  // 🧠 Stable array fallback reference to stop dependency thrashing
  const trendingList = useMemo(
    () => trendingResponse?.data ?? [],
    [trendingResponse?.data],
  );
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

  // 📊 Local timeline filtering logic for the Market Pulse chart
  const fallbackPulseData = useMemo(() => {
    const rawData = trendingList[0]
      ? mapChartData(trendingList[0].sparkline)
      : [];
    if (rawData.length === 0) {
      return [
        { timestamp: 1, value: 100 },
        { timestamp: 2, value: 105 },
      ];
    }

    // Slice data array lengths based on selected time window pill
    switch (period) {
      case "1H":
        return rawData.slice(-4);
      case "1D":
        return rawData.slice(-24);
      case "1W":
        return rawData.slice(-168);
      default:
        return rawData;
    }
  }, [trendingList, period]);

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
          {/* 🟢 TOP GAINER HERO CARD - POWERED BY MARKETMINISPARKLINE */}
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

                <View style={styles.heroChartWrapper}>
                  {heroAssetItem?.sparkline &&
                  heroAssetItem.sparkline.length > 0 ? (
                    <MarketMiniSparkline
                      points={heroAssetItem.sparkline}
                      isPositive={featuredHero.change24h >= 0}
                      width={160}
                      height={65}
                    />
                  ) : (
                    <View
                      style={[
                        styles.fallbackTrendLine,
                        { borderColor: Colors.green },
                      ]}
                    />
                  )}
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
                    ? `${featuredHero.change24h >= 0 ? "+" : ""}${featuredHero.change24h.toFixed(1)}% avg`
                    : "--"}
                </Text>
                <Text style={styles.refreshingText}>Refreshing</Text>
              </View>
            </View>

            <View style={styles.pulseChartArea}>
              <LineChart.Provider data={fallbackPulseData}>
                <LineChart width={PULSE_CHART_WIDTH} height={50} absolute>
                  {[10, 20, 30, 40].map((val, idx) => (
                    <LineChart.HorizontalLine
                      key={idx}
                      color="rgba(255, 255, 255, 0.04)"
                      // width={1}
                      at={{ index: idx }}
                    />
                  ))}
                  <LineChart.Path color={Colors.green} width={2}>
                    <LineChart.Gradient color="rgba(0, 255, 163, 0.08)" />
                    <LineChart.Dot
                      at={fallbackPulseData.length - 1}
                      color="#5CD6A5"
                      size={7}
                    />
                  </LineChart.Path>
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
                    period === t
                      ? styles.activeTimePill
                      : styles.inactiveTimePill,
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
  container: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  centerLoader: {
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  gainerCard: {
    backgroundColor: "#063A24",
    borderRadius: 24,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 154,
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
    overflow: "hidden",
  },
  heroChartWrapper: {
    width: "100%",
    height: 65,
    marginTop: "auto",
    justifyContent: "center",
    overflow: "hidden",
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
  pulseCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 16,
    paddingBottom: 14,
    marginBottom: 20,
    height: 164,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  pulseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pulseTitle: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  pulseSubtitle: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 11,
    fontFamily: FontFamily.medium,
    marginTop: 2,
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
    marginTop: 2,
  },
  pulseChartArea: {
    height: 50,
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  timeframeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  timePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveTimePill: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  activeTimePill: {
    backgroundColor: "#113124",
    borderWidth: 1,
    borderColor: "rgba(92, 214, 165, 0.15)",
  },
  timeText: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 11,
    fontFamily: FontFamily.bold,
  },
  activeTimeText: {
    color: "#5CD6A5",
    fontFamily: FontFamily.bold,
  },
  listSection: { gap: 14 },
  rowCardWrapper: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: -2,
  },
  fallbackTrendLine: {
    borderBottomWidth: 2,
    width: "80%",
    alignSelf: "center",
    transform: [{ rotate: "-6deg" }],
    opacity: 0.4,
  },
});
