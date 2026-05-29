import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";


// get the screen height 
const SCREEN_HEIGHT = Dimensions.get("window").height;
const PANEL_HEIGHT = SCREEN_HEIGHT * 0.5; // pannel takes 50% of screen
 
const TradesTabs = () => {
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

export default TradesTabs;
