import { View, Text } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";

export default function Onboarding1() {
  return (
    <MySafeAreaView color={Colors.primary}>
      <View>
        <Text>Onboarding 1</Text>
      </View>
    </MySafeAreaView>
  );
}
