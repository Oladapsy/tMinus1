import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import IconAndText from "@/src/components/common/tab/IconAndText";
import { FontFamily } from "@/src/constants/fonts";
import Back from "@/assets/icons/main/backward.svg";
import More from "@/assets/icons/main/More.svg";
import { router } from "expo-router";
import ProfileHeader from "@/src/components/market/MarketHeader";
import Avatar from "@/assets/images/market/avatar.png";
import { LinearGradient } from "expo-linear-gradient";
import CommonActions from "@/src/components/market/CommonActions";
import TradeActions from "@/src/components/market/TradeActions";
import FinanceActions from "@/src/components/market/FinanceActions";

export default function MenuScreen() {
  return (
    <MySafeAreaView style={Style.container}>
      {/* Head -> Icon and text */}
      <LinearGradient
        colors={["#1B232A00", "rgba(94, 213, 168, 0.1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={Style.gradient}
      />

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

      <ProfileHeader
        avatar={Avatar}
        username="User 1234"
        userId="1234567890"
        onCopy={() => console.log("Copied")}
        onEdit={() => console.log("Edit Profile")}
      />

      {/* Remaining content  */}
      <ScrollView
        style={Style.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Style.scrollContent}
      >
        <View>
          <View style={Style.actions}>
            <CommonActions />
          </View>

          <View style={Style.actions2}>
            <TradeActions />
          </View>

          <View style={Style.actions2}>
            <FinanceActions />
          </View>
        </View>
      </ScrollView>
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
  //gradient
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 175,
    zIndex: -1,
  },
  actions: {
    marginTop: 50,
  },
  actions2: {
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // space for floating tab bar
  },
});
