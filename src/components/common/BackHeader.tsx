import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ArrowLeft from "@/assets/icons/main/backward.svg"; // Adjust path if needed
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface BackHeaderProps {
  title: string;
  onBack: () => void;
}

export default function BackHeader({ title, onBack }: BackHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <ArrowLeft color={Colors.newWhite} width={16} height={16} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      {/* Visual balance spacer */}
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  spacer: {
    width: 40,
  },
});