import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export default function SigningInState() {
  return (
    <View style={styles.container}>
      <View style={styles.titleLeftAlignment}>
        <TitleAndParagraph title="Signing you in" titleSize={32} />
      </View>

      {/* SKELETON INPUT PLACEHOLDERS MATCHING THE DESIGN */}
      <View style={styles.skeletonGroup}>
        <View style={styles.skeletonField} />
        <View style={styles.skeletonField} />
        <View style={styles.skeletonField} />
        <View style={styles.skeletonField} />
      </View>

      <Text style={styles.statusText}>
        Checking credentials and security settings...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  titleLeftAlignment: { alignSelf: "flex-start", marginTop: 40 },
  skeletonGroup: { width: "100%", gap: 16, marginTop: 40 },
  skeletonField: {
    height: 56,
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    opacity: 0.2,
  },
  statusText: {
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    textAlign: "center",
    marginTop: 48,
  },
});
