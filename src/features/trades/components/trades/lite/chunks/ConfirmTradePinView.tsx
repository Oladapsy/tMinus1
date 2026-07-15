import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "@/src/components/common/BackHeader";

interface ConfirmTradePinViewProps {
  tradeMode: string;
  targetAsset: string;
  details: any;
  onBack: () => void;
  onSubmitPin: (pin: string) => void;
  isLoading: boolean;
}

export default function ConfirmTradePinView({
  tradeMode,
  targetAsset,
  details,
  onBack,
  onSubmitPin,
  isLoading,
}: ConfirmTradePinViewProps) {
  const [pin, setPin] = useState("");

  const handleKeyPress = (val: string) => {
    if (isLoading) return;
    if (pin.length < 4) {
      setPin((prev) => prev + val);
    }
  };

  const handleBackspace = () => {
    if (isLoading) return;
    setPin((prev) => prev.slice(0, -1));
  };

  const handleExecutePress = () => {
    if (pin.length === 4 && !isLoading) {
      onSubmitPin(pin);
    }
  };

  return (
    <View style={styles.pane}>
      <BackHeader
        title="Confirm trade"
        paragraph="Enter your transaction PIN to execute this quote."
        onBack={onBack}
      />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          {tradeMode} {targetAsset}
        </Text>
        <Text style={styles.summaryRoute}>
          {details.fromAmount} ➔ {details.estimatedReceive}
        </Text>
        <Text style={styles.summaryFee}>Fee {details.fee}</Text>
      </View>

      <Text style={styles.sectionHeader}>Transaction PIN</Text>

      {/* PIN INDICATOR DOTS */}
      <View style={styles.pinIndicatorRow}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[styles.pinDot, index < pin.length && styles.pinDotActive]}
          />
        ))}
      </View>

      {/* 🔢 FUNCTIONAL VIRTUAL KEYPAD LAYER */}
      <View style={styles.keypadContainer}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
        ].map((row, rIdx) => (
          <View key={rIdx} style={styles.keypadRow}>
            {row.map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.keyButton}
                onPress={() => handleKeyPress(num)}
              >
                <Text style={styles.keyText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.keypadRow}>
          <View style={styles.keyButton} />
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("0")}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyButton} onPress={handleBackspace}>
            <Text style={[styles.keyText, { color: Colors.newRed }]}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacerContainer}>
        <TouchableOpacity
          style={[
            styles.primaryActionButton,
            pin.length !== 4 && styles.disabledButton,
          ]}
          onPress={handleExecutePress}
          disabled={pin.length !== 4 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <Text style={styles.buttonText}>Execute trade</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pane: { flex: 1, paddingHorizontal: 24 },
  summaryCard: {
    backgroundColor: Colors.newDark || "#121824",
    borderRadius: 24,
    padding: 24,
    marginTop: 16,
  },
  summaryTitle: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginBottom: 8,
  },
  summaryRoute: {
    color: Colors.newSecondary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginBottom: 4,
  },
  summaryFee: { color: Colors.newSecondary, fontSize: 12 },
  sectionHeader: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },

  pinIndicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  pinDot: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  pinDotActive: {
    backgroundColor: Colors.newWhite,
    borderWidth: 12,
    borderColor: "rgba(255,255,255,0.1)",
  },

  keypadContainer: {
    gap: 10,
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
  },
  keypadRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  keyButton: {
    flex: 1,
    height: 54,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    color: Colors.newWhite,
    fontSize: 20,
    fontFamily: FontFamily.bold,
  },

  bottomSpacerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 80,
  },
  primaryActionButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "rgba(10, 180, 100, 0.3)" },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
