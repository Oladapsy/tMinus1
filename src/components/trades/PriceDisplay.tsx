// src/components/trades/PriceDisplay.tsx
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import SwapIcon from "@/assets/icons/trade/market.svg";

interface Props {
  price: string;
  change: string;
  pair: string;
}

export default function PriceDisplay({ price, change, pair }: Props) {
  const isPositive = change.startsWith("+");

  return (
    <View style={styles.container}>
      {/* Price + change */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>{price}</Text>
        <Text style={[
          styles.change,
          { color: isPositive ? Colors.green : Colors.red }
        ]}>
          {change}
        </Text>
      </View>

      {/* Pair */}
      <View style={styles.pairRow}>
        <SwapIcon color={Colors.gray} width={14} height={14} />
        <Text style={styles.pair}>{pair}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 28,
  },
  change: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  pairRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  pair: {
    color: Colors.gray,
    fontFamily: FontFamily.regular,
    fontSize: 13,
  },
});