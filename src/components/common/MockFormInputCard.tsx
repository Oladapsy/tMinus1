import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface MockFormInputCardProps {
  label: string;
  value: string;
  rightContent?: React.ReactNode;
}

export default function MockFormInputCard({
  label,
  value,
  rightContent,
}: MockFormInputCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {rightContent && (
        <View style={styles.rightContainer}>{rightContent}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.newDark,
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContent: {
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  value: {
    color: Colors.newWhite,
    fontSize: 24,
    fontFamily: FontFamily.bold,
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
