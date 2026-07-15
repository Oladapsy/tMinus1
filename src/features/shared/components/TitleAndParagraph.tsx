import React from "react";
import { View } from "react-native";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  title: string;
  titleSize?: number;
  paragraphSize?: number;
  paragraph?: string;
}
export default function TitleAndParagraph({
  title,
  paragraph,
  paragraphSize,
  titleSize,
}: Props) {
  return (
    <View>
      <View style={{ marginBottom: 2 }}>
        <Title
          text={title}
          color={Colors.newWhite}
          size={titleSize || 24}
          fontFamily={FontFamily.bold}
        />
      </View>
      {paragraph && (
        <Paragraph
          text={paragraph}
          color={Colors.newSecondary}
          size={paragraphSize || 12}
          textAlign="left"
          fontFamily={FontFamily.regular}
          lineHeight={16}
        />
      )}
    </View>
  );
}
