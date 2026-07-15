import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";

import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// Layout Component Links

// Assets and Data Slices
import RocketIcon from "@/assets/icons/home/Rocket.svg";
import WalletIcon from "@/assets/icons/home/wallet1.svg";
import KycIcon from "@/assets/icons/profile/kyc/kyc.svg";
import { RootState } from "@/src/store/store";
import { useRouter } from "expo-router";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import HeadIcons from "@/src/features/shared/components/tab/HeadIcons";
import Title from "@/src/features/shared/components/Title";
import Paragraph from "@/src/features/shared/components/Paragraph";
import TotalBalanceCard from "@/src/features/home/TotalBalanceCard";
import QuickActions from "@/src/features/home/QuickActions";
import WalletFallbackState from "@/src/features/shared/components/WalletFallbackState";
import ActionCard from "@/src/features/shared/components/ActionCard";
import CoinList from "@/src/features/home/CoinList";
import { RECENT_COINS, TOP_COINS } from "@/src/features/home/utils/data/coins";

// Design State Engine Options
type DashboardState = "SUCCESS" | "LOADING" | "EMPTY" | "ERROR";

export default function HomeTab() {
  const router = useRouter();
  // Pull active user session directly from Redux Warehouse shelves
  const currentProfile = useSelector((state: RootState) => state.auth.user);

  const targetUsername = currentProfile?.fullName || "User";
  const kycStatus = currentProfile?.kycStatus;

  // 🌟 TEST TOGGLE: Switch between "SUCCESS", "LOADING", "EMPTY", "ERROR" to test layouts!
  const [screenState] = useState<DashboardState>("SUCCESS");

  const handleDepositTrigger = () =>
    router.push({
      pathname: "/(tabs)/wallets/MainWalletScreen",
      params: { action: "open_deposit" },
    });
  const handleAction1Press = () => console.log("Action 1 pressed");
  const handleAction2Press = () => console.log("Action 2 pressed");

  return (
    <MySafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        style={styles.masterScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.masterScrollContent}
        bounces={true}
      >
        {/* 🟢 THE TOP DARK PANEL FRAME */}
        <View style={styles.darkHeaderWrapper}>
          <HeadIcons />

          {/* Dynamic Greeting Title Card */}
          <View style={styles.greetingContainer}>
            <Title text="Home" fontFamily={FontFamily.bold} size={28} />
            {screenState === "SUCCESS" && (
              <Paragraph
                text={`Welcome back, ${targetUsername}`}
                textAlign="left"
                size={14}
              />
            )}
          </View>

          {/* Conditional Header Content based on State */}
          {screenState === "SUCCESS" && (
            <View>
              {/* integrate both UI */}
              <TotalBalanceCard onDepositPress={handleDepositTrigger} />

              <View style={styles.quickActionsContainer}>
                <QuickActions />
              </View>
            </View>
          )}

          {screenState === "LOADING" && (
            <View style={styles.loaderStateBox}>
              <ActivityIndicator color={Colors.green} size="large" />
              <Text style={styles.loaderStateText}>
                Loading market and wallet data...
              </Text>
            </View>
          )}

          {screenState === "EMPTY" && (
            <WalletFallbackState
              icon="+"
              title="Start your sandbox wallet"
              paragraph="Deposit USDT, build a watchlist, then create your first quote."
              actionText="Deposit USDT"
              onActionPress={() =>
                console.log("Deposit USDT pressed from empty state")
              }
            />
          )}

          {screenState === "ERROR" && (
            <WalletFallbackState
              icon="!"
              isErrorType={true}
              title="Could not refresh data"
              paragraph="Keep cached balances visible and let the user retry."
              actionText="Try again"
              onActionPress={() => console.log("Retrying data fetch...")}
            />
          )}
        </View>

        {/* ⚪ THE BOTTOM LIGHT WHITE SECTION CONTAINER */}
        <View style={styles.whiteBodyWrapper}>
          {/* Action banner row anchors */}
          {kycStatus === "approved" && (
            <View style={styles.actionRowGrid}>
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
          )}

          {kycStatus !== "approved" && (
            <View style={styles.actionRowGrid}>
              <ActionCard
                icon={<KycIcon />}
                title="Verify Your Kyc"
                description="Go to Kyc to start enjoying the app"
                onPress={() => router.push("/profile/kyc")}
              />
            </View>
          )}

          {/* Coin List Panels */}
          <View style={styles.coinListSpacing}>
            <CoinList title="Recent Coin" data={RECENT_COINS} />
            <CoinList title="Top Coins" data={TOP_COINS} />
          </View>
        </View>
      </ScrollView>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  masterScrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  masterScrollContent: {
    paddingBottom: 100,
  },
  darkHeaderWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greetingContainer: {
    marginTop: 12,
  },
  quickActionsContainer: {
    marginTop: 20,
  },
  whiteBodyWrapper: {
    backgroundColor: "white",
    flex: 1,
  },
  actionRowGrid: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  coinListSpacing: {
    marginTop: 16,
  },

  // Custom Fallback/State Mechanics
  loaderStateBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 16,
  },
  loaderStateText: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: FontFamily.regular,
  },
});
