import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface HistoryRecordItem {
  id: string;
  periodLabel: string;
  subText: string;
  valueMetric: string;
  changeTrend: string;
  isPositive: boolean;
  avatarChar: string;
}

interface PortfolioHistoryViewProps {
  onGoBack: () => void;
}

export default function PortfolioHistoryView({
  onGoBack,
}: PortfolioHistoryViewProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<
    "1D" | "1W" | "1M" | "1Y"
  >("1M");

  const historyLogs: HistoryRecordItem[] = [
    {
      id: "h1",
      periodLabel: "May 2026",
      subText: "Portfolio value",
      valueMetric: "$4,892.40",
      changeTrend: "+3.8%",
      isPositive: true,
      avatarChar: "P",
    },
    {
      id: "h2",
      periodLabel: "April 2026",
      subText: "Portfolio value",
      valueMetric: "$4,713.20",
      changeTrend: "+1.2%",
      isPositive: true,
      avatarChar: "P",
    },
    {
      id: "h3",
      periodLabel: "March 2026",
      subText: "Portfolio value",
      valueMetric: "$4,421.00",
      changeTrend: "-0.8%",
      isPositive: false,
      avatarChar: "P",
    },
  ];

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
        {/* Mock Chart Area Box Frame */}
        <View style={styles.chartContainerCard}>
          <View style={styles.mockChartDrawingSpace}>
            {/* Inner lines mapping a simplified geometric line representation matching your mock */}
            <View style={styles.chartLineMockPath} />
          </View>

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

        {/* Historical Breakdown List Segment */}
        <View style={styles.historyListGroup}>
          {historyLogs.map((item) => (
            <View key={item.id} style={styles.logCard}>
              <View style={styles.leftMetaContainer}>
                <View
                  style={[
                    styles.avatarCircle,
                    {
                      backgroundColor: item.isPositive
                        ? Colors.green
                        : Colors.newRed,
                    },
                  ]}
                >
                  <Text style={styles.avatarText}>{item.avatarChar}</Text>
                </View>
                <View style={styles.textStack}>
                  <Title text={item.periodLabel} size={15} textAlign="left" />
                  <View style={{ marginTop: 2 }}>
                    <Paragraph
                      text={item.subText}
                      color={Colors.newSecondary}
                      size={12}
                      textAlign="left"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.rightMetricsContainer}>
                <Title text={item.valueMetric} size={15} textAlign="right" />
                <View style={{ marginTop: 2 }}>
                  <Text
                    style={[
                      styles.trendText,
                      {
                        color: item.isPositive
                          ? Colors.green
                          : Colors.newRed,
                      },
                    ]}
                  >
                    {item.changeTrend}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  chartContainerCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 16,
    width: "100%",
    marginBottom: 28,
  },
  mockChartDrawingSpace: {
    height: 160,
    width: "100%",
    justifyContent: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  chartLineMockPath: {
    height: 2,
    backgroundColor: Colors.green,
    width: "100%",
    opacity: 0.8,
    // Note: ill replace this view with react-native-wagmi-charts
    // or react-native-gifted-charts for live interactive line plotting arrays.
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
  activeTimeframePill: {
    backgroundColor: "rgba(94, 213, 168, 0.12)",
  },
  timeframeText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  activeTimeframeText: {
    color: Colors.green,
    fontFamily: FontFamily.bold,
  },
  historyListGroup: {
    width: "100%",
  },
  logCard: {
    backgroundColor: Colors.newDark,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leftMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  textStack: {
    alignItems: "flex-start",
  },
  rightMetricsContainer: {
    alignItems: "flex-end",
  },
  trendText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
});
