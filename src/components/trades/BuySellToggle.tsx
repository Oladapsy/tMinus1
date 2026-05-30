// src/components/trades/BuySellToggle.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  onBuyPress: () => void;
  onSellPress: () => void;
}

export default function BuySellToggle({ onBuyPress, onSellPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buyBtn} onPress={onBuyPress}>
        <Text style={styles.btnText}>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sellBtn} onPress={onSellPress}>
        <Text style={styles.btnText}>Sell</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  buyBtn: {
    flex: 1,
    backgroundColor: Colors.green,
    paddingVertical: 12,
    alignItems: "center",
  },
  sellBtn: {
    flex: 1,
    backgroundColor: Colors.red,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
});