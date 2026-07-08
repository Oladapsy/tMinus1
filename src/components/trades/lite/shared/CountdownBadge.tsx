import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";

type Props = {
  secondsLeft: number;
  isExpired: boolean;
};

export default function CountdownBadge({ secondsLeft, isExpired }: Props) {
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: isExpired ? Colors.thinRed : Colors.newGreen },
      ]}
    >
      <Text
        style={[styles.label, { color: isExpired ? Colors.red : Colors.green }]}
      >
        {isExpired ? "Expired" : "Expires in"}
      </Text>
      {!isExpired && (
        <Text style={[styles.time, { color: Colors.green }]}>
          {mm}:{ss}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  label: { fontSize: 14, fontWeight: "500" },
  time: { fontSize: 20, fontWeight: "700" },
});
