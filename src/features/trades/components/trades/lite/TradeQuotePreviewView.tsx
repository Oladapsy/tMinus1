import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { useGetQuoteDetailsQuery } from "@/src/features/trades/api/tradeApi";
import CountdownBadge from "./shared/CountdownBadge";
import QuoteSummaryRow from "./shared/QuoteSummaryRow";

type Props = {
  quoteId: string;
  onConfirm: () => void;
  onRequote: () => void;
  onGoBack: () => void;
};

export default function TradeQuotePreviewView({
  quoteId,
  onConfirm,
  onRequote,
  onGoBack,
}: Props) {
  const { data, isLoading } = useGetQuoteDetailsQuery(quoteId, {
    pollingInterval: 1000,
  });

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (data?.data) setSecondsLeft(data.data.expiresInSeconds);
  }, [data]);

  if (isLoading || !data?.data) return null;

  const quote = data.data;
  const isExpired = quote.isExpired || secondsLeft <= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isExpired ? "Quote expired" : "Quote preview"}
      </Text>
      <Text style={styles.subtitle}>
        {isExpired
          ? "Rates moved. Request a fresh quote before trading."
          : "Confirm the rate before this quote expires."}
      </Text>

      {!isExpired && (
        <CountdownBadge secondsLeft={secondsLeft} isExpired={isExpired} />
      )}

      <View style={styles.card}>
        <QuoteSummaryRow
          label="From"
          value={`${quote.fromAmount} ${quote.fromAsset}`}
        />
        <QuoteSummaryRow
          label="To"
          value={`${quote.toAmount} ${quote.toAsset}`}
        />
        <QuoteSummaryRow
          label="Rate"
          value={`1 ${quote.fromAsset} = ${quote.rate} ${quote.toAsset}`}
        />
        <QuoteSummaryRow
          label="Fee"
          value={`${quote.feeAmount} ${quote.toAsset}`}
        />
        {isExpired && (
          <QuoteSummaryRow
            label="Previous receive"
            value={`${quote.toAmount} ${quote.toAsset}`}
          />
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.cta,
          {
            backgroundColor: isExpired ? Colors.newBrightYellow : Colors.green,
          },
        ]}
        onPress={isExpired ? onRequote : onConfirm}
      >
        <Text style={styles.ctaText}>
          {isExpired ? "Get new quote" : "Confirm with PIN"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.newDark },
  title: { fontSize: 22, fontWeight: "700", color: Colors.newWhite },
  subtitle: {
    fontSize: 13,
    color: Colors.newSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.newTertiary,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  cta: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: { color: Colors.darkText, fontWeight: "700", fontSize: 15 },
});
