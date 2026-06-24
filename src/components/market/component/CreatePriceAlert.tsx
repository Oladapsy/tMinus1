import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../../common/BackHeader";

interface CreatePriceAlertProps {
  symbol: string;
  currentPrice: number;
  onGoBack: () => void;
  onAlertCreated: (payload: { symbol: string; direction: "Above" | "Below"; targetPrice: string }) => void;
}

export default function CreatePriceAlert({ symbol, currentPrice, onGoBack, onAlertCreated }: CreatePriceAlertProps) {
  const [direction, setDirection] = useState<"Above" | "Below">("Above");
  const [targetPrice, setTargetPrice] = useState("72,000");

  const handleCreate = () => {
    onAlertCreated({
      symbol,
      direction,
      targetPrice: targetPrice.replace(/,/g, ""),
    });
  };

  const formattedSummaryPrice = isNaN(Number(targetPrice.replace(/,/g, ""))) 
    ? targetPrice 
    : Number(targetPrice.replace(/,/g, "")).toLocaleString();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <BackHeader
          title="Create price alert"
          paragraph={`Get notified when ${symbol} crosses your target.`}
          onBack={onGoBack}
        />

        {/* Mini Asset Row Preview Box */}
        <View style={styles.assetPreviewCard}>
          <View style={styles.leftRow}>
            <View style={styles.avatarCircle} />
            <View>
              <Text style={styles.symbolText}>{symbol}</Text>
              <Text style={styles.nameText}>Bitcoin</Text>
            </View>
          </View>
          <Text style={styles.currentPriceText}>
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Direction Select Pills Toggle Bar */}
        <View style={styles.pillRow}>
          <TouchableOpacity
            style={[styles.pillButton, direction === "Above" && styles.activePill]}
            onPress={() => setDirection("Above")}
          >
            <Text style={[styles.pillText, direction === "Above" && styles.activePillText]}>Above</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pillButton, direction === "Below" && styles.activePill]}
            onPress={() => setDirection("Below")}
          >
            <Text style={[styles.pillText, direction === "Below" && styles.activePillText]}>Below</Text>
          </TouchableOpacity>
        </View>

        {/* Large Styled Target Price Input Section */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Target price</Text>
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.hugeInput}
              value={targetPrice}
              onChangeText={setTargetPrice}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.2)"
            />
            <Text style={styles.currencyLabel}>USD</Text>
          </View>
        </View>

        {/* Meta Info Informational Rows */}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Trigger</Text>
          <Text style={styles.metaValue}>{symbol} {direction.toLowerCase()} ${formattedSummaryPrice}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Status</Text>
          <Text style={[styles.metaValue, { color: Colors.green }]}>Active after creation</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.actionButton} onPress={handleCreate}>
        <Text style={styles.actionButtonText}>Create alert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 110 },
  assetPreviewCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  leftRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E28A16" },
  symbolText: { color: Colors.newWhite, fontSize: 18, fontFamily: FontFamily.bold },
  nameText: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium, marginTop: 2 },
  currentPriceText: { color: Colors.newWhite, fontSize: 16, fontFamily: FontFamily.bold },
  pillRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  pillButton: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.05)" },
  activePill: { backgroundColor: Colors.green },
  pillText: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  activePillText: { color: Colors.primary, fontFamily: FontFamily.bold },
  inputBox: { backgroundColor: Colors.newDark, borderRadius: 16, padding: 20, marginBottom: 16 },
  inputLabel: { color: Colors.newSecondary, fontSize: 12, fontFamily: FontFamily.medium },
  fieldContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 8 },
  hugeInput: { color: Colors.newWhite, fontSize: 28, fontFamily: FontFamily.bold, flex: 1, padding: 0 },
  currencyLabel: { color: Colors.newSecondary, fontSize: 14, fontFamily: FontFamily.bold },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 10,
  },
  metaLabel: { color: Colors.newSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  metaValue: { color: Colors.newWhite, fontSize: 13, fontFamily: FontFamily.bold },
  actionButton: { position: "absolute", bottom: 24, left: 24, right: 24, backgroundColor: Colors.green, paddingVertical: 16, borderRadius: 16, alignItems: "center" },
  actionButtonText: { color: Colors.primary, fontSize: 15, fontFamily: FontFamily.bold },
});