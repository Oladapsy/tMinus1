import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import WalletDashboardView from "@/src/components/wallet/lite/WalletDashboardView";
import { Colors } from "@/src/constants/colors";
import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import DepositSelectorView from "@/src/components/wallet/lite/DepositSelectorView";

type WorkflowMode =
  | "dashboard"
  | "portfolio_history"
  | "deposit_selector"
  | "usdt_deposit"
  | "simulate_deposit";

export default function NewWalletScreen() {
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>("dashboard");

  const mockAssets = [
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      network: "TRC20",
      balance: "1,000.00 USDT",
      value: "$2,450.00",
      color: Colors.green,
    },
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      network: "Testnet",
      balance: "0.0200 BTC",
      value: "$1,284.00",
      color: Colors.newCryptoYellow,
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      network: "Sepolia",
      balance: "0.3400 ETH",
      value: "$1,158.40",
      color: Colors.purple,
    },
  ];

  // Handle action button routing hooks
  const handleDepositNavigation = () => {
    console.log("Navigating to Deposit Selector view...");
    setWorkflowMode("deposit_selector"); // Updates step workflow routing
  };

  const handleWithdrawNavigation = () => {
    console.log("Navigating to Withdraw variant view...");
  };

  const handleTradeNavigation = () => {
    console.log("Navigating to active Market trading module...");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImageWrapper}
      resizeMode="cover"
    >
      <MySafeAreaView
        style={styles.safeContainer}
        edges={["top", "bottom", "left", "right"]}
      >
        {/* State Conditional Workflow Orchestrator Engine */}
        {workflowMode === "dashboard" && (
          <WalletDashboardView
            totalBalance="$4,892.40"
            trendText="+3.8% today"
            assets={mockAssets}
            onDepositPress={handleDepositNavigation}
            onWithdrawPress={handleWithdrawNavigation}
            onTradePress={handleTradeNavigation}
          />
        )}

        {/* deposit selector */}
        {workflowMode === "deposit_selector" && (
          <DepositSelectorView
            assets={mockAssets}
            onSelectAsset={(assetId) => {
              console.log(`Asset selected for deposit processing: ${assetId}`);
              if (assetId === "usdt") {
                setWorkflowMode("usdt_deposit"); // We will build this QR screen view next!
              }
            }}
            onCancel={() => setWorkflowMode("dashboard")}
          />
        )}
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageWrapper: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
