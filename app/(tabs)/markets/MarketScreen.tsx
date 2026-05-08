import { StyleSheet, View } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import IconAndText from "@/src/components/common/tab/IconAndText";
import { FontFamily } from "@/src/constants/fonts";
import Back from "@/assets/icons/main/backward.svg";
import More from "@/assets/icons/main/More.svg";
import { router } from "expo-router";

export default function MarketScreen() {
  return (
    <MySafeAreaView style={Style.container}>
      {/* Head -> Icon and text */}
      <View style={Style.headWrapper}>
        <IconAndText
          icon={<Back color={Colors.secondary} />}
          label="Menu"
          labelStyle={Style.headLabel}
          onPress={() => {
            router.back();
          }}
          containerStyle={{ flexDirection: "row", gap: 10 }}
        />
        {/* more */}
        <IconAndText
          icon={<More color={Colors.secondary} />}
          labelStyle={Style.headLabel}
          onPress={() => {
            console.log("More pressed");
          }}
        />
      </View>

      {/* profile copy and rest */}
      
    </MySafeAreaView>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
  },
  headWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headLabel: {
    color: "white",
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
});
