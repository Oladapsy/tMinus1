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
import { useGetMarketAssetsQuery } from "@/src/services/marketApi";

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

  // 📈 Search for the single asset using the parent workflow token string symbol
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

  // 🛠️ Map raw API array points to WAGMI charts compatible layout structure
  const chartData =
    asset?.sparkline && asset.sparkline.length > 0
      ? asset.sparkline.map((pt, idx) => ({
          timestamp: idx + 1,
          value: pt.priceUsd,
        }))
      : [
          { timestamp: 1, value: 0 },
          { timestamp: 2, value: 0 },
        ];

  // Dynamic Avatar Accent Mappings
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
        paragraph={`${asset.symbol} · ${asset.network || "Network Layer"}`}
        onBack={onGoBack}
      />

      <View style={styles.badgeRow}>
        <View
          style={[
            styles.avatarCircle,
            {
              backgroundColor:
                avatarColors[asset.symbol] || "rgba(255,255,255,0.1)",
            },
          ]}
        >
          <Text style={styles.avatarText}>
            {asset.symbol.slice(0, 1).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Main Large Price Block Header */}
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
            })}
          </Text>
        </View>
        <Text style={styles.chartIntervalDesc}>
          {activeFrame} · simulated feed
        </Text>

        <View style={styles.graphContainer}>
          <LineChart.Provider data={chartData}>
            <LineChart height={120}>
              <LineChart.Path
                color={isPositive ? Colors.green : Colors.newRed}
                width={2.5}
              />
            </LineChart>
          </LineChart.Provider>
        </View>

        {/* Time intervals button selectors */}
        <View style={styles.intervalsRow}>
          {(["1H", "1D", "1W", "1M", "1Y"] as const).map((frame) => (
            <TouchableOpacity
              key={frame}
              style={[
                styles.frameButton,
                activeFrame === frame && styles.activeFrameButton,
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
          <Text style={[styles.subActionBtnText, { color: Colors.green }]}>
            Alert
          </Text>
        </TouchableOpacity>
      </View>

      {/* GRID LAYOUT DATA CARDS INFO INFO BOX */}
      <View style={styles.metricsGridContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Market cap</Text>
          <Text style={styles.metricValue}>
            ${((asset.priceUsd * 19700000) / 1e9).toFixed(1)}B
          </Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>24h volume</Text>
          <Text style={styles.metricValue}>
            ${((asset.priceUsd * 730000) / 1e6).toFixed(1)}M
          </Text>
        </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 40 },
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
  badgeRow: { marginTop: 12, marginBottom: 8 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 20,
  },
  hugePrice: {
    color: Colors.newWhite,
    fontSize: 34,
    fontFamily: FontFamily.bold,
  },
  percentText: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  chartMainCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  chartMeta: { flexDirection: "row", justifyContent: "space-between" },
  pairTitle: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  pairValue: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  chartIntervalDesc: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
    marginTop: 2,
  },
  graphContainer: { height: 120, marginVertical: 14 },
  intervalsRow: { flexDirection: "row", justifyContent: "space-between" },
  frameButton: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 10 },
  activeFrameButton: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  frameText: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
  },
  activeFrameText: { color: Colors.green, fontFamily: FontFamily.bold },
  buyButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  buyButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  subActionsGridRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  subActionBtn: {
    flex: 1,
    backgroundColor: Colors.newDark,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  subActionBtnText: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  metricsGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCard: {
    backgroundColor: Colors.newDark,
    width: "48%",
    borderRadius: 14,
    padding: 16,
  },
  metricLabel: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
    marginBottom: 6,
  },
  metricValue: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
});
