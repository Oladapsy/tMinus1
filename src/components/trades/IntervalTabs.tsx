// src/components/trades/IntervalTabs.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ExpandIcon from "@/assets/icons/trade/addCircle.svg";

const INTERVALS = ["1m", "5m", "15m", "1d", "More"];

export default function IntervalTabs() {
  const [active, setActive] = useState("1m");

  return (
    <View style={styles.container}>
      {/* Time intervals */}
      <View style={styles.tabs}>
        {INTERVALS.map((interval) => (
          <TouchableOpacity
            key={interval}
            onPress={() => setActive(interval)}
            style={[styles.tab, active === interval && styles.activeTab]}
          >
            <Text style={[
              styles.tabText,
              active === interval && styles.activeTabText
            ]}>
              {interval}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Expand icon — top right of chart */}
      <TouchableOpacity>
        <ExpandIcon color={Colors.gray} width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  tabs: {
    flexDirection: "row",
    gap: 4,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: Colors.gray,
  },
  tabText: {
    color: Colors.lightGray,
    fontFamily: FontFamily.regular,
    fontSize: 13,
  },
  activeTabText: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
  },
});