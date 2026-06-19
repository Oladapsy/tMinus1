import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BackHeader from "@/src/components/common/BackHeader";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TradeQuotePreviewViewProps {
  onGoBack: () => void;
  onConfirm: () => void;
  onQuoteExpired: () => void;
}

export default function TradeQuotePreviewView({ onGoBack, onConfirm, onQuoteExpired }: TradeQuotePreviewViewProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      onQuoteExpired();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <BackHeader 
        title="Quote preview" 
        paragraph="Confirm the rate before this quote expires." 
        onBack={onGoBack} 
      />

      {/* Countdown Bar */}
      <View style={styles.countdownCard}>
        <Text style={styles.countdownLabel}>Expires in</Text>
        <Text style={styles.countdownTimer}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
      </View>

      {/* Execution Matrix List Wrapper */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>From</Text>
          <Text style={styles.summaryValue}>250.00 USDT</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>To</Text>
          <Text style={styles.summaryValue}>0.00388 BTC</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Rate</Text>
          <Text style={styles.summaryValue}>1 BTC = 64,200.50 USDT</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Fee</Text>
          <Text style={styles.summaryValue}>2.50 USDT</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)", paddingTop: 12 }]}>
          <Text style={styles.summaryLabel}>Estimated receive</Text>
          <Text style={[styles.summaryValue, { color: Colors.green }]}>0.00384 BTC</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
        <Text style={styles.confirmButtonText}>Confirm with PIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  countdownCard: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgba(94, 213, 168, 0.1)", padding: 16, borderRadius: 12, marginTop: 16, alignItems: "center" },
  countdownLabel: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  countdownTimer: { color: Colors.green, fontSize: 16, fontFamily: FontFamily.bold },
  summaryCard: { backgroundColor: Colors.newDark, borderRadius: 24, padding: 20, marginTop: 20, gap: 12 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  summaryValue: { color: Colors.newWhite, fontSize: 14, fontFamily: FontFamily.bold },
  confirmButton: { backgroundColor: Colors.green, paddingVertical: 16, borderRadius: 16, alignItems: "center", marginTop: "auto", marginBottom: 24 },
  confirmButtonText: { color: Colors.primary, fontSize: 16, fontFamily: FontFamily.bold }
});