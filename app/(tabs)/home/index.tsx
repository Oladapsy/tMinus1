import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// Layout Component Links
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import ActionCard from "@/src/components/common/ActionCard";
import TotalBalanceCard from "@/src/components/home/TotalBalanceCard";
import QuickActions from "@/src/components/home/QuickActions";
import CoinList from "@/src/components/home/CoinList";

// Assets and Data Slices
import RocketIcon from "@/assets/icons/home/Rocket.svg";
import WalletIcon from "@/assets/icons/home/wallet1.svg";
import KycIcon from "@/assets/icons/profile/kyc/kyc.svg";
import { RECENT_COINS, TOP_COINS } from "@/src/data/coins";
import { RootState } from "@/src/store/store";
import { useRouter } from "expo-router";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";

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
            <View style={styles.fallbackCenterBox}>
              <View style={styles.emptyIconCircle}>
                <Text style={styles.emptyIconText}>+</Text>
              </View>
              <Text style={styles.fallbackTitleText}>
                Start your sandbox wallet
              </Text>
              <Text style={styles.fallbackParaText}>
                Deposit USDT, build a watchlist, then create your first quote.
              </Text>

              <TouchableOpacity
                style={styles.stateActionButton}
                onPress={() =>
                  console.log("Deposit USDT pressed from empty state")
                }
              >
                <Text style={styles.stateActionButtonText}>Deposit USDT</Text>
              </TouchableOpacity>
            </View>
          )}

          {screenState === "ERROR" && (
            <View style={styles.fallbackCenterBox}>
              <View style={styles.errorIconCircle}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <Text style={styles.fallbackTitleText}>
                Could not refresh data
              </Text>
              <Text style={styles.fallbackParaText}>
                Keep cached balances visible and let the user retry.
              </Text>

              <TouchableOpacity
                style={styles.stateActionButton}
                onPress={() => console.log("Retrying data fetch...")}
              >
                <Text style={styles.stateActionButtonText}>Try again</Text>
              </TouchableOpacity>
            </View>
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
  fallbackCenterBox: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(94, 213, 168, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyIconText: {
    color: Colors.green,
    fontSize: 28,
    fontFamily: FontFamily.medium,
  },
  errorIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 77, 77, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  errorIconText: {
    color: Colors.newRed,
    fontSize: 28,
    fontFamily: FontFamily.bold,
  },
  fallbackTitleText: {
    color: "white",
    fontSize: 18,
    fontFamily: FontFamily.bold,
    textAlign: "center",
    marginBottom: 8,
  },
  fallbackParaText: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: FontFamily.regular,
    textAlign: "center",
    lineHeight: 18,
  },
  stateActionButton: {
    backgroundColor: Colors.green,
    height: 48,
    width: "100%",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  stateActionButtonText: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
});
