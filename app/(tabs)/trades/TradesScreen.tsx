import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router"; // 🟢 For picking up deep links

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import { Colors } from "@/src/constants/colors";

// Component imports...
import TradeDashboardView from "@/src/components/trades/lite/TradeDashboardView";
import TradeQuoteFormView from "@/src/components/trades/lite/TradeQuoteFormView";
import TradeQuotePreviewView from "@/src/components/trades/lite/TradeQuotePreviewView";
import TradeExecutionOverlay from "@/src/components/trades/lite/TradeExecutionOverlay";
import TradeResultReceiptView from "@/src/components/trades/lite/TradeResultReceiptView";

type TradeWorkflowMode =
  | "dashboard"
  | "quote_form"
  | "quote_preview"
  | "execution_pin"
  | "receipt";

export default function TradesScreen() {
  const currentKycStatus = "APPROVED";

  // 🟢 Extract routing params (e.g. from Market Details or Order Book)
  const params = useLocalSearchParams<{ action?: string; symbol?: string }>();

  const [workflowMode, setWorkflowMode] =
    useState<TradeWorkflowMode>("dashboard");
  const [activeAction, setActiveAction] = useState<
    "Buy" | "Sell" | "Swap" | null
  >(null);
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>("BTC"); // Track focused asset
  const [receiptStatus, setReceiptStatus] = useState<
    "success" | "failed" | "expired"
  >("success");

  // 🟢 Effect to catch external navigation requests from the Market screen
  useEffect(() => {
    if (params?.action) {
      const formattedAction =
        params.action.charAt(0).toUpperCase() +
        params.action.slice(1).toLowerCase();
      if (
        formattedAction === "Buy" ||
        formattedAction === "Sell" ||
        formattedAction === "Swap"
      ) {
        setActiveAction(formattedAction);
        if (params.symbol) {
          setSelectedAssetSymbol(params.symbol.toUpperCase());
        }
        setWorkflowMode("quote_form");
      }
    }
  }, [params]);

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
                onGoBack={() => setWorkflowMode("dashboard")}
                onRequestQuote={(amount, asset, updatedMode) => {
                  setActiveAction(updatedMode);
                  setWorkflowMode("quote_preview");
                }}
              />
            )}

            {/* ⏱️ Quote Preview Countdown Verification Window */}
            {workflowMode === "quote_preview" && (
              <TradeQuotePreviewView
                onGoBack={() => setWorkflowMode("quote_form")}
                onConfirm={() => setWorkflowMode("execution_pin")}
                onQuoteExpired={() => {
                  setReceiptStatus("expired");
                  setWorkflowMode("receipt");
                }}
              />
            )}

            {/* 🔒 Secure Transaction PIN Overlay */}
            {workflowMode === "execution_pin" && (
              <TradeExecutionOverlay
                onGoBack={() => setWorkflowMode("quote_preview")}
                onFinalize={(status) => {
                  setReceiptStatus(status);
                  setWorkflowMode("receipt");
                }}
              />
            )}

            {/* 🎉 Unified Result State Receipt Screen */}
            {workflowMode === "receipt" && (
              <TradeResultReceiptView
                status={receiptStatus}
                onPrimaryPress={() => {
                  if (receiptStatus === "failed") {
                    setWorkflowMode("quote_form");
                  } else {
                    setWorkflowMode("dashboard");
                  }
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
