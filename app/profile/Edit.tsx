import { Text, StyleSheet } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";

export default function Edit() {
  return (
    <MySafeAreaView style={Style.container}>
      <Text>Edit</Text>
    </MySafeAreaView>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
