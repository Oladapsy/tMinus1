import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import TradeActionCard from "./TradeActionCard";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface TradeDashboardViewProps {
  onSelectAction: (mode: "Buy" | "Sell" | "Swap") => void;
}

export default function TradeDashboardView({
  onSelectAction,
}: TradeDashboardViewProps) {
  const [activeRange, setActiveRange] = useState<"1H" | "1D" | "1W">("1D");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.header}>
        <TitleAndParagraph
          title="Trade"
          paragraph="Buy, sell, or swap with quotes that expire before execution."
        />
      </View>

      {/* Market Spot Card */}
      <View style={styles.spotCard}>
        <View style={styles.tickerRow}>
          <Title text="BTC / USDT" textAlign="left" size={14} />
          <Paragraph text="+2.1%" color={Colors.green} textAlign="right" />
        </View>
        <Title text="64,200.50" size={26} fontFamily={FontFamily.bold}/>

        {/* Figure out this part and refactor */}
        <View style={styles.mockChartSpace}>
          <View style={styles.mockChartBarRow}>
            {[40, 60, 45, 75, 50, 90, 65, 85, 55, 70, 95, 60].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.mockBar,
                  {
                    height: h,
                    backgroundColor: i % 3 === 0 ? Colors.newRed : Colors.green,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Figure out this part and refactor */}
        <View style={styles.rangeRow}>
          {(["1H", "1D", "1W"] as const).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setActiveRange(r)}
              style={[
                styles.rangePill,
                activeRange === r && styles.activeRangePill,
              ]}
            >
              <Text
                style={[
                  styles.rangeText,
                  activeRange === r && { color: Colors.green },
                ]}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Selection Items */}
      <View style={styles.actionContainer}>
        <TradeActionCard
          actionText="Buy crypto"
          description="Pay USDT and receive BTC"
          action="Buy"
          actionColor={Colors.green}
          onPress={() => onSelectAction("Buy")}
        />

        <TradeActionCard
          actionText="Sell crypto"
          cricleColor={Colors.red}
          description="Sell BTC back into USDT"
          action="Sell"
          actionColor={Colors.red}
          onPress={() => onSelectAction("Sell")}
        />

        <TradeActionCard
          actionText="Swap assets"
          description="Convert between supported coins"
          action="Sell"
          actionColor={Colors.green}
          onPress={() => onSelectAction("Swap")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 10,
    marginBottom: 24,
  },
  spotCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  tickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mockChartSpace: {
    height: 100,
    justifyContent: "flex-end",
    marginVertical: 16,
  },
  mockChartBarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  mockBar: { width: (SCREEN_WIDTH - 100) / 12, borderRadius: 4 },
  rangeRow: { flexDirection: "row", gap: 8 },
  rangePill: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 8 },
  activeRangePill: { backgroundColor: "rgba(94, 213, 168, 0.1)" },
  rangeText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  actionContainer: { gap: 12 },
});
