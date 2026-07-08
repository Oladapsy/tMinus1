import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import { Colors } from "@/src/constants/colors";

// Component imports...
import TradeDashboardView from "@/src/components/trades/lite/TradeDashboardView";
import TradeQuoteFormView from "@/src/components/trades/lite/TradeQuoteFormView";
import TradeQuoteConfirmationDetails from "@/src/components/trades/lite/TradeQuoteConfirmationDetails";
import { useRouter } from "expo-router";

type TradeWorkflowMode =
  | "dashboard"
  | "quote_form"
  | "quote_preview"
  | "execution_pin"
  | "receipt";

export default function TradesScreen() {
  const currentKycStatus = "APPROVED";
  const router = useRouter();

  const [workflowMode, setWorkflowMode] =
    useState<TradeWorkflowMode>("dashboard");
  const [activeAction, setActiveAction] = useState<
    "Buy" | "Sell" | "Swap" | null
  >(null);

  // 🟢 Shared data parameters feeding the layout chunk previews
  const [currentQuoteId, setCurrentQuoteId] = useState<string>("");
  const [tradeAmount, setTradeAmount] = useState<string>("0");
  const [targetAssetSymbol, setTargetAssetSymbol] = useState<string>("BTC");

  return (
    <KycGateGuard status={currentKycStatus} gateType="trades">
      <GestureHandlerRootView style={styles.rootWrapper}>
        <ImageBackground
          source={require("@/assets/images/kyc/kycBg.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <MySafeAreaView
            style={styles.safeArea}
            edges={["top", "bottom", "left", "right"]}
          >
            {/* 📊 Main Landing Spot Ticker & Action Grid */}
            {workflowMode === "dashboard" && (
              <TradeDashboardView
                onSelectAction={(action) => {
                  setActiveAction(action);
                  setWorkflowMode("quote_form");
                }}
              />
            )}

            {/* 📝 Quote Input Form Panel */}
            {workflowMode === "quote_form" && activeAction && (
              <TradeQuoteFormView
                initialMode={activeAction}
                initialSymbol={targetAssetSymbol}
                onGoBack={() => setWorkflowMode("dashboard")}
                onRequestQuote={(amount, asset, updatedMode, quoteId) => {
                  setTradeAmount(amount);
                  setTargetAssetSymbol(asset);
                  setActiveAction(updatedMode);
                  setCurrentQuoteId(quoteId);
                  setWorkflowMode("quote_preview");
                }}
              />
            )}

            {/* ⏱️ Quote Preview & Expiry Window Panel */}
            {workflowMode === "quote_preview" && activeAction && (
              <TradeQuoteConfirmationDetails
                quoteId={currentQuoteId}
                amount={tradeAmount}
                targetAsset={targetAssetSymbol}
                tradeMode={activeAction}
                onGoBack={() => setWorkflowMode("quote_form")}
                onRefreshQuote={() => setWorkflowMode("quote_form")}
                // 🚀 This links up perfectly with the "View transaction" receipt click!
                onViewTransaction={(txId) => {
                  // 1. Silently revert the trade tab to form state for when they come back later
                  setWorkflowMode("quote_form");

                  // 2. Teleport them directly over to the Wallet Activity breakdown tab!
                  router.push({
                    pathname: "/(tabs)/wallets/MainWalletScreen" as any,
                    params: {
                      initialWorkflow: "transaction_history",
                      initialTxReference: txId,
                    },
                  });
                }}
              />
            )}
          </MySafeAreaView>
        </ImageBackground>
      </GestureHandlerRootView>
    </KycGateGuard>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
