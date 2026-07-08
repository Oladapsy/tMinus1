import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import { Colors } from "@/src/constants/colors";

// Component imports...
import TradeDashboardView from "@/src/components/trades/lite/TradeDashboardView";
import TradeQuoteFormView from "@/src/components/trades/lite/TradeQuoteFormView";

type TradeWorkflowMode =
  | "dashboard"
  | "quote_form"
  | "quote_preview"
  | "execution_pin"
  | "receipt";

export default function TradesScreen() {
  const currentKycStatus = "APPROVED";

  // 🟢 Extract routing params (e.g. from Market Details or Order Book)

  const [workflowMode, setWorkflowMode] =
    useState<TradeWorkflowMode>("dashboard");
  const [activeAction, setActiveAction] = useState<
    "Buy" | "Sell" | "Swap" | null
  >(null);

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
