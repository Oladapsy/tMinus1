import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface ParagraphProps {
  text: string;
  color?: string;
  size?: number;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  fontFamily?: string;
}

export default function Paragraph({
  text,
  color = Colors.secondary,
  size = 16,
  textAlign = "center",
  lineHeight = 24,
  fontFamily = FontFamily.medium,
}: ParagraphProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color, fontSize: size, textAlign, lineHeight, fontFamily }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  text: {
    // fontFamily: FontFamily.medium,
  },
});
