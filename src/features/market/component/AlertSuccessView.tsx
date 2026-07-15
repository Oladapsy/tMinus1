import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface AlertSuccessViewProps {
  symbol: string;
  direction: "Above" | "Below";
  targetPrice: string;
  onClose: () => void;
}

export default function AlertSuccessView({
  symbol,
  direction,
  targetPrice,
  onClose,
}: AlertSuccessViewProps) {
  // 🧼 Handle numbers with proper localization support for small-cap fractions
  const cleanPriceStr = targetPrice.replace(/,/g, "");
  const formattedPrice = isNaN(Number(cleanPriceStr))
    ? targetPrice
    : Number(cleanPriceStr).toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });

  const upperSymbol = symbol.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Alert created</Text>
        <Text style={styles.paragraph}>
          We will notify you when the target is reached.
        </Text>

        {/* Accurate Checkmark Badge Circle Vector */}
        <View style={styles.iconContainer}>
          <Svg width="110" height="110" viewBox="0 0 110 110">
            <Circle cx="55" cy="55" r="48" fill="rgba(0, 255, 163, 0.08)" />
            <Circle cx="55" cy="55" r="36" fill="rgba(0, 255, 163, 0.15)" />
            <Circle cx="55" cy="55" r="26" fill={Colors.green} />
            <Path
              d="M48 55 L53 60 L63 49"
              fill="none"
              stroke={Colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <Text style={styles.summaryTitle}>
          {upperSymbol} {direction.toLowerCase()} ${formattedPrice}
        </Text>
        <Text style={styles.summaryDescription}>
          This alert appears in Profile → Price Alerts and can be edited or
          deleted.
        </Text>

        {/* Data Breakdown Table Block */}
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Asset</Text>
          <Text style={styles.tableValue}>{upperSymbol}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Direction</Text>
          <Text style={styles.tableValue}>{direction}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Target</Text>
          <Text style={styles.tableValue}>${formattedPrice}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={onClose}>
        <Text style={styles.actionButtonText}>View alerts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  mainContent: { marginTop: 40, alignItems: "center" },
  title: {
    color: Colors.newWhite,
    fontSize: 26,
    fontFamily: FontFamily.bold,
    textAlign: "center",
  },
  paragraph: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginTop: 6,
    textAlign: "center",
  },
  iconContainer: { marginVertical: 40 },
  summaryTitle: {
    color: Colors.newWhite,
    fontSize: 22,
    fontFamily: FontFamily.bold,
    textAlign: "center",
  },
  summaryDescription: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 10,
  },
  tableLabel: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  tableValue: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  actionButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
});
