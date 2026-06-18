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
    <View style={styles.cardContainer}>
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
  cardContainer: {
    backgroundColor: Colors.newDark,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 16,
  },
  titleWrapper: {
    marginBottom: 5,
    alignItems: "flex-start",
  },
});