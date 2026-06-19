import React, { useState, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ApiDataPoint {
  time: string;
  valueUsd: number;
  value: number;
  currency: string;
}

interface ApiPayload {
  "1D": { data: ApiDataPoint[]; latestValueUsd: number };
  "1W": { data: ApiDataPoint[]; latestValueUsd: number };
  "1M": { data: ApiDataPoint[]; latestValueUsd: number };
  "1Y": { data: ApiDataPoint[]; latestValueUsd: number };
}

interface PortfolioHistoryViewProps {
  onGoBack: () => void;
  apiPayload: ApiPayload;
}

export default function PortfolioHistoryView({
  onGoBack,
  apiPayload,
}: PortfolioHistoryViewProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<
    "1D" | "1W" | "1M" | "1Y"
  >("1M");

  // 1. Get the dataset dynamically based on the selected tab
  const activeDataset = useMemo(() => {
    return apiPayload[activeTimeframe] || { data: [], latestValueUsd: 0 };
  }, [apiPayload, activeTimeframe]);

  // 2. Map the active API data points into Unix timestamps for the chart engine
  const chartData = useMemo(() => {
    if (!activeDataset.data || activeDataset.data.length === 0) {
      return [{ timestamp: Date.now(), value: 0 }];
    }
    return activeDataset.data.map((point) => ({
      timestamp: new Date(point.time).getTime(),
      value: point.valueUsd,
    }));
  }, [activeDataset]);

  // Dynamic label contextualizer for the recent history logs list below the chart
  const periodLabelText = {
    "1D": "Today",
    "1W": "This Week",
    "1M": "May 2026",
    "1Y": "Year to Date",
  }[activeTimeframe];

  return (
    <View style={styles.container}>
      <BackHeader
        title="Portfolio history"
        paragraph="Track total balance movement over time."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.chartContainerCard}>
          <LineChart.Provider data={chartData}>
            {/* Live Interactive Header Price Text Box */}
            <View style={styles.priceHeaderContainer}>
              <LineChart.PriceText
                format={({ value }) => {
                  "worklet";
                  if (!value)
                    return `$${activeDataset.latestValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  return `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }}
                style={styles.livePriceText}
              />
              <Paragraph
                text={`Asset Valuation (${activeTimeframe})`}
                color={Colors.newSecondary}
                size={12}
              />
            </View>

            {/* Canvas Chart Area Row */}
            <View style={styles.chartDrawingSpace}>
              <LineChart width={SCREEN_WIDTH - 80} height={160}>
                <LineChart.Path color={Colors.green} width={2.5}>
                  <LineChart.Gradient color={`${Colors.green}15`} />
                </LineChart.Path>

                <LineChart.CursorCrosshair color={Colors.green}>
                  <LineChart.Tooltip textStyle={styles.tooltipText} />
                </LineChart.CursorCrosshair>
              </LineChart>
            </View>
          </LineChart.Provider>

          {/* Timeframe Filter Navigation Pills Row */}
          <View style={styles.timeframeRowBar}>
            {(["1D", "1W", "1M", "1Y"] as const).map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                onPress={() => setActiveTimeframe(timeframe)}
                style={[
                  styles.timeframePill,
                  activeTimeframe === timeframe && styles.activeTimeframePill,
                ]}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    activeTimeframe === timeframe && styles.activeTimeframeText,
                  ]}
                >
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dynamic Ledger Summary Item List */}
        <View style={styles.historyListGroup}>
          <View style={styles.logCard}>
            <View style={styles.leftMetaContainer}>
              <View
                style={[styles.avatarCircle, { backgroundColor: Colors.green }]}
              >
                <Text style={styles.avatarText}>P</Text>
              </View>
              <View style={styles.textStack}>
                <Title text={periodLabelText} size={15} textAlign="left" />
                <View style={{ marginTop: 2 }}>
                  <Paragraph
                    text="Closing portfolio balance"
                    color={Colors.newSecondary}
                    size={12}
                  />
                </View>
              </View>
            </View>

            <View style={styles.rightMetricsContainer}>
              <Title
                text={`$${activeDataset.latestValueUsd.toLocaleString()}`}
                size={15}
                textAlign="right"
              />
              <View style={{ marginTop: 2 }}>
                <Text style={styles.trendText}>+3.8%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40 },
  chartContainerCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 16,
    width: "100%",
    marginBottom: 28,
  },
  priceHeaderContainer: {
    alignItems: "flex-start",
    marginBottom: 12,
    paddingLeft: 4,
  },
  livePriceText: {
    color: Colors.newWhite,
    fontSize: 26,
    fontFamily: FontFamily.bold,
  },
  chartDrawingSpace: {
    height: 160,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipText: {
    color: Colors.newWhite,
    fontFamily: FontFamily.bold,
    fontSize: 13,
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 4,
  },
  timeframeRowBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 4,
  },
  timeframePill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  activeTimeframePill: { backgroundColor: "rgba(94, 213, 168, 0.12)" },
  timeframeText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  activeTimeframeText: { color: Colors.green, fontFamily: FontFamily.bold },
  historyListGroup: { width: "100%" },
  logCard: {
    backgroundColor: Colors.newDark,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leftMetaContainer: { flexDirection: "row", alignItems: "center" },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  textStack: { alignItems: "flex-start" },
  rightMetricsContainer: { alignItems: "flex-end" },
  trendText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.green,
  },
});
