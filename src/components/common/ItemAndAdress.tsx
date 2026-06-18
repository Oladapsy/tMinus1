import React from "react";
import { View, StyleSheet } from "react-native";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  title: string;
  address: string;
  titleSize?: number;
  addressSize?: number;
}

export default function ItemAndAddress({
  title,
  address,
  titleSize = 10,
  addressSize = 15,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Paragraph
          text={title}
          color={Colors.newSecondary}
          size={titleSize}
          fontFamily={FontFamily.regular}
          lineHeight={15}
        />
      </View>

      <Title
        text={address}
        color={Colors.newWhite}
        size={addressSize}
        textAlign="left"
        fontFamily={FontFamily.bold}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start", // 🌟 Forces all children to align perfectly left
    justifyContent: "center",
  },
  titleWrapper: {
    marginBottom: 6,
    alignItems: "flex-start",
  },
});