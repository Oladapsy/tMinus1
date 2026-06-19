import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackHeader from "@/src/components/common/BackHeader";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TradeQuoteFormViewProps {
  mode: "Buy" | "Sell" | "Swap";
  onGoBack: () => void;
  onRequestQuote: (amount: string, targetAsset: string) => void;
}

export default function TradeQuoteFormView({ mode, onGoBack, onRequestQuote }: TradeQuoteFormViewProps) {
  const [amount, setAmount] = useState("250.00");

  const isSwap = mode === "Swap";

  return (
    <View style={styles.container}>
      <BackHeader 
        title={isSwap ? "Swap assets" : `${mode} Bitcoin`}
        paragraph={isSwap ? "Convert one supported coin into another." : "Create a quote before confirming with PIN."}
        onBack={onGoBack}
      />

      {/* Tab Navigation Identifiers */}
      <View style={styles.tabBar}>
        {["Buy", "Sell", "Swap"].map((t) => (
          <View key={t} style={[styles.tabItem, mode === t && styles.activeTabItem]}>
            <Text style={[styles.tabText, mode === t && styles.activeTabText]}>{t}</Text>
          </View>
        ))}
      </View>

      {/* Input Blocks Group */}
      <View style={styles.formGroup}>
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>{isSwap ? "From" : "You pay"}</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={styles.textInput} 
              value={amount} 
              onChangeText={setAmount} 
              keyboardType="numeric"
            />
            <Text style={styles.assetUnit}>{isSwap ? "SOL" : "USDT"}</Text>
          </View>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>{isSwap ? "To" : "You receive"}</Text>
          <View style={styles.inputRow}>
            <Text style={[styles.textInput, { color: Colors.newSecondary }]}>
              {isSwap ? "0.01820" : "0.00388"}
            </Text>
            <Text style={styles.assetUnit}>BTC</Text>
          </View>
        </View>
      </View>

      {/* Information Meta Card Container */}
      <View style={styles.metaInfoCard}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Available</Text>
          <Text style={styles.metaValue}>{isSwap ? "1.25 ETH" : "920.00 USDT"}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Estimated rate</Text>
          <Text style={styles.metaValue}>1 BTC = 64,200.50 USDT</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Verification limit</Text>
          <Text style={[styles.metaValue, { color: Colors.green }]}>$5,000</Text>
        </View>
      </View>

      {/* Action Execution Button */}
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={() => onRequestQuote(amount, "BTC")}
      >
        <Text style={styles.actionButtonText}>
          {isSwap ? "Preview swap" : "Get quote"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  tabBar: { flexDirection: "row", backgroundColor: Colors.newDark, borderRadius: 12, padding: 4, marginVertical: 16 },
  tabItem: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 8 },
  activeTabItem: { backgroundColor: "rgba(255,255,255,0.05)" },
  tabText: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  activeTabText: { color: Colors.newWhite, fontFamily: FontFamily.bold },
  formGroup: { gap: 12, marginBottom: 20 },
  inputCard: { backgroundColor: Colors.newDark, padding: 16, borderRadius: 16 },
  inputLabel: { color: Colors.newSecondary, fontSize: 12, fontFamily: FontFamily.medium, marginBottom: 6 },
  inputRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  textInput: { color: Colors.newWhite, fontSize: 20, fontFamily: FontFamily.bold, padding: 0, flex: 1 },
  assetUnit: { color: Colors.newWhite, fontSize: 14, fontFamily: FontFamily.bold },
  metaInfoCard: { backgroundColor: "transparent", paddingHorizontal: 4, gap: 12 },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  metaLabel: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  metaValue: { color: Colors.newWhite, fontSize: 13, fontFamily: FontFamily.bold },
  actionButton: { backgroundColor: Colors.green, paddingVertical: 16, borderRadius: 16, alignItems: "center", marginTop: "auto", marginBottom: 24 },
  actionButtonText: { color: Colors.primary, fontSize: 16, fontFamily: FontFamily.bold }
});