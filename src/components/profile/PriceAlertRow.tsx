import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";

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
  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable style={styles.deleteSwipeButton} onPress={onDeleteTrigger}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={22} color={Colors.newWhite} />
        </Animated.View>
      </Pressable>
    );
  };

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
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  dotGreen: { backgroundColor: Colors.green },
  dotRed: { backgroundColor: Colors.newRed },
  dotMuted: { backgroundColor: Colors.newSecondary },
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
  badgeRed: { color: Colors.newRed },
  badgeMuted: { color: Colors.newSecondary },
  deleteSwipeButton: {
    backgroundColor: Colors.newRed,
    justifyContent: "center",
    alignItems: "center",
    width: 74,
    height: "100%",
    borderRadius: 16,
    marginLeft: 10,
  },
});
