import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface PortfolioValueCardProps {
  totalValueString: string; // e.g., "$4,892.40"
  percentageChangeString: string; // e.g., "+3.8% today"
  onPress?: () => void;
}

export default function PortfolioValueCard({
  totalValueString,
  percentageChangeString,
  onPress,
}: PortfolioValueCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      <Text style={styles.label}>Total portfolio value</Text>
      <Text style={styles.amount}>{totalValueString}</Text>
      <Text style={styles.trendIndicator}>{percentageChangeString}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    paddingVertical: 30,
    alignItems: "flex-start",
    backgroundColor: Colors.walletCard,
    paddingHorizontal: 22,
    borderRadius: 22,
  },
  label: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginBottom: 4,
  },
  amount: {
    color: Colors.newWhite,
    fontSize: 32,
    fontFamily: FontFamily.bold,
    letterSpacing: -0.5,
  },
  trendIndicator: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginTop: 4,
  },
});
