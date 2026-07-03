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
import { useDispatch } from "react-redux";
import {
  useGetPortfolioHistoryQuery,
  useGetTransactionsQuery,
  walletApi,
  useRequestWithdrawalMutation,
  useExecuteInternalTransferMutation,
} from "@/src/services/walletApi";
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
  const [successDetails, setSuccessDetails] = useState<any | null>(null);
  // withdrawal and transfer mutation hooks for API calls
  const [requestWithdrawal, { isLoading: isWithdrawalLoading }] =
    useRequestWithdrawalMutation();
  const [executeInternalTransfer, { isLoading: isTransferLoading }] =
    useExecuteInternalTransferMutation();

  // internal and external withdrawal state management nodes
  type WithdrawalType = "external" | "internal";
  const [withdrawalType, setWithdrawalType] =
    useState<WithdrawalType>("external");

  // 🟢 Live state preservation nodes tracking form input state parameters
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawAddress, setWithdrawAddress] = useState<string>("");
  const [withdrawNetwork, setWithdrawNetwork] = useState<string>("");

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { data: txResponse, refetch: refetchTransactions } =
    useGetTransactionsQuery({ limit: 5, page: 1 });

  const transactions = txResponse?.data || [];

  const { data: historyResponse, isLoading: isHistoryLoading } =
    useGetPortfolioHistoryQuery({ range: activeRange });

  const wallet = walletData?.wallet;

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

  const handleConfirmWithdrawal = async (pinCode: string) => {
    if (!selectedAsset) return;

    try {
      let resultPayload: any;

      if (withdrawalType === "internal") {
        // 🚀 Hits /wallet/transfers (PIN is validated here on server side)
        resultPayload = await executeInternalTransfer({
          assetSymbol: selectedAsset.symbol,
          amount: withdrawAmount,
          recipient: withdrawAddress,
          pin: pinCode,
        }).unwrap(); // 🟢 UNWRAP converts rejected payloads directly into throwable catch errors!

        setSuccessDetails({
          status: resultPayload?.data?.transaction?.status || "completed",
          amount: resultPayload?.data?.transfer?.amount,
          fee: resultPayload?.data?.transaction?.feeAmount || 0,
          reference: resultPayload?.data?.transfer?.reference,
          createdAt: resultPayload?.data?.transaction?.createdAt,
          isInternal: true,
        });
      } else {
        // 🚀 Hits /wallet/withdrawals
        resultPayload = await requestWithdrawal({
          assetSymbol: selectedAsset.symbol,
          amount: withdrawAmount,
          address: withdrawAddress,
          network: withdrawNetwork,
        }).unwrap(); // 🟢 Throws error to catch block if server validates anything incorrectly

        setSuccessDetails({
          status: resultPayload?.data?.status || "pending",
          amount: resultPayload?.data?.amount,
          fee: resultPayload?.data?.feeAssetAmount || 0,
          reference: resultPayload?.data?.id,
          createdAt: resultPayload?.data?.createdAt,
          isInternal: false,
        });
      }

      // Now safe to navigate to success panel since unwrap passed validation checks!
      setWorkflowMode("withdraw_success");
    } catch (error: any) {
      console.error("Transaction Error Details:", error);
      // 🟢 Dynamic fallback engine reads standard backend failure alerts accurately
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
              onTradePress={() => console.log("Navigating to market...")}
              onBalancePress={() => setWorkflowMode("portfolio_history")}
              onViewTransactions={() => setWorkflowMode("transaction_history")} // 🟢 Add this line here
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
                setWithdrawAddress(destination); // Stores address OR recipient data matching the string
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
              isLoading={isWithdrawalLoading || isTransferLoading} // 🟢 Fixes missing property error
              onGoBack={() => setWorkflowMode("withdraw_form")}
              onSubmitWithdrawal={(pin) => handleConfirmWithdrawal(pin)} // 🟢 Binds pin to endpoint query runner
            />
          )}

          {workflowMode === "withdraw_success" && selectedAsset && (
            <WithdrawalSuccessView
              asset={selectedAsset}
              details={successDetails} // 🟢 Pass down live server response metadata objects
              onViewTransaction={() => setWorkflowMode("transaction_history")}
            />
          )}

          {workflowMode === "transaction_history" && (
            <TransactionHistoryView
              transactions={transactions} // 🟢 Pass down the query array
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
