import { View, Text } from "react-native";
import React from "react";
import { FontFamily } from "@/src/constants/fonts";

interface TitleProps {
  text: string;
  color?: string;
  size?: number;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
}

export default function Title({
  text,
  color = "white",
  size = 24,
  fontFamily = FontFamily.medium,
  textAlign,
  lineHeight,
}: TitleProps) {
  return (
    <View>
      <Text
        style={[{ color, fontSize: size, fontFamily, textAlign, lineHeight }]}
      >
        {text}
      </Text>
    </View>
  );
}
