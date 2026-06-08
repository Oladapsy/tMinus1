import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface KycStepTabProps {
  label: string;
  isActive: boolean;
  isFilled: boolean;
  hasError: boolean;
  onPress: () => void;
}

export default function KycStepTab({
  label,
  isActive,
  isFilled,
  hasError,
  onPress,
}: KycStepTabProps) {
  return (
    <Pressable
      style={[
        styles.tabCard,
        isActive && styles.tabCardActive,
        hasError && !isFilled && styles.tabCardError, // Turns red if validation failed and it's empty
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.statusIndicator,
          isFilled && styles.statusIndicatorFilled,
          isActive && !isFilled && !hasError && styles.statusIndicatorActive,
          hasError && !isFilled && styles.statusIndicatorError, // Circular dot turns red too
        ]}
      />
      <Text
        style={[
          styles.tabLabel,
          isActive && styles.tabLabelActive,
          hasError && !isFilled && styles.tabLabelError,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabCard: {
    flex: 1,
    height: 112,
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    padding: 16,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "transparent",
  },
  tabCardActive: {
    backgroundColor: Colors.newGreen,
    borderColor: Colors.green,
  },
  tabCardError: {
    borderColor: Colors.newRed,
    backgroundColor: "rgba(239, 68, 68, 0.05)", // Soft background tint for errors
  },
  statusIndicator: {
    width: 34,
    height: 34,
    borderRadius: 16,
    backgroundColor: Colors.newGrey,
  },
  statusIndicatorActive: {
    backgroundColor: Colors.green,
  },
  statusIndicatorFilled: {
    backgroundColor: Colors.green,
  },
  statusIndicatorError: {
    backgroundColor: Colors.newRed,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.newSecondary,
  },
  tabLabelActive: {
    color: Colors.newWhite,
  },
  tabLabelError: {
    color: Colors.newRed,
  },
});
