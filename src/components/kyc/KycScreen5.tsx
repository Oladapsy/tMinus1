import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface KycScreenProps {
  onNext: () => void;
}
export default function KycScreen5({ onNext }: KycScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Screen5</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
