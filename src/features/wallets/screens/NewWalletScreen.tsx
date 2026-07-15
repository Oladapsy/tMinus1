import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import WalletDashboardView from "@/src/components/wallet/lite/WalletDashboardView";
import { Colors } from "@/src/constants/colors";
import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import {
  useGetPortfolioHistoryQuery,
  useGetTransactionsQuery,
  walletApi,
  useRequestWithdrawalMutation,
  useExecuteInternalTransferMutation,
} from "@/src/features/wallets/api/walletApi";
import { WalletResponse } from "@/src/types/wallet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useToast } from "@/src/context/ToastContext";

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
  initialWorkflow?: string;
  initialTxReference?: string; // 🟢 1. Added optional prop here
}

const ASSET_THEME_MAP: Record<string, { name: string; color: string }> = {
  BTC: { name: "Bitcoin", color: Colors.newCryptoYellow },
  ETH: { name: "Ethereum", color: Colors.purple },
  USDT: { name: "Tether", color: Colors.green },
  USDC: { name: "USD Coin", color: "#2775CA" },
  SOL: { name: "Solana", color: Colors.green },
};

export default function NewWalletScreen({
  walletData,
  initialWorkflow = "dashboard",
  initialTxReference, // 🟢 2. Destructured here
}: NewWalletScreenProps) {
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>(
    initialWorkflow as WorkflowMode,
  );

  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [activeRange, setActiveRange] = useState<"1D" | "1W" | "1M" | "1Y">(
    "1M",
  );
  const [successDetails, setSuccessDetails] = useState<any | null>(null);

  const [requestWithdrawal, { isLoading: isWithdrawalLoading }] =
    useRequestWithdrawalMutation();
  const [executeInternalTransfer, { isLoading: isTransferLoading }] =
    useExecuteInternalTransferMutation();

  type WithdrawalType = "external" | "internal";
  const [withdrawalType, setWithdrawalType] =
    useState<WithdrawalType>("external");

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawAddress, setWithdrawAddress] = useState<string>("");
  const [withdrawNetwork, setWithdrawNetwork] = useState<string>("");

  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Increase the lookup range to ensure recent trades are easily discoverable
  const { data: txResponse, refetch: refetchTransactions } =
    useGetTransactionsQuery({ limit: 20, page: 1 });
  const transactions = txResponse?.data || [];
  

  const { data: historyResponse, isLoading: isHistoryLoading } =
    useGetPortfolioHistoryQuery({ range: activeRange });

  const wallet = walletData?.wallet;
  const derivedPrices: Record<string, number> = {
  USDT: 1.00,
  USDC: 1.00,
};

transactions.forEach((tx: any) => {
  // If your tx object has fields like fromAsset, toAsset, fromAmount, toAmount
  if (tx.type === "swap" || tx.type === "trade") {
    const isStableFrom = tx.fromAsset === "USDT" || tx.fromAsset === "USDC";
    const isStableTo = tx.toAsset === "USDT" || tx.toAsset === "USDC";

    if (isStableFrom && tx.fromAmount > 0 && tx.toAmount > 0) {
      // Example: Buying BTC with USDT -> Price = USDT paid / BTC received
      derivedPrices[tx.toAsset] = tx.fromAmount / tx.toAmount;
    } else if (isStableTo && tx.toAmount > 0 && tx.fromAmount > 0) {
      // Example: Selling BTC for USDT -> Price = USDT received / BTC sold
      derivedPrices[tx.fromAsset] = tx.toAmount / tx.fromAmount;
    }
  }
});

