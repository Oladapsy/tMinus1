import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export default function SigningInState() {
  return (
    <View style={styles.container}>
      <View style={styles.titleLeftAlignment}>
        <TitleAndParagraph title="Signing you in" titleSize={28} />
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
  container: {
    width: "100%",
  },
  titleLeftAlignment: {
    alignSelf: "flex-start",
    marginTop: 40,
  },
  skeletonGroup: {
    width: "100%",
    gap: 26,
    marginTop: 50,
  },
  skeletonField: {
    height: 54,
    backgroundColor: Colors.skelenton,
    borderRadius: 18,
  },
  statusText: {
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    textAlign: "center",
    marginTop: 48,
  },
});
