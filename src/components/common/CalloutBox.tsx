import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";

interface CalloutBoxProps {
  title: string;
  paragraph: string;
  backgroundColor?: ColorValue;
  titleColor?: ColorValue;
  paragraphColor?: ColorValue;
  titleSize?: number;
  paragraphSize?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

export default function CalloutBox({
  title,
  paragraph,
  backgroundColor = Colors.newYellowSlim,
  titleColor = Colors.newWhite,
  paragraphColor = Colors.newYellowWarning,
  titleSize = 13,
  paragraphSize = 12,
  paddingTop,
  paddingBottom,
}: CalloutBoxProps) {
  return (
    <View style={[styles.box, { backgroundColor, paddingTop, paddingBottom }]}>
      <Text style={[styles.title, { color: titleColor, fontSize: titleSize }]}>
        {title}
      </Text>
      <View style={styles.descMargin}>
        <Paragraph
          text={paragraph}
          color={paragraphColor.toString()}
          size={paragraphSize}
          lineHeight={paragraphSize * 1.5}
          textAlign="left"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
  },
  title: {
    fontFamily: FontFamily.bold,
    marginBottom: 6,
  },
  descMargin: {
    width: "100%",
  },
});
