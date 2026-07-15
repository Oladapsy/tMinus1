import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface WalletAssetRowProps {
  name: string;
  symbol: string;
  network?: string;
  balanceString: string;
  valueString: string; 
  dotColor: string; 
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
        <View style={[styles.avatarCircle, { backgroundColor: dotColor }]}>
          <Text style={styles.avatarInitial}>{symbol.charAt(0)}</Text>
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
    backgroundColor: Colors.newDark,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 16,
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    color: Colors.newBlack,
  },
  nameMetadata: {
    flexDirection: "column",
    gap: 5,
  },
  assetTitle: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  assetSubtitle: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 2,
  },
  fiatValueText: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  balanceText: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
  },
});
