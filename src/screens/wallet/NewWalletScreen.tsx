import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import WalletDashboardView from "@/src/components/wallet/lite/WalletDashboardView";
import { Colors } from "@/src/constants/colors";
import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import AssetSelectorView from "@/src/components/wallet/lite/AssetSelectorView";
import CryptoDepositQrView from "@/src/components/wallet/lite/CryptoDepositQrView";
import SimulateDepositView from "@/src/components/wallet/lite/SimulateDepositView";
import WithdrawFormView from "@/src/components/wallet/lite/WithdrawFormView";
import WithdrawalSuccessView from "@/src/components/wallet/lite/WithdrawalSuccessView";
import WithdrawConfirmationView from "@/src/components/wallet/lite/ithdrawConfirmationView";
import TransactionHistoryView from "@/src/components/wallet/lite/TransactionHistoryView";
import TransactionDetailsView from "@/src/components/wallet/lite/TransactionDetailsView";
import PortfolioHistoryView from "@/src/components/wallet/lite/PortfolioHistoryView";

import {
  useGetPortfolioHistoryQuery,
  useGetTransactionsQuery,
} from "@/src/services/walletApi";
// 🟢 IMPORT THE OFFICIAL SCHEMA TYPE SECTOR LIFTED DIRECTLY FROM CENTRAL STORAGE
import { WalletResponse } from "@/src/types/wallet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type WorkflowMode =
  | "dashboard"
  | "portfolio_history"
  | "deposit_selector"
  | "crypto_deposit"
  | "simulate_deposit"
  | "withdraw_selector"
  | "withdraw_form"
  | "withdraw_confirmation"
  | "withdraw_success"
  | "transaction_history"
  | "transaction_details";

export interface AssetData {
  id: string;
  name: string;
  symbol: string;
  network: string;
  balance: string;
  value: string;
  color: string;
  depositAddress: string;
  qrPayload: string;
}

interface NewWalletScreenProps {
  walletData: WalletResponse["data"] | undefined;
}

const ASSET_THEME_MAP: Record<string, { name: string; color: string }> = {
  BTC: { name: "Bitcoin", color: Colors.newCryptoYellow },
  ETH: { name: "Ethereum", color: Colors.purple },
  USDT: { name: "Tether", color: Colors.green },
  USDC: { name: "USD Coin", color: "#2775CA" },
  SOL: { name: "Solana", color: Colors.green },
};

