import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TradeResultReceiptViewProps {
  status: "success" | "failed" | "expired";
  onPrimaryPress: () => void;
}

export default function TradeResultReceiptView({ status, onPrimaryPress }: TradeResultReceiptViewProps) {
  
  const content = {
    success: {
      title: "Trade completed",
      sub: "Your sandbox trade has settled successfully.",
      badge: "✓",
      badgeBg: Colors.green,
      mainValue: "0.00384 BTC received",
      showLedger: true,
      btnLabel: "View transaction",
    },
    failed: {
      title: "Trade failed",
      sub: "The trade could not be completed.",
      badge: "✕",
      badgeBg: Colors.newRed,
      mainValue: "Insufficient balance",
      showLedger: false,
      btnLabel: "Edit amount",
    },
    expired: {
      title: "Quote expired",
      sub: "Rates moved. Request a fresh quote before trading.",
      badge: "!",
      badgeBg: Colors.newCryptoYellow,
      mainValue: "This quote is no longer valid",
      showLedger: false,
      btnLabel: "Get new quote",
    }
  }[status];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title text={content.title} size={26} textAlign="center" />
        <Paragraph text={content.sub} color={Colors.newSecondary} size={14} textAlign="center" />
      </View>

      <View style={styles.statusSection}>
        <View style={[styles.badgeCircle, { backgroundColor: content.badgeBg }]}>
          <Text style={styles.badgeText}>{content.badge}</Text>
        </View>
        <Text style={styles.mainValueText}>{content.mainValue}</Text>
      </View>

      {content.showLedger && (
        <View style={styles.ledgerCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Reference</Text>
            <Text style={styles.value}>CRT-BUY-1770</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid</Text>
            <Text style={styles.value}>250.00 USDT</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Received</Text>
            <Text style={styles.value}>0.00384 BTC</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fee</Text>
            <Text style={styles.value}>2.50 USDT</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, { color: Colors.green }]}>Completed</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.primaryBtn} onPress={onPrimaryPress}>
        <Text style={styles.primaryBtnText}>{content.btnLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
  header: { marginBottom: 32 },
  statusSection: { alignItems: "center", gap: 16, marginBottom: 32 },
  badgeCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center" },
  badgeText: { color: Colors.primary, fontSize: 24, fontFamily: FontFamily.bold },
  mainValueText: { color: Colors.newWhite, fontSize: 22, fontFamily: FontFamily.bold, textAlign: "center" },
  ledgerCard: { backgroundColor: Colors.newDark, borderRadius: 24, padding: 20, gap: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  value: { color: Colors.newWhite, fontSize: 13, fontFamily: FontFamily.bold },
  primaryBtn: { backgroundColor: Colors.green, paddingVertical: 16, borderRadius: 16, alignItems: "center", marginTop: "auto", marginBottom: 24 },
  primaryBtnText: { color: Colors.primary, fontSize: 16, fontFamily: FontFamily.bold }
});