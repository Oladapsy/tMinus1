import ArrowBack from "@/assets/icons/main/backward.svg";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon?: ReactNode;
  title?: string;
  titleColor?: string;
  onClickIcon?: () => void;
}
const NavigateIconText = ({
  icon = <ArrowBack color={Colors.secondary}/>,
  title,
  titleColor = Colors.lightGray,
  onClickIcon,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClickIcon}>
      <View>
        {icon}
      </View>
      <Text style={[styles.text, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  text: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
  },
});
export default NavigateIconText;
