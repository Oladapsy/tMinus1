// src/components/trades/OrderBook.tsx
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

const TABS = ["Open Order (2)", "Order Books", "Market Trades"];

// dummy data — replace with real API data later
const ORDER_DATA = Array(10).fill({
  bid: "27,486.39",
  ask: "2485.27",
  askRight: "27,486.39",
  askRightRed: "2485.27",
});

export default function OrderBook() {
  const [active, setActive] = useState("Order Books");

  return (
    <View style={styles.container}>
      {/* Tab row */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActive(tab)}
            style={[styles.tab, active === tab && styles.activeTab]}
          >
            <Text style={[
              styles.tabText,
              active === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Column headers */}
      <View style={styles.colHeaders}>
        <Text style={styles.colHeader}>Bid</Text>
        <Text style={styles.colHeader}>Ask</Text>
        <Text style={styles.colHeader}>  </Text>
        <Text style={styles.colHeader}>Ask</Text>
      </View>

      {/* Rows */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {ORDER_DATA.map((row, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.bidText}>{row.bid}</Text>
            <Text style={styles.greenText}>{row.ask}</Text>
            <Text style={styles.bidText}>{row.askRight}</Text>
            <Text style={styles.redText}>{row.askRightRed}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  tabs: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
    paddingBottom: 12,
  },
  tab: {
    paddingBottom: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
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
  colHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  colHeader: {
    color: Colors.lightGray,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  bidText: {
    color: Colors.primary,        // dark text
    fontFamily: FontFamily.regular,
    fontSize: 13,
    flex: 1,
  },
  greenText: {
    color: Colors.green,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    flex: 1,
  },
  redText: {
    color: Colors.red,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    flex: 1,
    textAlign: "right",
  },
});