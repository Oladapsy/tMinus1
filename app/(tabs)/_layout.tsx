import { Tabs } from "expo-router";
import React from "react";
import HomeIcon from "@/assets/icons/tabs/home.svg";
import MarketsIcon from "@/assets/icons/tabs/market.svg";
import TradesIcon from "@/assets/icons/tabs/trades.svg";
import ActivityIcon from "@/assets/icons/tabs/activity.svg";
import WalletsIcon from "@/assets/icons/tabs/wallet.svg";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.mediumGray,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FontFamily.regular,
          fontWeight: 400,
          marginTop: 0,
        },
        tabBarStyle: {
          height: 76,
          backgroundColor: Colors.primary, // tab bar itself
          paddingTop: 10,
          marginHorizontal: 24,
          borderRadius: 20,
          marginBottom: 24,
          position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          // borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? Colors.green : Colors.secondary} />
          ),
        }}
      />
      <Tabs.Screen
        name="markets"
        options={{
          title: "Markets",
          tabBarIcon: ({ focused }) => (
            <MarketsIcon
              width={24}
              height={24}
              color={focused ? Colors.green : Colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trades"
        options={{
          title: "Trades",
          tabBarIcon: ({ focused }) => (
            <TradesIcon
              width={24}
              height={24}
              color={focused ? Colors.green : Colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => (
            <ActivityIcon
              width={24}
              height={24}
              color={focused ? Colors.green : Colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallets"
        options={{
          title: "Wallets",
          tabBarIcon: ({ focused }) => (
            <WalletsIcon color={focused ? Colors.green : Colors.secondary} />
          ),
        }}
      />
    </Tabs>
  );
}
