// src/components/trades/TradePanel.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput,
         StyleSheet, ScrollView } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  mode: "buy" | "sell";
  onClose: () => void;
}

const ORDER_TYPES = ["Limit", "Market", "Stop Limit"];
const PERCENTAGES = ["25%", "50%", "75%", "100%"];

export default function TradePanel({ mode, onClose }: Props) {
  const [orderType, setOrderType] = useState("Market");
  const [price, setPrice] = useState("38418.49");
  const [quantity, setQuantity] = useState("38418.49");
  const [selectedPct, setSelectedPct] = useState("25%");

  const isBuy = mode === "buy";
  const accentColor = isBuy ? Colors.green : Colors.red;

  return (
    <View style={styles.container}>
      {/* Drag handle */}
      <TouchableOpacity onPress={onClose} style={styles.handleWrapper}>
        <View style={styles.handle} />
      </TouchableOpacity>

      {/* Available balance */}
      <View style={styles.availableRow}>
        <Text style={styles.availableText}>
          AVAILABLE: <Text style={styles.availableValue}>15.234164400 BUSD</Text>
        </Text>
        <TouchableOpacity style={styles.plusBtn}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Limit / Market / Stop Limit */}
      <View style={styles.orderTypeTabs}>
        {ORDER_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setOrderType(type)}
            style={[styles.orderTab, orderType === type && styles.orderTabActive]}
          >
            <Text style={[
              styles.orderTabText,
              orderType === type && styles.orderTabTextActive
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price input */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholderTextColor={Colors.primary}
        />
        <View style={styles.inputButtons}>
          <TouchableOpacity onPress={() => setPrice(String(parseFloat(price) + 1))}>
            <Text style={styles.inputBtn}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPrice(String(parseFloat(price) - 1))}>
            <Text style={styles.inputBtn}>−</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quantity input */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor={Colors.primary}
        />
        <View style={styles.inputButtons}>
          <TouchableOpacity onPress={() => setQuantity(String(parseFloat(quantity) + 1))}>
            <Text style={styles.inputBtn}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setQuantity(String(parseFloat(quantity) - 1))}>
            <Text style={styles.inputBtn}>−</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Percentage selector */}
      <View style={styles.pctRow}>
        {PERCENTAGES.map((pct) => (
          <TouchableOpacity
            key={pct}
            onPress={() => setSelectedPct(pct)}
            style={[styles.pctBtn, selectedPct === pct && { borderColor: accentColor }]}
          >
            <Text style={[
              styles.pctText,
              selectedPct === pct && { color: accentColor }
            ]}>
              {pct}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL:</Text>
        <Text style={styles.totalValue}>25.234164400</Text>
      </View>

      {/* Buy / Sell button */}
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: accentColor }]}>
        <Text style={styles.actionBtnText}>{isBuy ? "Buy" : "Sell"}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  handleWrapper: {
    alignItems: "center",
    paddingVertical: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  availableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  availableText: {
    color: Colors.primary,
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
  availableValue: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
  },
  plusBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: { color: Colors.green, fontSize: 16 },
  orderTypeTabs: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 16,
  },
  orderTab: { paddingBottom: 6 },
  orderTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  orderTabText: {
    color: Colors.primary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  orderTabTextActive: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  inputLabel: {
    color: Colors.primary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    width: 70,
  },
  input: {
    flex: 1,
    color: Colors.primary,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    textAlign: "center",
  },
  inputButtons: { flexDirection: "row", gap: 12 },
  inputBtn: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: FontFamily.regular,
  },
  pctRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  pctBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  pctText: {
    color: Colors.primary,
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginBottom: 20,
  },
  totalLabel: {
    color: Colors.primary,
    fontFamily: FontFamily.regular,
    fontSize: 13,
  },
  totalValue: {
    color: Colors.primary,
    fontFamily: FontFamily.medium,
    fontSize: 13,
  },
  actionBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  actionBtnText: {
    color: "white",
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
});