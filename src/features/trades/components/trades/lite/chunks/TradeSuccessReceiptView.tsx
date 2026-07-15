import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TradeSuccessReceiptViewProps {
  details: {
    reference: string;
    paid: string;
    received: string;
    fee: string;
  };
  onClose: () => void;
}

export default function TradeSuccessReceiptView({
  details,
  onClose,
}: TradeSuccessReceiptViewProps) {
  return (
    <View style={styles.pane}>
      <Text style={styles.mainHeaderTitle}>Trade completed</Text>
      <Text style={styles.subHeaderParagraph}>
        Your sandbox trade has settled successfully.
      </Text>

      {/* SUCCESS CHECK CIRCLE ICON BADGE */}
      <View style={styles.receiptCentralCard}>
        <View style={styles.successIconCircle}>
          <Text style={styles.checkMarkCharacter}>✓</Text>
        </View>
        <Text style={styles.payoutHighlightText}>
          {details.received} received
        </Text>
      </View>

      {/* METRIC RECEIPT TABLE FIELDS */}
      <View style={styles.tableBlock}>
        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Reference</Text>
          <Text style={styles.rowValue}>{details.reference}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Paid</Text>
          <Text style={styles.rowValue}>{details.paid}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Received</Text>
          <Text style={styles.rowValue}>{details.received}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Fee</Text>
          <Text style={styles.rowValue}>{details.fee}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Status</Text>
          <Text style={[styles.rowValue, { color: Colors.green }]}>
            Completed
          </Text>
        </View>
      </View>

      <View style={styles.bottomSpacerContainer}>
        <TouchableOpacity style={styles.receiptActionButton} onPress={onClose}>
          <Text style={styles.receiptButtonText}>View transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pane: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
  mainHeaderTitle: {
    color: Colors.newWhite,
    fontSize: 26,
    fontFamily: FontFamily.bold,
    marginBottom: 6,
  },
  subHeaderParagraph: {
    color: Colors.newSecondary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginBottom: 24,
  },

  receiptCentralCard: { alignItems: "center", marginVertical: 16 },
  successIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(10, 180, 100, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  checkMarkCharacter: { color: Colors.green, fontSize: 38, fontWeight: "bold" },
  payoutHighlightText: {
    color: Colors.newWhite,
    fontSize: 24,
    fontFamily: FontFamily.bold,
    marginBottom: 12,
  },

  tableBlock: { gap: 10 },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark || "#121824",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  rowLabel: {
    color: Colors.newSecondary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  rowValue: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },

  bottomSpacerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 80,
  },
  receiptActionButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  receiptButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
