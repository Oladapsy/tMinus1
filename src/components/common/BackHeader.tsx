import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ArrowLeft from "@/assets/icons/main/backward.svg"; 
import { Colors } from "@/src/constants/colors";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";

interface BackHeaderProps {
  title: string;
  paragraph?: string; // 🌟 Optional subtitle parameter
  onBack: () => void;
}

export default function BackHeader({ title, paragraph, onBack }: BackHeaderProps) {
  return (
    <View style={styles.container}>
      {/* 1. Structural Back Navigation Row Arrow */}
      <View style={styles.navigationRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <ArrowLeft color={Colors.newWhite} width={16} height={16} />
        </TouchableOpacity>
      </View>

      {/* 2. Descriptive Contextual Title Block using your component directly */}
      <View style={styles.titleBlock}>
        <TitleAndParagraph
          title={title}
          paragraph={paragraph}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24, // Clean separation from whatever lists or cards follow below it
  },
  navigationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBlock: {
    marginTop: 12,
  },
});