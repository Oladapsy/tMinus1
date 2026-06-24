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

const DETAILED_CHART_MOCK = [
  { timestamp: 1, value: 61000 },
  { timestamp: 2, value: 61500 },
  { timestamp: 3, value: 63000 },
  { timestamp: 4, value: 62400 },
  { timestamp: 5, value: 64200.5 },
];

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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <BackHeader
        title={symbol === "BTC" ? "Bitcoin" : symbol}
        paragraph={`${symbol} · Bitcoin network`}
        onBack={onGoBack}
      />

      <View style={styles.badgeRow}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>B</Text>
        </View>
      </View>

      {/* Main Large Price Block Header */}
      <View style={styles.priceContainer}>
        <Text style={styles.hugePrice}>$64,200.50</Text>
        <Text style={styles.percentText}>+2.1% 24h</Text>
      </View>

      {/* Interactive Main Candle/Line Chart Grid Component */}
      <View style={styles.chartMainCard}>
        <View style={styles.chartMeta}>
          <Text style={styles.pairTitle}>{symbol} / USD</Text>
          <Text style={styles.pairValue}>$64,200.50</Text>
        </View>
        <Text style={styles.chartIntervalDesc}>1 week · simulated candles</Text>

        <View style={styles.graphContainer}>
          <LineChart.Provider data={DETAILED_CHART_MOCK}>
            <LineChart height={120}>
              <LineChart.Path color={Colors.green} width={2.5} />
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

      {/* CORE HOT ACTION PILLS ROW BLOCK */}
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
          <Text style={styles.metricValue}>$1.26T</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>24h volume</Text>
          <Text style={styles.metricValue}>$47.0B</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>24h high</Text>
          <Text style={styles.metricValue}>$65,742</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Circulating</Text>
          <Text style={styles.metricValue}>19.7M BTC</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 40 },
  badgeRow: { marginTop: 12, marginBottom: 8 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E28A16",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.primary,
    fontSize: 18,
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
    color: Colors.green,
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
  metricsGridContainer: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
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
