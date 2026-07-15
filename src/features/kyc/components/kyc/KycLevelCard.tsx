import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface KycLevelCardProps {
  levelText: string;
  title: string;
  description: string;
}

export default function KycLevelCard({
  levelText,
  title,
  description,
}: KycLevelCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Dynamic level background circle badge */}
      <View style={styles.badgeCircle}>
        <Text style={styles.badgeText}>{levelText}</Text>
      </View>

      <Title
        text={title}
        color={Colors.newWhite}
        size={22}
        fontFamily={FontFamily.bold}
      />

      <View style={styles.descWrapper}>
        <Paragraph
          text={description}
          textAlign="center"
          color={Colors.newSecondary}
          size={13}
          lineHeight={18}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.newDark,
    borderRadius: 18,
    // height: 168,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 26,
  },
  badgeCircle: {
    backgroundColor: Colors.newGreen,
    width: 92,
    height: 92,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: Colors.green,
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
  descWrapper: {
    marginTop: 8,
    maxWidth: 240,
  },
});
