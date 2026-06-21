import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import { Colors } from "@/src/constants/colors";

//new modular trade layout views
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
  // KYC State - Grabbed from Redux/Context later
  const currentKycStatus = "APPROVED";

  // Flow Engine Workflow Management States
  const [workflowMode, setWorkflowMode] =
    useState<TradeWorkflowMode>("dashboard");
  const [activeAction, setActiveAction] = useState<
    "Buy" | "Sell" | "Swap" | null
  >(null);
  const [receiptStatus, setReceiptStatus] = useState<
    "success" | "failed" | "expired"
  >("success");

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

            {/* 📝 Quote Input Form Panel (Buy / Sell / Swap Layouts) */}
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

            {/* 🔒 Secure Transaction PIN Overlay & Simulator Hub */}
            {workflowMode === "execution_pin" && (
              <TradeExecutionOverlay
                onGoBack={() => setWorkflowMode("quote_preview")}
                onFinalize={(status) => {
                  setReceiptStatus(status);
                  setWorkflowMode("receipt");
                }}
              />
            )}

            {/* 🎉 Unified Result State Receipt Screen (Success / Fail / Expired) */}
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
