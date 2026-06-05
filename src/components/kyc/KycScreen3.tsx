import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function KycScreen3({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.container}>
      <Text>Screen3</Text>
      <Button title="Next" onPress={onNext} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
