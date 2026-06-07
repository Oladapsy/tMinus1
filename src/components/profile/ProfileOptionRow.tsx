import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface ProfileOptionRowProps {
  title: string;
  subtitle: string;
  badgeText?: string | number; // This can now take numbers OR strings like "Set", "On", "View"
  onPress?: () => void;
}

export default function ProfileOptionRow({
  title,
  subtitle,
  badgeText,
  onPress,
}: ProfileOptionRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        {/* Mock Green Icon Dot Indicator */}
        <View style={styles.iconDot} />
        <View style={styles.textColumn}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>

      {/* Tweak 2: Dynamic condition to display text OR numbers */}
      {badgeText !== undefined && badgeText !== null && badgeText !== "" ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  pressed: {
    opacity: 0.8,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.green,
  },
  textColumn: {
    flexDirection: "column",
    gap: 3,
  },
  titleText: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  subtitleText: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
  },
  badgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
});
