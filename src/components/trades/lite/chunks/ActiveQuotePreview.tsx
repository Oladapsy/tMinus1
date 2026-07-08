import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "@/src/components/common/BackHeader";

interface ActiveQuotePreviewProps {
  timeLeft: number;
  details: {
    fromAmount: string;
    toAmount: string;
    rate: string;
    fee: string;
    estimatedReceive: string;
  };
  onBack: () => void;
}

export default function ActiveQuotePreview({
  timeLeft,
  details,
  onBack,
}: ActiveQuotePreviewProps) {
  // Pad countdown parameters correctly (e.g., "00:24")
  const formatTimerString = (seconds: number) => {
    const displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return `00:${displaySecs}`;
  };

  const handleConfirmWithPin = () => {
    console.log(
      "Trigger Pin verification popup modal row logic context here...",
    );
  };

  return (
    <View style={styles.pane}>
      <BackHeader
        title="Quote preview"
        paragraph="Confirm the rate before this quote expires."
        onBack={onBack}
      />

      {/* COUNTDOWN COMPONENT BLOCK */}
      <View style={styles.timerBadgeBox}>
        <Text style={styles.timerLabel}>Expires in</Text>
        <Text style={styles.timerClockText}>{formatTimerString(timeLeft)}</Text>
      </View>

      {/* METRIC INFORMATION TABLE */}
      <View style={styles.tableBlock}>
        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>From</Text>
          <Text style={styles.rowValue}>{details.fromAmount}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>To</Text>
          <Text style={styles.rowValue}>{details.toAmount}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Rate</Text>
          <Text style={styles.rowValue}>{details.rate}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Fee</Text>
          <Text style={styles.rowValue}>{details.fee}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.rowLabel}>Estimated receive</Text>
          <Text style={[styles.rowValue, { color: Colors.green }]}>
            {details.estimatedReceive}
          </Text>
        </View>
      </View>

      {/* ACTION CLEARANCE GAP PADDING ZONE PROTECTS OVERLAY WITH THE EXPO BOTTOM NAVIGATION TAB BAR */}
      <View style={styles.bottomSpacerContainer}>
        <TouchableOpacity
          style={styles.primaryActionButton}
          onPress={handleConfirmWithPin}
        >
          <Text style={styles.buttonText}>Confirm with PIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pane: { flex: 1, paddingHorizontal: 24 },
  timerBadgeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(10, 80, 50, 0.4)",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "rgba(10, 180, 100, 0.2)",
  },
  timerLabel: {
    color: Colors.newSecondary || "#8E94A1",
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  timerClockText: {
    color: Colors.green,
    fontSize: 24,
    fontFamily: FontFamily.bold,
  },

  tableBlock: { gap: 12 },
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
    color: Colors.newSecondary || "#8E94A1",
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
  }, // 👈 Safe clearance offset
  primaryActionButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
