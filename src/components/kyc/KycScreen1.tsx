import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface KycScreenProps {
  onNext: () => void;
}
export default function KycScreen1({ onNext }: KycScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Screen1</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
