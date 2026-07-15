import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "@/src/components/common/BackHeader";

interface ExpiredQuoteStateProps {
  quoteId: string;
  previousReceive: string;
  onActionRefresh: () => void;
}

export default function ExpiredQuoteState({
  quoteId,
  previousReceive,
  onActionRefresh,
}: ExpiredQuoteStateProps) {
  return (
    <View style={styles.pane}>
      <BackHeader
        title="Quote expired"
        paragraph="Rates moved. Request a fresh quote before trading."
        onBack={onActionRefresh}
      />

      {/* EXPIRED ALERT BOX PANEL */}
      <View style={styles.warningCardBox}>
        <View style={styles.warningIconCircle}>
          <Text style={styles.warningCharacter}>!</Text>
        </View>
        <Text style={styles.warningHeadlineText}>
          This quote is no longer valid
        </Text>
        <Text style={styles.warningParagraphBody}>
          Get a new quote so the rate, fee, and receive amount are current.
        </Text>
      </View>

      {/* EXPIRED AUDIT HISTORIC FIELDS */}
      <View style={styles.tableBlock}>
        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Expired quote</Text>
          <Text style={styles.rowValue}>{quoteId}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Previous receive</Text>
          <Text style={styles.rowValue}>{previousReceive}</Text>
        </View>
      </View>

      {/* REFRESH SUBMISSION BUTTON GAP CONTROL */}
      <View style={styles.bottomSpacerContainer}>
        <TouchableOpacity
          style={styles.refreshActionButton}
          onPress={onActionRefresh}
        >
          <Text style={styles.refreshButtonText}>Get new quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pane: { flex: 1, paddingHorizontal: 24 },
  warningCardBox: {
    backgroundColor: Colors.newDark || "#121824",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginVertical: 24,
  },
  warningIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(230, 150, 30, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  warningCharacter: {
    color: Colors.newCryptoYellow,
    fontSize: 28,
    fontWeight: "bold",
  },
  warningHeadlineText: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginBottom: 8,
  },
  warningParagraphBody: {
    color: Colors.newSecondary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    lineHeight: 20,
  },

  tableBlock: { gap: 12 },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark,
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
  }, // 👈 Shared clearance logic to prevent structural collisions
  refreshActionButton: {
    backgroundColor: Colors.newCryptoYellow,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  refreshButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
