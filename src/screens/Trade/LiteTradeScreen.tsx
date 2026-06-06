import { StyleSheet, View } from "react-native";
import React from "react";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import TradeTabs from "@/src/components/trades/TradeTabs";

export default function LiteTradeScreen() {
  return (
    <View>
      <HeadIcons />
      <TradeTabs />
    </View>
  );
}

const styles = StyleSheet.create({});
