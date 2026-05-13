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
}
export default function PrimaryButton({
  text,
  textColor = Colors.darkText,
  onPress,
  Bgcolor = Colors.green,
  fontSize = 18,
  alignText,
  icon,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: Bgcolor }]}
    >
      {icon}
      <Text
        style={[
          styles.text,
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontFamily: FontFamily.regular,
  },
});
