import { StyleSheet } from "react-native";
import React from "react";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";

const WalletScreen = () => {
  return (
    <MySafeAreaView style={Style.container}>
      <HeadIcons />
    </MySafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default WalletScreen;
