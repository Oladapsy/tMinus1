import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackHeader from "@/src/components/common/BackHeader";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TradeQuoteFormViewProps {
  initialMode: "Buy" | "Sell" | "Swap";
  onGoBack: () => void;
  onRequestQuote: (amount: string, targetAsset: string, currentMode: "Buy" | "Sell" | "Swap") => void;
}

export default function TradeQuoteFormView({
  initialMode,
  onGoBack,
  onRequestQuote,
}: TradeQuoteFormViewProps) {
  // 🌟 State handling to allow switchable, real-time tab rendering
  const [currentMode, setCurrentMode] = useState<"Buy" | "Sell" | "Swap">(initialMode);
  const [amount, setAmount] = useState("250.00");

  const isSwap = currentMode === "Swap";
  const isSell = currentMode === "Sell";

  // 🌟 Dynamic configurations to render unique content states per tab
  const config = {
    Buy: {
      title: "Buy Bitcoin",
      paragraph: "Create a quote before confirming with PIN.",
      payLabel: "You pay",
      payUnit: "USDT",
      receiveLabel: "You receive",
      receiveUnit: "BTC",
      receiveValue: "0.00388",
      availableText: "920.00 USDT",
      buttonColor: Colors.green,
      buttonText: "Get quote",
    },
    Sell: {
      title: "Sell Ethereum",
      paragraph: "Preview rate and fees before execution.",
      payLabel: "You sell",
      payUnit: "ETH",
      receiveLabel: "You receive",
      receiveUnit: "USDT",
      receiveValue: "1,540.80",
      availableText: "1.25 ETH",
      buttonColor: Colors.newRed, // Matches the red style action theme
      buttonText: "Get quote",
    },
    Swap: {
      title: "Swap assets",
      paragraph: "Convert one supported coin into another.",
      payLabel: "From",
      payUnit: "SOL",
      receiveLabel: "To",
      receiveUnit: "BTC",
      receiveValue: "0.01820",
      availableText: "8.00 SOL",
      buttonColor: Colors.green,
      buttonText: "Preview swap",
    },
  }[currentMode];

  return (
    <View style={styles.container}>
      <BackHeader
        title={config.title}
        paragraph={config.paragraph}
        onBack={onGoBack}
      />

      {/* 🌟 Tab Navigation Identifiers (Now Switchable!) */}
      <View style={styles.tabBar}>
        {(["Buy", "Sell", "Swap"] as const).map((t) => {
          const isSelected = currentMode === t;
          
          // Custom Pill Background Styling rules following the layout spec
          let activePillStyle = {};
          if (isSelected) {
            if (t === "Buy") activePillStyle = { backgroundColor: "rgba(94, 213, 168, 0.15)" };
            if (t === "Sell") activePillStyle = { backgroundColor: "rgba(235, 87, 87, 0.15)" };
            if (t === "Swap") activePillStyle = { backgroundColor: "rgba(94, 213, 168, 0.15)" };
          }

          return (
            <TouchableOpacity
              key={t}
              onPress={() => {
                setCurrentMode(t);
                // Adjust default mock asset placeholder amounts on switch if desired
                setAmount(t === "Sell" ? "0.50" : t === "Swap" ? "8.00" : "250.00");
              }}
              style={[
                styles.tabItem,
                isSelected && activePillStyle,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isSelected && styles.activeTabText,
                  isSelected && { color: t === "Sell" ? Colors.newRed : Colors.green }
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Input Blocks Group */}
      <View style={styles.formGroup}>
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>{config.payLabel}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={Colors.newSecondary}
            />
            <Text style={styles.assetUnit}>{config.payUnit}</Text>
          </View>
        </View>

        {/* Down Arrow separator icon only visible during swap operations */}
        {isSwap && (
          <View style={styles.arrowSpacer}>
            <Text style={styles.arrowIcon}>↓</Text>
          </View>
        )}

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>{config.receiveLabel}</Text>
          <View style={styles.inputRow}>
            <Text style={[styles.textInput, { color: Colors.newSecondary }]}>
              {config.receiveValue}
            </Text>
            <Text style={styles.assetUnit}>{config.receiveUnit}</Text>
          </View>
        </View>
      </View>

      {/* Information Meta Card Container */}
      <View style={styles.metaInfoCard}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Available</Text>
          <Text style={styles.metaValue}>{config.availableText}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>
            {isSwap ? "Route" : isSell ? "Fee estimate" : "Estimated rate"}
          </Text>
          <Text style={styles.metaValue}>
            {isSwap ? "SOL → USDT → BTC" : isSell ? "15.50 USDT" : "1 BTC = 64,200.50 USDT"}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>
            {isSwap ? "Quote expires" : isSell ? "Receive after fees" : "Verification limit"}
          </Text>
          <Text style={[styles.metaValue, !isSwap && !isSell && { color: Colors.green }]}>
            {isSwap ? "30 seconds" : isSell ? "1,540.80 USDT" : "$5,000"}
          </Text>
        </View>
      </View>

      {/* Action Execution Button */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: config.buttonColor }]}
        onPress={() => onRequestQuote(amount, config.receiveUnit, currentMode)}
      >
        <Text style={styles.actionButtonText}>{config.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    padding: 4,
    marginVertical: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  tabText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  activeTabText: { 
    fontFamily: FontFamily.bold 
  },
  formGroup: { 
    gap: 12, 
    marginBottom: 20 
  },
  inputCard: { 
    backgroundColor: Colors.newDark, 
    padding: 16, 
    borderRadius: 16 
  },
  inputLabel: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    color: Colors.newWhite,
    fontSize: 20,
    fontFamily: FontFamily.bold,
    padding: 0,
    flex: 1,
  },
  assetUnit: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  arrowSpacer: {
    alignItems: "center",
    marginVertical: -4,
  },
  arrowIcon: {
    color: Colors.newSecondary,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  metaInfoCard: {
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    gap: 12,
  },
  metaRow: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  metaLabel: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  metaValue: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 90,
    marginBottom: 24,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});