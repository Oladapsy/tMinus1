import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import FingerPrintIcon from "@/assets/icons/auth/Fingerprint.svg";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

const FingerprintButton = () => {
  // this will be used in the future to add fingerprint authentication to the app.
  // For now, it's just a placeholder button.
  const handleFingerPrint = () => {
    console.log("Fingerprint button pressed");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleFingerPrint}>
      <FingerPrintIcon color={Colors.green} width={40} height={40} />
      <Text style={styles.text}>Use fingerprint instead?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  text: {
    color: Colors.lightGray,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginTop: 5,
  },
});

export default FingerprintButton;
