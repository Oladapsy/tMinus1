import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import Title from "../../common/Title";
import Paragraph from "../../common/Paragraph";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  actionText: string;
  cricleColor?: string;
  description: string;
  action: string;
  actionColor?: string;
  onPress: () => void;
}

const TradeActionCard = ({
  actionText,
  cricleColor = Colors.green,
  description,
  action,
  actionColor,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.circle, { backgroundColor: cricleColor }]}></View>
        <View>
          <Title text={actionText} size={16} />
          <Paragraph text={description} size={12} />
        </View>
      </View>
      <Title
        text={action}
        color={actionColor}
        size={14}
        fontFamily={FontFamily.bold}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.newDark,
    padding: 17,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    height: 43,
    width: 43,
    borderRadius: 22,
  },
  left: {
    flexDirection: "row",
    gap: 11,
  },
});

export default TradeActionCard;
