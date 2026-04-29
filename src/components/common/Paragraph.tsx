import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface ParagraphProps {
  text: string;
  color?: string;
  size?: number;
}

export default function Paragraph({
  text,
  color = Colors.secondary,
  size = 16,
}: ParagraphProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color, fontSize: size }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: "center",
    fontFamily: FontFamily.medium,
    lineHeight: 24,
  },
});
