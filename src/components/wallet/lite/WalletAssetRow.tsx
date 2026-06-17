import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface WalletAssetRowProps {
  name: string;
  symbol: string;
  network?: string;
  balanceString: string; // e.g. "1,000 USDT" or "0.0200 BTC"
  valueString: string;   // e.g. "$2,450.00"
  dotColor: string;      // Color circle placeholder from constants
  onPress?: () => void;
  disabled?: boolean;
}

export default function WalletAssetRow({
  name,
  symbol,
  network,
  balanceString,
  valueString,
  dotColor,
  onPress,
  disabled = false,
}: WalletAssetRowProps) {
  return (
    <TouchableOpacity
      disabled={disabled || !onPress}
      onPress={onPress}
      style={styles.rowContainer}
      activeOpacity={0.7}
    >
      {/* Left side info block: Circle identifier and names */}
      <View style={styles.leftSection}>
        <View style={[styles.avatarCircle, { backgroundColor: `${dotColor}20` }]}>
          <Text style={[styles.avatarInitial, { color: dotColor }]}>
            {symbol.charAt(0)}
          </Text>
        </View>
        <View style={styles.nameMetadata}>
          <Text style={styles.assetTitle}>{name}</Text>
          <Text style={styles.assetSubtitle}>
            {symbol} {network ? `• ${network}` : ""}
          </Text>
        </View>
      </View>

      {/* Right side info block: Balances and calculated fiat values */}
      <View style={styles.rightSection}>
        <Text style={styles.fiatValueText}>{valueString}</Text>
        <Text style={styles.balanceText}>{balanceString}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.thinWhite, // Clean slate overlay fill matching spec sheets
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  nameMetadata: {
    flexDirection: "column",
    gap: 2,
  },
  assetTitle: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  assetSubtitle: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 2,
  },
  fiatValueText: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  balanceText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
});