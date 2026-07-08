import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ActiveQuotePreview from "./chunks/ActiveQuotePreview";
import ExpiredQuoteState from "./chunks/ExpiredQuoteState";

interface TradeQuoteConfirmationDetailsProps {
  quoteId: string;
  amount: string;
  targetAsset: string;
  tradeMode: "Buy" | "Sell" | "Swap";
  onGoBack: () => void;
  onRefreshQuote: () => void;
}

export default function TradeQuoteConfirmationDetails({
  quoteId,
  amount,
  targetAsset,
  tradeMode,
  onGoBack,
  onRefreshQuote,
}: TradeQuoteConfirmationDetailsProps) {
  const [isExpired, setIsExpired] = useState(false);

  // ⏱️ Global Epoch Sync: Set an absolute expiration timestamp (e.g., 30 seconds from now) 
  // This guarantees that if the user backs out and returns, the timer remains accurate.
  const [expiryTimestamp] = useState(() => Date.now() + 30000);

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsRemaining = Math.max(0, Math.round((expiryTimestamp - Date.now()) / 1000));
      setTimeLeft(secondsRemaining);

      if (secondsRemaining <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp]);

  // Mocked details matching your screen specifications. Replace with active quote response values as needed.
  const quoteDetails = {
    id: quoteId || "quote_abc123",
    fromAmount: `${Number(amount).toFixed(2)} USDT`,
    toAmount: `0.00388 ${targetAsset}`,
    rate: `1 ${targetAsset} = 64,200.50 USDT`,
    fee: "2.50 USDT",
    estimatedReceive: `0.00384 ${targetAsset}`,
  };

  return (
    <View style={styles.masterContainer}>
      {!isExpired ? (
        <ActiveQuotePreview
          timeLeft={timeLeft}
          details={quoteDetails}
          onBack={onGoBack}
        />
      ) : (
        <ExpiredQuoteState
          quoteId={quoteDetails.id}
          previousReceive={quoteDetails.toAmount}
          onActionRefresh={onRefreshQuote}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: { flex: 1 },
});