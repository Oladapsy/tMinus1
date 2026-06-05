import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface KycReviewRowProps {
  label: string;
  value: string;
}

export default function KycReviewRow({ label, value }: KycReviewRowProps) {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "100%",
  },
  label: {
    color: Colors.newSecondary,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  value: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
});