export default function NewWalletScreen({ walletData }: NewWalletScreenProps) {
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>("dashboard");
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [activeRange, setActiveRange] = useState<"1D" | "1W" | "1M" | "1Y">(
    "1M",
  );

  // for recent transaction
  const { data: txResponse, isLoading: isTxLoading } = useGetTransactionsQuery({
    limit: 5,
  });
  const transactions = txResponse?.data || [];

  const { data: historyResponse, isLoading: isHistoryLoading } =
    useGetPortfolioHistoryQuery({ range: activeRange });

  const wallet = walletData?.wallet;

  // 🔄 🟢 Fixed: Added strict inner array parameter definitions for loop passes
  const mappedAssets: AssetData[] = (wallet?.balances || []).map(
    (bal: { assetSymbol: string; available: number }) => {
      const assetMeta = ASSET_THEME_MAP[bal.assetSymbol] || {
        name: bal.assetSymbol,
        color: Colors.green,
      };

      const addressInfo = wallet?.depositAddresses?.find(
        (addr: {
          assetSymbol: string;
          network: string;
          address: string;
          qrPayload: string;
        }) => addr.assetSymbol === bal.assetSymbol,
      );

      return {
        id: bal.assetSymbol.toLowerCase(),
        name: assetMeta.name,
        symbol: bal.assetSymbol,
        network: addressInfo?.network || "Network Layer Testnet",
        balance: `${bal.available.toLocaleString()} ${bal.assetSymbol}`,
        value:
          bal.assetSymbol === "USDT" || bal.assetSymbol === "USDC"
            ? `$${bal.available.toFixed(2)}`
            : "Market Live",
        color: assetMeta.color,
        depositAddress: addressInfo?.address || "",
        qrPayload: addressInfo?.qrPayload || "",
      };
    },
  );

  // Extract the live aggregate dollar evaluation directly from the server payload
  const portfolioTotalString = walletData?.portfolioValueUsd
    ? `$${walletData.portfolioValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "$0.00";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.backgroundImageWrapper}
        resizeMode="cover"
      >
        <MySafeAreaView
          style={styles.safeContainer}
          edges={["top", "bottom", "left", "right"]}
        >
          {workflowMode === "dashboard" && (
            <WalletDashboardView
              totalBalance={portfolioTotalString}
              trendText="+0% today"
              assets={mappedAssets}
              transactions={transactions}
              onDepositPress={() => setWorkflowMode("deposit_selector")}
              onWithdrawPress={() => setWorkflowMode("withdraw_selector")}
              onTradePress={() =>
                console.log("Navigating to active Market trading module...")
              }
              onBalancePress={() => setWorkflowMode("portfolio_history")}
            />
          )}

          {workflowMode === "portfolio_history" && (
            <PortfolioHistoryView
              apiPayload={
                historyResponse || {
                  data: [],
                  meta: {
                    count: 0, // 🌟 FIXED: Added missing required API property
                    range: activeRange,
                    latestValueUsd: 0,
                    latestValue: 0,
                    currency: "USD",
                  },
                }
              }
              onRangeChange={(range) => setActiveRange(range)}
              isLoading={isHistoryLoading}
              onGoBack={() => setWorkflowMode("dashboard")}
            />
          )}

          {workflowMode === "deposit_selector" && (
            <AssetSelectorView
              title="Deposit"
              assets={mappedAssets}
              onSelectAsset={(assetId) => {
                const foundAsset = mappedAssets.find((a) => a.id === assetId);
                if (foundAsset) {
                  setSelectedAsset(foundAsset);
                  setWorkflowMode("crypto_deposit");
                }
              }}
              onCancel={() => setWorkflowMode("dashboard")}
            />
          )}

          {workflowMode === "withdraw_selector" && (
            <AssetSelectorView
              title="Withdraw"
              assets={mappedAssets}
              onSelectAsset={(assetId) => {
                const foundAsset = mappedAssets.find((a) => a.id === assetId);
                if (foundAsset) {
                  setSelectedAsset(foundAsset);
                  setWorkflowMode("withdraw_form");
                }
              }}
              onCancel={() => setWorkflowMode("dashboard")}
            />
          )}

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

          {workflowMode === "simulate_deposit" && selectedAsset && (
            <SimulateDepositView
              asset={selectedAsset}
              onGoBack={() => setWorkflowMode("crypto_deposit")}
              onCreateDeposit={() => setWorkflowMode("dashboard")}
            />
          )}

          {workflowMode === "withdraw_form" && selectedAsset && (
            <WithdrawFormView
              asset={selectedAsset}
              onGoBack={() => setWorkflowMode("withdraw_selector")}
              onPreviewWithdrawal={() =>
                setWorkflowMode("withdraw_confirmation")
              }
            />
          )}

          {workflowMode === "withdraw_confirmation" && selectedAsset && (
            <WithdrawConfirmationView
              asset={selectedAsset}
              onGoBack={() => setWorkflowMode("withdraw_form")}
              onSubmitWithdrawal={() => setWorkflowMode("withdraw_success")}
            />
          )}

          {workflowMode === "withdraw_success" && selectedAsset && (
            <WithdrawalSuccessView
              asset={selectedAsset}
              onViewTransaction={() => setWorkflowMode("transaction_history")}
            />
          )}

          {workflowMode === "transaction_history" && (
            <TransactionHistoryView
              onSelectTx={(tx) => {
                setSelectedTx(tx);
                setWorkflowMode("transaction_details");
              }}
              onGoBack={() => setWorkflowMode("dashboard")}
            />
          )}

          {workflowMode === "transaction_details" && selectedTx && (
            <TransactionDetailsView
              tx={selectedTx}
              onGoBack={() => setWorkflowMode("transaction_history")}
              onBackToWallet={() => setWorkflowMode("dashboard")}
            />
          )}
        </MySafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
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
