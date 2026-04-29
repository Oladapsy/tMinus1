import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontFamily } from "@/src/constants/fonts";

interface TitleProps {
  text: string;
  color?: string;
  size?: number;
}

export default function Title({ text, color="white", size=24 }: TitleProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color, fontSize: size }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: FontFamily.medium,
  },
});
