import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface KycFormInputProps extends TextInputProps {
  error?: string; // Captures validation errors sent down by react-hook-form
}

export default function KycFormInput({
  error,
  style,
  ...props
}: KycFormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <TextInput
        autoCapitalize="words" // <-- Place default settings here
        placeholderTextColor={Colors.newSecondary || "#64748B"}
        {...props} // <-- Any prop you pass explicitly (like characters) will now override the default!
        style={[
          styles.inputField,
          style,
          error ? styles.inputFieldError : null,
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 10,
    width: "100%",
  },
  inputField: {
    backgroundColor: Colors.newDark || "#161C24",
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: Colors.newWhite || "white",
    fontSize: 14,
    fontFamily: FontFamily.regular,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  inputFieldError: {
    borderColor: Colors.newRed || "#EF4444",
    borderWidth: 1.2,
  },
  errorText: {
    color: Colors.newRed || "#EF4444",
    fontSize: 11,
    fontFamily: FontFamily.regular,
    marginTop: 4,
    marginLeft: 4,
  },
});
