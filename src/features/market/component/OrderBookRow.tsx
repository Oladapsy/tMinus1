import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export interface OrderLevel {
  priceUsd: number;
  amount: number;
  total: number;
}

interface OrderBookRowProps {
  bid?: OrderLevel;
  ask?: OrderLevel;
}

export default function OrderBookRow({ bid, ask }: OrderBookRowProps) {
  return (
    <View style={styles.rowWrapper}>
      {/* LEFT SIDE: Bids (Green Price + Amount) */}
      <View style={styles.sideBlock}>
        {bid ? (
          <>
            <Text style={[styles.priceText, { color: Colors.green }]}>
              {bid.priceUsd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.amountText}>{bid.amount.toFixed(4)}</Text>
          </>
        ) : null}
      </View>

      {/* RIGHT SIDE: Asks (Red Price + Amount) */}
      <View style={styles.sideBlock}>
        {ask ? (
          <>
            <Text style={[styles.priceText, { color: Colors.newRed }]}>
              {ask.priceUsd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.amountText}>{ask.amount.toFixed(4)}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  sideBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  priceText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  amountText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
});
