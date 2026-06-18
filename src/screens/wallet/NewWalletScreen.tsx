import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import WalletDashboardView from "@/src/components/wallet/lite/WalletDashboardView";
import { Colors } from "@/src/constants/colors";
import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
// 🌟 Updated selector import to use the new generic component
import AssetSelectorView from "@/src/components/wallet/lite/AssetSelectorView";
import CryptoDepositQrView from "@/src/components/wallet/lite/CryptoDepositQrView";
import SimulateDepositView from "@/src/components/wallet/lite/SimulateDepositView";
import WithdrawFormView from "@/src/components/wallet/lite/WithdrawFormView";
// import WithdrawFormView from "@/src/components/wallet/lite/WithdrawFormView"; // 🌟 Added

type WorkflowMode =
  | "dashboard"
  | "portfolio_history"
  | "deposit_selector"
  | "crypto_deposit"
  | "simulate_deposit"
  | "withdraw_selector" // 🌟 Added
  | "withdraw_form"; // 🌟 Added

interface AssetData {
  id: string;
  name: string;
  symbol: string;
  network: string;
  balance: string;
  value: string;
  color: string;
  depositAddress: string;
}

export default function NewWalletScreen() {
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>("dashboard");
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);

  const mockAssets: AssetData[] = [
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      network: "TRC20",
      balance: "1,000.00 USDT",
      value: "$2,450.00",
      color: Colors.green,
      depositAddress: "TXYZ5dirgMNYdQskfiP5zj39VYemXareK4C",
    },
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      network: "Testnet",
      balance: "0.0200 BTC",
      value: "$1,284.00",
      color: Colors.newCryptoYellow,
      depositAddress: "tb1qrp33g0q5c2txzc97w784ttvthm",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      network: "Sepolia",
      balance: "0.3400 ETH",
      value: "$1,158.40",
      color: Colors.purple,
      depositAddress: "0x71C7656EC7ab88b098defB751B7401B5f",
    },
  ];

  const handleDepositNavigation = () => {
    setWorkflowMode("deposit_selector");
  };

  const handleWithdrawNavigation = () => {
    // 🌟 Rerouted dashboard click event straight to our multi-mode selector
    setWorkflowMode("withdraw_selector");
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

        {/* 📥 Deposit Selector Using The Reusable Component */}
        {workflowMode === "deposit_selector" && (
          <AssetSelectorView
            title="Deposit"
            assets={mockAssets}
            onSelectAsset={(assetId) => {
              const foundAsset = mockAssets.find((a) => a.id === assetId);
              if (foundAsset) {
                setSelectedAsset(foundAsset);
                setWorkflowMode("crypto_deposit");
              }
            }}
            onCancel={() => setWorkflowMode("dashboard")}
          />
        )}

        {/* 📤 Withdrawal Selector Using The Reusable Component */}
        {workflowMode === "withdraw_selector" && (
          <AssetSelectorView
            title="Withdraw"
            assets={mockAssets}
            onSelectAsset={(assetId) => {
              const foundAsset = mockAssets.find((a) => a.id === assetId);
              if (foundAsset) {
                setSelectedAsset(foundAsset);
                setWorkflowMode("withdraw_form"); // 🚀 direct straight to form input layout
              }
            }}
            onCancel={() => setWorkflowMode("dashboard")}
          />
        )}

        {/* Dynamic Crypto Deposit Screen */}
        {workflowMode === "crypto_deposit" && selectedAsset && (
          <CryptoDepositQrView
            asset={selectedAsset}
            onCopyAddress={() =>
              console.log(`${selectedAsset.symbol} address copied!`)
            }
            onSimulateDeposit={() => setWorkflowMode("simulate_deposit")}
            onGoBack={() => setWorkflowMode("deposit_selector")}
          />
        )}

        {/* Dynamic Simulate Deposit Testing View Frame */}
        {workflowMode === "simulate_deposit" && selectedAsset && (
          <SimulateDepositView
            asset={selectedAsset}
            onGoBack={() => setWorkflowMode("crypto_deposit")}
            onCreateDeposit={() => {
              console.log("Creating pending sandbox deposit record...");
              setWorkflowMode("dashboard");
            }}
          />
        )}

        {/* 🌟 New Dynamic Withdrawal Input Form Panel View */}
        {workflowMode === "withdraw_form" && selectedAsset && (
          <WithdrawFormView
            asset={selectedAsset}
            onGoBack={() => setWorkflowMode("withdraw_selector")}
            onPreviewWithdrawal={() => {
              console.log("Processing formal withdrawal confirmation preview layer...");
              setWorkflowMode("dashboard"); // Go back home on completion
            }}
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
