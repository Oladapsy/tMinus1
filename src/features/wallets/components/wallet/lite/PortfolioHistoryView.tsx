import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { PortfolioHistoryResponse } from "@/src/features/wallets/utils/types/wallet";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type TimeframeRange = "1D" | "1W" | "1M" | "1Y";

interface PortfolioHistoryViewProps {
  onGoBack: () => void;
  apiPayload: PortfolioHistoryResponse | undefined; // Allow undefined safely during initial load states
  activeTimeframe: TimeframeRange; // 🟢 FIX: Passed directly from state to keep pills instantly responsive
  onRangeChange: (range: TimeframeRange) => void;
  isLoading?: boolean;
}

export default function PortfolioHistoryView({
  onGoBack,
  apiPayload,
  activeTimeframe, // 🟢 Destructure it
  onRangeChange,
  isLoading = false,
}: PortfolioHistoryViewProps) {
  // Safe extraction fallbacks
  const latestValueUsd = apiPayload?.meta?.latestValueUsd || 0;

  // 📈 Convert incoming data array points to target coordinates expected by wagmi-charts
  const chartData = useMemo(() => {
    if (!apiPayload?.data || apiPayload.data.length === 0) {
      return [{ timestamp: Date.now(), value: 0 }];
    }
    return apiPayload.data.map((point: { time: string; valueUsd: number }) => ({
      timestamp: new Date(point.time).getTime(),
      value: point.valueUsd,
    }));
  }, [apiPayload]);

  const periodLabelText =
    (
      {
        "1D": "Today",
        "1W": "This Week",
        "1M": "This Month",
        "1Y": "Year to Date",
      } as Record<string, string>
    )[activeTimeframe] || "History";

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
            <View style={styles.priceHeaderContainer}>
              <LineChart.PriceText
                format={({ value }) => {
                  "worklet";
                  if (!value) {
                    return `$${latestValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
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

            <View style={styles.chartDrawingSpace}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.green} />
              ) : (
                <LineChart width={SCREEN_WIDTH - 80} height={160}>
                  <LineChart.Path color={Colors.green} width={2.5}>
                    <LineChart.Gradient color={`${Colors.green}15`} />
                  </LineChart.Path>

                  <LineChart.CursorCrosshair color={Colors.green}>
                    <LineChart.Tooltip textStyle={styles.tooltipText} />
                  </LineChart.CursorCrosshair>
                </LineChart>
              )}
            </View>
          </LineChart.Provider>

          {/* Timeframe pill selection header matrix */}
          <View style={styles.timeframeRowBar}>
            {(["1D", "1W", "1M", "1Y"] as const).map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                onPress={() => onRangeChange(timeframe)}
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

        {/* Aggregated Closing Values Section */}
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
                text={`$${latestValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                size={15}
                textAlign="right"
              />
              <View style={{ marginTop: 2 }}>
                <Text style={styles.trendText}>Market Live</Text>
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
