import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "../common/Paragraph";

interface KycTierCardProps {
  tierNumber: string;
  title: string;
  description: string;
  isActive: boolean;
  pillText?: string; // Optional: only shows up if passed
}

export default function KycTierCard({
  tierNumber,
  title,
  description,
  isActive,
  pillText,
}: KycTierCardProps) {
  return (
    <View
      style={[
        styles.card,
        isActive ? styles.cardActive : styles.cardInactive,
        !isActive && { alignItems: "center" },
      ]}
    >
      {/* Left Column Status Circle */}
      <View style={isActive ? styles.circleActive : styles.circleInactive}>
        <Text
          style={[
            styles.circleText,
            isActive ? styles.textBlack : styles.textSecondary,
          ]}
        >
          {tierNumber}
        </Text>
      </View>

      {/* Right Column Content */}
      <View style={styles.textColumn}>
        <Text
          style={[
            styles.titleText,
            isActive ? styles.textWhite : styles.textSecondary,
          ]}
        >
          {title}
        </Text>

        <Paragraph
          text={description}
          textAlign="left"
          color={isActive ? Colors.newWhite : Colors.newSecondary}
          size={11}
          lineHeight={16}
        />

        {/* Dynamic Target Limits Highlight Pill */}
        {isActive && pillText && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{pillText}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    flexDirection: "row",
    padding: 16,
    marginBottom: 24,
    alignItems: "flex-start",
    gap: 13,
  },
  cardActive: {
    borderWidth: 1.5,
    borderColor: Colors.green,
    backgroundColor: Colors.newGreen,
  },
  cardInactive: {
    backgroundColor: Colors.newDark,
    height: 88,
  },
  circleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  circleInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.newGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  textColumn: {
    flex: 1,
  },
  titleText: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    marginBottom: 4,
    color: Colors.newWhite,
  },
  textBlack: { color: Colors.newBlack },
  textWhite: { color: Colors.newWhite },
  textSecondary: { color: Colors.newSecondary },
  pill: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 12,
  },
  pillText: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
    fontSize: 10,
  },
});
