import { StyleSheet, View } from "react-native";
import React from "react";
import Warning from "@/assets/icons/profile/kyc/esclaim.svg";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";

interface Props {
  text: string;
  showIcon: boolean;
}

export default function KycNoteCard({ text, showIcon }: Props) {
  return (
    <View style={styles.conatiner}>
      <View style={showIcon && styles.icon}>{showIcon && <Warning />}</View>
      <View style={styles.text}>
        <Paragraph
          text={text}
          size={12}
          color={Colors.newSecondary}
          lineHeight={16}
          textAlign="left"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
  },
  icon: {
    backgroundColor: Colors.newYellow,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  text: {
    maxWidth: 250,
  },
});
