import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface PrimaryButtonProps {
  text: string;
  textColor?: string;
  onPress?: () => void;
  Bgcolor?: string;
  fontSize?: number;
  alignText?: "left" | "center" | "right";
  icon?: React.ReactNode;
  borderColor?: string;
  fullWidth?: boolean;
  style?: object;
  disabled?: boolean;
}

export default function PrimaryButton({
  text,
  textColor = Colors.darkText,
  onPress,
  Bgcolor = Colors.green,
  fontSize = 18,
  alignText,
  icon,
  borderColor,
  fullWidth = true,
  style,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        style,
        {
          backgroundColor: Bgcolor,
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor,
          width: fullWidth ? "100%" : undefined,
        },
        disabled && styles.disabledStyle,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          style,
          { color: textColor, fontSize, textAlign: alignText },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontFamily: FontFamily.regular,
  },
  disabledStyle: {
    opacity: 0.4,
  },
});
