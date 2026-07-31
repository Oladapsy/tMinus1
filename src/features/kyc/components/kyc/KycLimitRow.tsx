import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "@/src/features/shared/components/Paragraph";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface KycLimitRowProps {
  label: string;
  value: string;
  isLocked?: boolean;
}

export default function KycLimitRow({
  label,
  value,
  isLocked = false,
}: KycLimitRowProps) {
  return (
    <View style={styles.rowBox}>
      <Paragraph
        text={label}
        color={Colors.newSecondary}
        size={12}
        fontFamily={FontFamily.regular}
      />
      <Text
        style={[
          styles.valueStyle,
          isLocked ? styles.textLocked : styles.textUnlocked,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    height: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  valueStyle: {
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  textLocked: {
    color: Colors.newRed,
  },
  textUnlocked: {
    color: Colors.newWhite || "white",
  },
});
