import { StyleSheet, View } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import ActionCard from "@/src/components/common/ActionCard";
import RocketIcon from "@/assets/icons/home/Rocket.svg";
import WalletIcon from "@/assets/icons/home/wallet1.svg";

export default function HomeTab() {
  const handleAction1Press = () => {
    console.log("Action 1 pressed");
  };
  const handleAction2Press = () => {
    console.log("Action 2 pressed");
  };
  return (
    <MySafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.head}>
        {/* The header */}
        <View style={styles.header}>
          <HeadIcons />
        </View>

        {/* Action card test */}
        <View style={styles.action}>
          <ActionCard
            icon={<RocketIcon />}
            title="P2P Trading"
            description="Bank Transfer, Paypal Revolut..."
            onPress={handleAction1Press}
          />
          <ActionCard
            icon={<WalletIcon />}
            title="Credit/Debit Card"
            description="Visa, Mastercard"
            onPress={handleAction2Press}
          />
        </View>
      </View>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  head: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 260,
  },
  action: {
    paddingHorizontal: 24,
    paddingTop: 21,
    gap: 8.34,
  },
});
