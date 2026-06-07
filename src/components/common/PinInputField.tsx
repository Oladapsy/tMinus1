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
        secureTextEntry={true}
        keyboardType="numeric"
        maxLength={4}
        selectionColor={Colors.green}
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
    fontSize: 15,
    fontFamily: FontFamily.bold,
    padding: 0, // Clears default Android text padding anomalies entirely
    width: "100%",
  },
});
