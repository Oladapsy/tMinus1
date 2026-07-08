import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";

type Props = {
  label: string;
  value: string;
  valueColor?: string;
};

export default function QuoteSummaryRow({ label, value, valueColor }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.favBorder,
  },
  label: { fontSize: 14, color: Colors.newSecondary },
  value: { fontSize: 14, fontWeight: "600", color: Colors.newWhite },
});