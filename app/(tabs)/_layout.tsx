import { Tabs } from "expo-router";
import React from "react";
import HomeIcon from "@/assets/icons/tabs/home.svg";
import MarketsIcon from "@/assets/icons/tabs/market.svg";
import TradesIcon from "@/assets/icons/tabs/trades.svg";
import ActivityIcon from "@/assets/icons/tabs/activity.svg";
import WalletsIcon from "@/assets/icons/tabs/wallet.svg";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: () => <HomeIcon /> }} />
      <Tabs.Screen name="markets" options={{ title: "Markets", tabBarIcon: () => <MarketsIcon /> }} />
      <Tabs.Screen name="trades" options={{ title: "Trades", tabBarIcon: () => <TradesIcon /> }} />
      <Tabs.Screen name="activity" options={{ title: "Activity", tabBarIcon: () => <ActivityIcon /> }} />
      <Tabs.Screen name="wallets" options={{ title: "Wallets", tabBarIcon: () => <WalletsIcon /> }} />
    </Tabs>
  );
}
