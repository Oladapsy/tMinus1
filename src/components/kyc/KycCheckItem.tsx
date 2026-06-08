import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface KycCheckItemProps {
  label: string;
}

export default function KycCheckItem({ label }: KycCheckItemProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={16} color={Colors.newBlack} />
      </View>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "100%",
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  labelText: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
});
