import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "@/src/components/common/BackHeader";

interface TradeFailedViewProps {
  title: string;
  message: string;
  required?: string;
  available?: string;
  onEditAmount: () => void;
  onRetryPin: () => void;
}

export default function TradeFailedView({
  title,
  message,
  required,
  available,
  onEditAmount,
  onRetryPin,
}: TradeFailedViewProps) {
  const isPinError = title.toLowerCase().includes("pin");

  return (
    <View style={styles.pane}>
      <BackHeader
        title="Trade failed"
        paragraph="The trade could not be completed."
        onBack={isPinError ? onRetryPin : onEditAmount}
      />

      <View style={styles.warningCardBox}>
        <View style={styles.warningIconCircle}>
          <Text style={styles.warningCharacter}>×</Text>
        </View>
        <Text style={styles.warningHeadlineText}>{title}</Text>
        <Text style={styles.warningParagraphBody}>{message}</Text>
      </View>

      {/* 📊 Only show financial audit rows if it's an asset balance error */}
      {!isPinError && (required || available) && (
        <View style={styles.tableBlock}>
          {required && (
            <View style={styles.tableRow}>
              <Text style={styles.rowLabel}>Required</Text>
              <Text style={styles.rowValue}>{required}</Text>
            </View>
          )}

          {available && (
            <View style={styles.tableRow}>
              <Text style={styles.rowLabel}>Available</Text>
              <Text
                style={[styles.rowValue, { color: Colors.newRed || "#E54040" }]}
              >
                {available}
              </Text>
            </View>
          )}

          <View style={styles.tableRow}>
            <Text style={styles.rowLabel}>Status</Text>
            <Text
              style={[styles.rowValue, { color: Colors.newRed || "#E54040" }]}
            >
              Failed
            </Text>
          </View>
        </View>
      )}

      <View style={styles.bottomSpacerContainer}>
        <TouchableOpacity
          style={[
            styles.failActionButton,
            isPinError && { backgroundColor: Colors.green },
          ]}
          onPress={isPinError ? onRetryPin : onEditAmount}
        >
          <Text
            style={[
              styles.failButtonText,
              isPinError && { color: Colors.primary },
            ]}
          >
            {isPinError ? "Re-enter PIN" : "Edit amount"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pane: { flex: 1, paddingHorizontal: 24 },
  warningCardBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginVertical: 24,
  },
  warningIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(229, 64, 64, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  warningCharacter: {
    color: Colors.newRed,
    fontSize: 36,
    fontWeight: "bold",
  },
  warningHeadlineText: {
    color: Colors.newWhite,
    fontSize: 20,
    fontFamily: FontFamily.bold,
    marginBottom: 8,
  },
  warningParagraphBody: {
    color: Colors.newSecondary,
    fontSize: 13,
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
  },
  failActionButton: {
    backgroundColor: Colors.newRed,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  failButtonText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
