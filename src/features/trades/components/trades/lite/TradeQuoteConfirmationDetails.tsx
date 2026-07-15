import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ActiveQuotePreview from "./chunks/ActiveQuotePreview";
import ExpiredQuoteState from "./chunks/ExpiredQuoteState";
import ConfirmTradePinView from "./chunks/ConfirmTradePinView";
import TradeFailedView from "./chunks/TradeFailedView";
import TradeSuccessReceiptView from "./chunks/TradeSuccessReceiptView"; 
import { useExecuteTradeMutation } from "@/src/features/trades/api/tradeApi";

interface TradeQuoteConfirmationDetailsProps {
  quoteId: string;
  amount: string;
  targetAsset: string;
  tradeMode: "Buy" | "Sell" | "Swap";
  onGoBack: () => void;
  onRefreshQuote: () => void;
  onViewTransaction: (referenceId: string) => void; // 🟢 1. Added a dedicated callback for viewing transactions
}

type SubWorkflow = "preview" | "pin_entry" | "failure" | "receipt";

export default function TradeQuoteConfirmationDetails({
  quoteId,
  amount,
  targetAsset,
  tradeMode,
  onGoBack,
  onRefreshQuote,
  onViewTransaction, // 🟢 2. Destructure the callback
}: TradeQuoteConfirmationDetailsProps) {
  const [subMode, setSubMode] = useState<SubWorkflow>("preview");
  const [isExpired, setIsExpired] = useState(false);

  const [failureData, setFailureData] = useState<{
    title: string;
    message: string;
    required?: string;
    available?: string;
  } | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  const [executeTrade, { isLoading: isExecuting }] = useExecuteTradeMutation();

  const [expiryTimestamp] = useState(() => Date.now() + 30000);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (subMode !== "preview") return;

    const interval = setInterval(() => {
      const secondsRemaining = Math.max(
        0,
        Math.round((expiryTimestamp - Date.now()) / 1000),
      );
      setTimeLeft(secondsRemaining);

      if (secondsRemaining <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp, subMode]);

  const quoteDetails = {
    id: quoteId || "quote_abc123",
    fromAmount: `${Number(amount).toFixed(2)} USDT`,
    toAmount: `0.00388 ${targetAsset}`,
    rate: `1 ${targetAsset} = 64,200.50 USDT`,
    fee: "2.50 USDT",
    estimatedReceive: `0.00384 ${targetAsset}`,
  };

  const handleExecuteTradeWithPin = async (pinCode: string) => {
    try {
      const res = await executeTrade({
        body: {
          quoteId: quoteDetails.id,
          pin: pinCode,
        },
        idempotencyKey: `trade-exec-${quoteDetails.id}-${Date.now()}`,
      }).unwrap();

      const tx = res?.data?.transaction;

      setSuccessData({
        reference: tx?.reference || tx?.id || "CRT-BUY-1779",
        paid: quoteDetails.fromAmount,
        received: tx
          ? `${tx.toAmount} ${tx.toAsset}`
          : quoteDetails.estimatedReceive,
        fee: tx ? `${tx.feeAmount} ${tx.fromAsset}` : quoteDetails.fee,
      });

      setSubMode("receipt");
    } catch (err: any) {
      console.log("Execution failure raw object error data:", err);
      const serverMessage = err?.data?.message || err?.message || "";

      if (serverMessage.toLowerCase().includes("pin") || err?.status === 403) {
        setFailureData({
          title: "Invalid Security PIN",
          message: "The transaction PIN code entered is incorrect. Please double check credentials.",
        });
      } else if (
        serverMessage.toLowerCase().includes("balance") ||
        serverMessage.toLowerCase().includes("insufficient")
      ) {
        setFailureData({
          title: "Insufficient balance",
          message: "Your available balance changed before the quote could be executed safely.",
          required: quoteDetails.fromAmount,
          available: err?.data?.availableAmount || "124.00 USDT",
        });
      } else {
        setFailureData({
          title: "Trade failed",
          message: serverMessage || "An unexpected clearing error occurred during settlement.",
        });
      }

      setSubMode("failure");
    }
  };

  if (isExpired && subMode === "preview") {
    return (
      <ExpiredQuoteState
        quoteId={quoteDetails.id}
        previousReceive={quoteDetails.toAmount}
        onActionRefresh={onRefreshQuote}
      />
    );
  }

  return (
    <View style={styles.masterContainer}>
      {subMode === "preview" && (
        <ActiveQuotePreview
          timeLeft={timeLeft}
          details={quoteDetails}
          onBack={onGoBack}
          onProceedToPin={() => setSubMode("pin_entry")}
        />
      )}

      {subMode === "pin_entry" && (
        <ConfirmTradePinView
          tradeMode={tradeMode}
          targetAsset={targetAsset}
          details={quoteDetails}
          onBack={() => setSubMode("preview")}
          onSubmitPin={handleExecuteTradeWithPin}
          isLoading={isExecuting}
        />
      )}

      {subMode === "failure" && failureData && (
        <TradeFailedView
          title={failureData.title}
          message={failureData.message}
          required={failureData.required}
          available={failureData.available}
          onEditAmount={onRefreshQuote}
          onRetryPin={() => setSubMode("pin_entry")}
        />
      )}

      {subMode === "receipt" && successData && (
        <TradeSuccessReceiptView
          details={successData}
          // 🟢 3. Instead of running onRefreshQuote, pass your transaction router handler up!
          onClose={() => onViewTransaction(successData.reference)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: { flex: 1 },
});