import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import ArrowRight from "@/assets/icons/main/foward.svg";
import { Colors } from "@/src/constants/colors";
import Paragraph from "./Paragraph";
import BackgroundIcon from "@/assets/icons/home/ActionImageBg.svg";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
}

export default function ActionCard({
  icon,
  title,
  description,
  onPress,
}: ActionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconText}>
        <View>
          <BackgroundIcon />
          <View style={styles.frontSvg}>{icon}</View>
        </View>

        <View style={styles.text}>
          <Paragraph
            text={title}
            size={16}
            color={Colors.primary}
            textAlign="left"
          />
          <Paragraph
            text={description}
            size={14}
            color={Colors.lightGray}
            textAlign="left"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.actionArrow} onPress={onPress}>
        <ArrowRight color={Colors.secondary} width={11} height={9.43} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.tabLight2,
    height: 76,
    borderRadius: 16,
  },
  iconText: {
    flexDirection: "row",
    gap: 15,
    alignItems: "flex-start",
  },
  frontSvg: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flexDirection: "column",
  },
  actionArrow: {
    backgroundColor: Colors.tabLight,
    width: 40,
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
