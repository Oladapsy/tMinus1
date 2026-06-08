import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface PriceAlertRowProps {
  item: {
    id: string;
    title: string;
    subtitle: string;
    badgeText: "On" | "Off" | "Read";
  };
  onPress: () => void;
  onDeleteTrigger: () => void;
}

export default function PriceAlertRow({
  item,
  onPress,
  onDeleteTrigger,
}: PriceAlertRowProps) {
  // 1. Render the hidden swipe actions (The Trash Can background panel)
  const renderRightActions = (
    // progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable style={styles.deleteSwipeButton} onPress={onDeleteTrigger}>
        <Animated.Text
          style={[styles.deleteIconText, { transform: [{ scale }] }]}
        >
          🗑️
        </Animated.Text>
      </Pressable>
    );
  };

  // 2. Map color states cleanly based on badge selection parameters
  const isOn = item.badgeText === "On";
  const isOff = item.badgeText === "Off";

  const badgeStyle = isOn
    ? styles.badgeGreen
    : isOff
      ? styles.badgeRed
      : styles.badgeMuted;

  const dotStyle = isOn
    ? styles.dotGreen
    : isOff
      ? styles.dotRed
      : styles.dotMuted;

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
      friction={2}
    >
      <Pressable style={styles.rowContainer} onPress={onPress}>
        <View style={styles.leftContent}>
          {/* Status-colored icon dot indicator */}
          <View style={[styles.iconDot, dotStyle]} />

          <View style={styles.textColumn}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.subtitleText}>{item.subtitle}</Text>
          </View>
        </View>

        <View style={styles.badgeContainer}>
          <Text style={[styles.badgeText, badgeStyle]}>{item.badgeText}</Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
  },
  dotGreen: { backgroundColor: "rgba(0, 255, 128, 0.2)" },
  dotRed: { backgroundColor: "rgba(255, 77, 77, 0.2)" },
  dotMuted: { backgroundColor: "rgba(255, 255, 255, 0.1)" },

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
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  badgeGreen: { color: Colors.green },
  badgeRed: { color: "#FF4D4D" },
  badgeMuted: { color: Colors.newSecondary },

  // Swipe Action Background Tray Styling
  deleteSwipeButton: {
    backgroundColor: "#FF4D4D",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 16,
    marginLeft: 8,
  },
  deleteIconText: {
    color: Colors.newWhite,
    fontSize: 20,
  },
});
