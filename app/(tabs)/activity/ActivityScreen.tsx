import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import ListItem from "@/src/components/common/ListItem";
import DeopsitIcon from "@/assets/icons/activity/deposit.svg";
import WithdrawlIcon from "@/assets/icons/activity/withdrawal.svg";
import BuyOrderIcon from "@/assets/icons/activity/buyOrder.svg";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import ActivityCard from "@/src/components/activity/ActivityCard";

const ActivityScreen = () => {
  return (
    <MySafeAreaView style={Style.container}>
      <HeadIcons />

      {/* Main Content */}
      <View style={Style.main}>
        {/*Deposit || Withdrawal || Buy-Order*/}
        <View style={Style.actionTop}>
          <ListItem
            paddingVertical={10}
            icon={<DeopsitIcon />}
            label="Deposit"
            value=""
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <ListItem
            paddingVertical={10}
            icon={<WithdrawlIcon />}
            label="Withdrawals"
            value=""
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <ListItem
            paddingVertical={10}
            icon={<BuyOrderIcon />}
            label="Buy Order"
            value=""
            onPress={() => {
              console.log("Pressed");
            }}
            borderBottom={false}
          />
        </View>

        {/* Activity List */}
        <Title text="Recent Activity" size={18} fontFamily={FontFamily.bold} />

        <ScrollView>
          <ActivityCard
            pair="BTC/BUSD"
            date="2021-08-02 04:39:26"
            amount1="0.49975"
            amount2="0.49975"
            price="2652.00"
            status="Filled"
          />
          <ActivityCard
            pair="BTC/BUSD"
            date="2021-08-02 04:39:26"
            amount1="0.49975"
            amount2="0.49975"
            price="2652.00"
            status="Cancelled"
          />
        </ScrollView>
      </View>
    </MySafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  main: {
    paddingHorizontal: 24,
  },
  actionTop: {
    backgroundColor: Colors.tertiary,
    height: 144,
    marginTop: 24,
    borderRadius: 12,
    padding: 10,
    marginBottom: 30,
  },
});

export default ActivityScreen;
