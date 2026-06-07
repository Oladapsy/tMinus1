import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface PinInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function PinInputField({
  label,
  value,
  onChangeText,
  placeholder = "••••",
}: PinInputFieldProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.15)"
        secureTextEntry={true} // Masks input with dots automatically
        keyboardType="numeric" // Forces numeric keypad layout
        maxLength={4} // Limits entry to a standard 4-digit token code
        selectionColor={Colors.green} // Custom active tint cursor line match
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 18,
    width: "100%",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  input: {
    color: Colors.newWhite,
    fontSize: 24,
    fontFamily: FontFamily.bold,
    padding: 0, // Clears default Android text padding anomalies entirely
    width: "100%",
  },
});
