import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ArrowLeft from "@/assets/icons/main/backward.svg"; 
import { Colors } from "@/src/constants/colors";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";

interface BackHeaderProps {
  title: string;
  paragraph?: string; 
  onBack?: () => void; // 🌟 Made optional so we can hide it on success screens
  staright?: boolean;
}

export default function BackHeader({ title, paragraph, onBack, staright }: BackHeaderProps) {
  return (
    <View style={[styles.container, staright && {flexDirection: "row", gap: 10, }]}>
      {/* 🌟 Only render the navigation row if an onBack function is provided */}
      {onBack && (
        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft color={Colors.newWhite} width={16} height={16} />
          </TouchableOpacity>
        </View>
      )}

      {/* Descriptive Contextual Title Block */}
      <View style={[styles.titleBlock, !onBack && styles.titleBlockNoBack, staright && {marginTop: 18} ]}>
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
    marginBottom: 2, 
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
    marginTop: 1,
  },
  titleBlockNoBack: {
    marginTop: 24, // 🌟 Adds extra top spacing if the back button row is gone
  },
});