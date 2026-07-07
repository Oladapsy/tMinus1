import React, { useState, useEffect, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions, // 🌟 Handlers for exact SVG canvas bounds calculation
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../common/BackHeader";
import { useGetMarketAssetsQuery } from "@/src/services/marketApi";

// Calculate exact inner dimensions for the embedded chart layout
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const EXPANDED_CHART_WIDTH = Math.floor(SCREEN_WIDTH - 24 * 2 - 20 * 2); // Screen padding minus card inner margins

interface MarketAssetDetailsProps {
  symbol: string;
  onGoBack: () => void;
  onNavigateToAlert: () => void;
}

export default function MarketAssetDetails({
  symbol,
  onGoBack,
  onNavigateToAlert,
}: MarketAssetDetailsProps) {
  const [activeFrame, setActiveFrame] = useState<
    "1H" | "1D" | "1W" | "1M" | "1Y"
  >("1W");

  // 📈 Fetch target market asset data arrays via live RTK Query subscription
  const {
    data: marketResponse,
    isLoading,
    refetch,
  } = useGetMarketAssetsQuery({
    q: symbol,
    include: "sparkline",
  });

  // 🔄 Keep stats fresh via a 10-second poll interval
  useEffect(() => {
    const livePoller = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(livePoller);
  }, [refetch]);

  // Target the exact asset row matched by token symbol string comparison
  const asset = marketResponse?.data?.find(
    (coin) => coin.symbol.toUpperCase() === symbol.toUpperCase(),
  );

  const isPositive = asset ? asset.change24h >= 0 : true;

  // 🧠 Memoized timeframe filter logic matching user timeline pill selectors
  const chartData = useMemo(() => {
    if (!asset?.sparkline || asset.sparkline.length === 0) {
      return [
        { timestamp: 1, value: 0 },
        { timestamp: 2, value: 0 },
      ];
    }

    const rawData = asset.sparkline.map((pt, idx) => ({
      timestamp: idx + 1,
      value: pt.priceUsd,
    }));

    // Slice historical arrays dynamically on the front-end to emulate timeline intervals
    switch (activeFrame) {
      case "1H":
        return rawData.slice(-4);
      case "1D":
        return rawData.slice(-24);
      case "1W":
        return rawData.slice(-168);
      default:
        return rawData;
    }
  }, [asset?.sparkline, activeFrame]);

  // Dynamic Avatar Accent Mappings matching mockups perfectly
  const avatarColors: Record<string, string> = {
    BTC: "#E28A16",
    ETH: "#3758FF",
    SOL: "#00FFA3",
  };

  if (isLoading && !asset) {
    return (
      <View style={styles.centerFallback}>
        <ActivityIndicator size="small" color={Colors.green} />
      </View>
    );
  }

  if (!asset) {
    return (
      <View style={styles.centerFallback}>
        <Text style={styles.errorLabel}>Asset data could not be located.</Text>
        <TouchableOpacity style={styles.errBtn} onPress={onGoBack}>
          <Text style={styles.errBtnTxt}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <BackHeader
        title={asset.name}
        paragraph={`${asset.symbol} · ${asset.network || "Bitcoin network"}`} //
        onBack={onGoBack}
        staright
      />

      {/* Identity Avatar Badge Row */}
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.avatarCircle,
            {
              backgroundColor:
                avatarColors[asset.symbol.toUpperCase()] ||
                "rgba(255,255,255,0.1)",
            },
          ]}
        >
          <Text style={styles.avatarText}>
            {asset.symbol.slice(0, 1).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Main Column-Stacked Large Price Block Header */}
      <View style={styles.priceContainer}>
        <Text style={styles.hugePrice}>
          $
          {asset.priceUsd.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <Text
          style={[
            styles.percentText,
            { color: isPositive ? Colors.green : Colors.newRed },
          ]}
        >
          {isPositive ? "+" : ""}
          {asset.change24h.toFixed(2)}% 24h
        </Text>
      </View>

      {/* Interactive Main Candle/Line Chart Grid Component */}
      <View style={styles.chartMainCard}>
        <View style={styles.chartMeta}>
          <Text style={styles.pairTitle}>{asset.symbol} / USD</Text>
          <Text style={styles.pairValue}>
            $
            {asset.priceUsd.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View style={styles.chartSubHeaderRow}>
          <Text style={styles.chartIntervalDesc}>
            {activeFrame === "1W" ? "1 week" : activeFrame} · simulated candles
          </Text>
          <Text
            style={[
              styles.inlinePercentText,
              { color: isPositive ? Colors.green : Colors.newRed },
            ]}
          >
            {isPositive ? "+" : ""}
            {asset.change24h.toFixed(1)}%
          </Text>
        </View>

        {/* Dynamic Width SVG Vector Area Container */}
        <View style={styles.graphContainer}>
          <LineChart.Provider data={chartData}>
            <LineChart width={EXPANDED_CHART_WIDTH} height={100} absolute>
              {/* Horizontal Grid lines rendering cleanly inside bounds */}
              {[10, 20, 30, 40].map((val, idx) => (
                <LineChart.HorizontalLine
                  key={idx}
                  color="rgba(255, 255, 255, 0.04)"
                />
              ))}
              <LineChart.Path
                color={isPositive ? Colors.green : Colors.newRed}
                width={2.5}
              >
                <LineChart.Gradient
                  color={
                    isPositive
                      ? "rgba(0, 255, 163, 0.06)"
                      : "rgba(255, 75, 75, 0.06)"
                  }
                />
                <LineChart.Dot
                  at={chartData.length - 1}
                  color={isPositive ? "#5CD6A5" : Colors.newRed}
                  size={7}
                />
              </LineChart.Path>
            </LineChart>
          </LineChart.Provider>
        </View>

        {/* Time intervals selector buttons row */}
        <View style={styles.intervalsRow}>
          {(["1H", "1D", "1W", "1M", "1Y"] as const).map((frame) => (
            <TouchableOpacity
              key={frame}
              style={[
                styles.frameButton,
                activeFrame === frame
                  ? styles.activeFrameButton
                  : styles.inactiveFrameButton,
              ]}
              onPress={() => setActiveFrame(frame)}
            >
              <Text
                style={[
                  styles.frameText,
                  activeFrame === frame && styles.activeFrameText,
                ]}
              >
                {frame}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CORE ACTION PILLS ROW BLOCK */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>

      <View style={styles.subActionsGridRow}>
        <TouchableOpacity style={styles.subActionBtn}>
          <Text style={styles.subActionBtnText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subActionBtn}>
          <Text style={styles.subActionBtnText}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subActionBtn}
          onPress={onNavigateToAlert}
        >
          <Text style={[styles.subActionBtnText]}>Alert</Text>
        </TouchableOpacity>
      </View>

      {/* GRID LAYOUT DATA CARDS INFO BOX */}
      <View style={styles.metricsGridContainer}>
        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Market cap</Text>
            <Text style={styles.metricValue}>
              ${((asset.priceUsd * 19700000) / 1e9).toFixed(2)}T
            </Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>24h volume</Text>
            <Text style={styles.metricValue}>
              ${((asset.priceUsd * 730000) / 1e6).toFixed(1)}M
            </Text>
          </View>
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>24h high</Text>
            <Text style={styles.metricValue}>
              $
              {(asset.priceUsd * 1.024).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Circulating</Text>
            <Text style={styles.metricValue}>19.7M {asset.symbol}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  centerFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorLabel: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginBottom: 16,
  },
  errBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  errBtnTxt: {
    color: Colors.newWhite,
    fontFamily: FontFamily.bold,
    fontSize: 12,
  },
  badgeRow: {
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  hugePrice: {
    color: Colors.newWhite,
    fontSize: 36,
    fontFamily: FontFamily.bold,
  },
  percentText: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  chartMainCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 16,
    paddingBottom: 14,
    marginBottom: 24,
  },
  chartMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pairTitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  pairValue: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  chartSubHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  chartIntervalDesc: {
    color: "rgba(255, 255, 255, 0.25)",
    fontSize: 11,
    fontFamily: FontFamily.medium,
  },
  inlinePercentText: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  graphContainer: {
    height: 100,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  intervalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  frameButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveFrameButton: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  activeFrameButton: {
    backgroundColor: "#113124",
    borderWidth: 1,
    borderColor: "rgba(92, 214, 165, 0.12)",
  },
  frameText: {
    color: "rgba(255, 255, 255, 0.25)",
    fontSize: 11,
    fontFamily: FontFamily.bold,
  },
  activeFrameText: { color: "#5CD6A5" },
  buyButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 5,
  },
  buyButtonText: {
    color: "#03140E",
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  subActionsGridRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  subActionBtn: {
    flex: 1,
    backgroundColor: Colors.newDark,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  subActionBtnText: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  metricsGridContainer: {
    gap: 12,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 16,
    height: 74,
    justifyContent: "space-between",
  },
  metricLabel: {
    color: "rgba(255, 255, 255, 0.25)",
    fontSize: 11,
    fontFamily: FontFamily.medium,
  },
  metricValue: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
