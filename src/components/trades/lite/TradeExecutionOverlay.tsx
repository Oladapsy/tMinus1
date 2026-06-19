import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BackHeader from "@/src/components/common/BackHeader";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TradeExecutionOverlayProps {
  onGoBack: () => void;
  onFinalize: (status: "success" | "failed" | "expired") => void;
}

export default function TradeExecutionOverlay({ onGoBack, onFinalize }: TradeExecutionOverlayProps) {
  const [pin, setPin] = useState(["", "", "", ""]);

  return (
    <View style={styles.container}>
      <BackHeader title="Confirm trade" paragraph="Enter your transaction PIN to execute this quote." onBack={onGoBack} />

      <View style={styles.quoteDetailBox}>
        <Text style={styles.quoteTitle}>Buy BTC</Text>
        <Text style={styles.quoteSub}>250.00 USDT → 0.00384 BTC</Text>
        <Text style={styles.quoteFee}>Fee: 2.50 USDT</Text>
      </View>

      {/* Secure PIN Dots Render Frame */}
      <View style={styles.pinContainer}>
        {pin.map((_, i) => (
          <View key={i} style={styles.pinDot} />
        ))}
      </View>

      {/* Simulator Control Sandbox Interface */}
      <View style={styles.sandboxPanel}>
        <Text style={styles.sandboxTitle}>Sandbox Controls</Text>
        <TouchableOpacity style={[styles.sbBtn, { backgroundColor: Colors.green }]} onPress={() => onFinalize("success")}>
          <Text style={styles.sbBtnText}>Simulate Success Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sbBtn, { backgroundColor: Colors.newRed }]} onPress={() => onFinalize("failed")}>
          <Text style={styles.sbBtnText}>Simulate Balance Failure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sbBtn, { backgroundColor: Colors.newCryptoYellow }]} onPress={() => onFinalize("expired")}>
          <Text style={styles.sbBtnText}>Simulate Expired Quote Frame</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  quoteDetailBox: { backgroundColor: Colors.newDark, borderRadius: 16, padding: 20, marginTop: 16, alignItems: "center" },
  quoteTitle: { color: Colors.newWhite, fontSize: 18, fontFamily: FontFamily.bold },
  quoteSub: { color: Colors.newSecondary, fontSize: 14, fontFamily: FontFamily.medium, marginTop: 4 },
  quoteFee: { color: Colors.newSecondary, fontSize: 12, fontFamily: FontFamily.medium, marginTop: 2 },
  pinContainer: { flexDirection: "row", gap: 16, justifyContent: "center", marginVertical: 40 },
  pinDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.newWhite },
  sandboxPanel: { gap: 10, marginTop: "auto", marginBottom: 24 },
  sandboxTitle: { color: Colors.newSecondary, fontSize: 12, fontFamily: FontFamily.bold, textAlign: "center", marginBottom: 4 },
  sbBtn: { paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  sbBtnText: { color: Colors.primary, fontSize: 14, fontFamily: FontFamily.bold }
});