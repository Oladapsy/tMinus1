import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import MarketMiniSparkline from "./MarketMiniSparkline";
import { MarketAsset } from "@/src/types/market";

interface MarketAssetRowProps {
  coin: MarketAsset;
  onPress: (symbol: string) => void;
}

export default function MarketAssetRow({ coin, onPress }: MarketAssetRowProps) {
  const isPositive = coin.change24h >= 0;

  const fallbackInitial = coin.symbol
    ? coin.symbol.slice(0, 1).toUpperCase()
    : "";
  const avatarColors: Record<string, string> = {
    BTC: "#E28A16",
    ETH: "#29B8C7",
    SOL: "#5CD6A5",
  };

  return (
    <TouchableOpacity
      style={styles.assetRow}
      onPress={() => onPress(coin.symbol)}
    >
      <View style={styles.leftMeta}>
        <View
          style={[
            styles.avatarBadge,
            {
              backgroundColor:
                avatarColors[coin.symbol] || "rgba(255,255,255,0.08)",
            },
          ]}
        >
          <Text style={styles.avatarText}>{fallbackInitial}</Text>
        </View>
        <View>
          <Text style={styles.coinTitle}>{coin.name}</Text>
          <Text style={styles.coinSub}>{coin.symbol}</Text>
        </View>
      </View>

      {/* Dynamic inline sparkline graph block */}
      <View style={styles.sparklineSpace}>
        {coin.sparkline && coin.sparkline.length > 0 ? (
          <MarketMiniSparkline
            points={coin.sparkline}
            isPositive={isPositive}
          />
        ) : (
          <View
            style={[
              styles.fallbackTrendLine,
              { borderColor: isPositive ? Colors.green : Colors.newRed },
            ]}
          />
        )}
      </View>

      <View style={styles.rightMeta}>
        <Text style={styles.priceValue}>
          $
          {coin.priceUsd.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <Text
          style={[
            styles.changeValue,
            { color: isPositive ? Colors.green : Colors.newRed },
          ]}
        >
          {isPositive ? "+" : ""}
          {coin.change24h.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  assetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftMeta: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1.5 },
  avatarBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  coinTitle: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  coinSub: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
    marginTop: 2,
  },
  sparklineSpace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  fallbackTrendLine: {
    borderBottomWidth: 1.5,
    width: "60%",
    transform: [{ rotate: "-4deg" }],
  },
  rightMeta: { alignItems: "flex-end", flex: 1.2 },
  priceValue: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  changeValue: { fontSize: 12, fontFamily: FontFamily.bold, marginTop: 2 },
});