const mappedAssets: AssetData[] = (wallet?.balances || []).map(
  (bal: { assetSymbol: string; available: number }) => {
    const assetMeta = ASSET_THEME_MAP[bal.assetSymbol] || {
      name: bal.assetSymbol,
      color: Colors.green,
    };

    const addressInfo = wallet?.depositAddresses?.find(
      (addr: { assetSymbol: string }) => addr.assetSymbol === bal.assetSymbol,
    );

    // Get the price: Use the derived rate or default to 1 for stables, fallback to 0
    const currentPrice = derivedPrices[bal.assetSymbol] || (bal.assetSymbol === "USDT" || bal.assetSymbol === "USDC" ? 1 : 0);
    const calculatedFiatWorth = bal.available * currentPrice;

    return {
      id: bal.assetSymbol.toLowerCase(),
      name: assetMeta.name,
      symbol: bal.assetSymbol,
      network: addressInfo?.network || "Network Layer Testnet",
      balance: `${bal.available.toLocaleString()} ${bal.assetSymbol}`,
      
      // 🟢 Update this conditional block to display your calculated worth
      value: currentPrice > 0 
        ? `$${calculatedFiatWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "Market Live", // Fallback string if no matching trades are found yet
        
      color: assetMeta.color,
      depositAddress: addressInfo?.address || "",
      qrPayload: addressInfo?.qrPayload || "",
    };
  },
);

  // ... your mappedAssets code block stays exactly the same ...

  const handleConfirmWithdrawal = async (pinCode: string) => {
    if (!selectedAsset) return;

    try {
      let resultPayload: any;

      if (withdrawalType === "internal") {
        resultPayload = await executeInternalTransfer({
          assetSymbol: selectedAsset.symbol,
          amount: withdrawAmount,
          recipient: withdrawAddress,
          pin: pinCode,
        }).unwrap();

        setSuccessDetails({
          status: resultPayload?.data?.transaction?.status || "completed",
          amount: resultPayload?.data?.transfer?.amount,
          fee: resultPayload?.data?.transaction?.feeAmount || 0,
          reference: resultPayload?.data?.transfer?.reference,
          createdAt: resultPayload?.data?.transaction?.createdAt,
          isInternal: true,
        });
      } else {
        resultPayload = await requestWithdrawal({
          assetSymbol: selectedAsset.symbol,
          amount: withdrawAmount,
          address: withdrawAddress,
          network: withdrawNetwork,
        }).unwrap();

        setSuccessDetails({
          status: resultPayload?.data?.status || "pending",
          amount: resultPayload?.data?.amount,
          fee: resultPayload?.data?.feeAssetAmount || 0,
          reference: resultPayload?.data?.id,
          createdAt: resultPayload?.data?.createdAt,
          isInternal: false,
        });
      }

      setWorkflowMode("withdraw_success");
    } catch (error: any) {
      console.log("Transaction Error Details:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Action failed. Please verify credentials.";
      showToast(`${errorMessage}`, "error");
    }
  };

  const portfolioTotalString = walletData?.portfolioValueUsd
    ? `$${walletData.portfolioValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "$0.00";

  // 🟢 3. Modified selection effect engine intercepts redirects
  useEffect(() => {
    if (initialWorkflow === "transaction_details" && initialTxReference) {
      // Look for the transaction inside your list data arrays
      const matchedTx = transactions.find(
        (t: any) =>
          t.reference === initialTxReference || t.id === initialTxReference,
      );

      if (matchedTx) {
        setSelectedTx(matchedTx);
        setWorkflowMode("transaction_details");
      } else {
        // Safe immediate local fallback shell object if background cache is still downloading raw payloads
        setSelectedTx({
          id: initialTxReference,
          reference: initialTxReference,
          type: "swap",
          status: "completed",
          fromAsset: "USDT",
          toAsset: "",
          fromAmount: 0,
          toAmount: 0,
          feeAmount: 0,
          note: "Trade completed successfully",
          createdAt: new Date().toISOString(),
        });
        setWorkflowMode("transaction_details");
      }
    } else if (initialWorkflow) {
      setWorkflowMode(initialWorkflow as WorkflowMode);
    }
  }, [initialWorkflow, initialTxReference, transactions]);

  return (
    // ... your return block layout stays exactly the same as you shared it
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
              onTradePress={() => console.log("Navigating to market...")}
              onBalancePress={() => setWorkflowMode("portfolio_history")}
              onViewTransactions={() => setWorkflowMode("transaction_history")}
            />
          )}

          {workflowMode === "portfolio_history" && (
            <PortfolioHistoryView
              onGoBack={() => setWorkflowMode("dashboard")}
              apiPayload={historyResponse}
              activeTimeframe={activeRange}
              onRangeChange={(range) => setActiveRange(range)}
              isLoading={isHistoryLoading}
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
              onCreateDeposit={() => {
                setWorkflowMode("dashboard");
                setTimeout(() => {
                  refetchTransactions();
                  dispatch(
                    walletApi.util.invalidateTags(["Wallet", "History"]),
                  );
                }, 10500);
              }}
            />
          )}

          {workflowMode === "withdraw_form" && selectedAsset && (
            <WithdrawFormView
              initialAsset={selectedAsset}
              allAssets={mappedAssets}
              onGoBack={() => setWorkflowMode("withdraw_selector")}
              onPreviewWithdrawal={(
                amount,
                destination,
                chosenNetwork,
                modeType,
              ) => {
                setWithdrawAmount(amount);
                setWithdrawAddress(destination);
                setWithdrawNetwork(chosenNetwork);
                setWithdrawalType(modeType);
                setWorkflowMode("withdraw_confirmation");
              }}
            />
          )}

          {workflowMode === "withdraw_confirmation" && selectedAsset && (
            <WithdrawConfirmationView
              asset={selectedAsset}
              amount={withdrawAmount}
              address={withdrawAddress}
              network={withdrawNetwork}
              withdrawalType={withdrawalType}
              isLoading={isWithdrawalLoading || isTransferLoading}
              onGoBack={() => setWorkflowMode("withdraw_form")}
              onSubmitWithdrawal={(pin) => handleConfirmWithdrawal(pin)}
            />
          )}

          {workflowMode === "withdraw_success" && selectedAsset && (
            <WithdrawalSuccessView
              asset={selectedAsset}
              details={successDetails}
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
