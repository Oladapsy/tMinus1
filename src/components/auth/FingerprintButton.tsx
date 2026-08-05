import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store"; // 🌟 Imported secure encryption store
import FingerPrintIcon from "@/assets/icons/auth/Fingerprint.svg";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { getBiometricStatus } from "@/src/utils/biometrics";
import { useToast } from "@/src/context/ToastContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/src/store/authSlice";

const FingerprintButton = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch(); // 🌟 Now actively used!

  const handleFingerPrint = async () => {
    try {
      // 1. Check if biometrics are toggled ON in security settings
      const isConfigured = await getBiometricStatus();
      if (!isConfigured) {
        Alert.alert(
          "Biometrics Not Enabled",
          "Please log in with your password first and turn on Biometric Login from your Security Settings screen."
        );
        return;
      }

      // 2. Fetch the encrypted session data
      const savedSessionStr = await SecureStore.getItemAsync("user_session");
      if (!savedSessionStr) {
        Alert.alert(
          "Session Expired",
          "Please log in with your password once to establish a secure biometric key link."
        );
        return;
      }

      // 3. Fire up the native hardware scanner prompt
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan your fingerprint or face to sign in",
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Parse the secure tokens back into an object
        const sessionData = JSON.parse(savedSessionStr);
        
        // 🌟 THE FIX: Commit credentials to Redux to trigger your root layout redirect!
        dispatch(setCredentials(sessionData));
        
        showToast?.("Welcome back!", "success");
      }
    } catch (error) {
      showToast?.("Biometric authentication failed.", "error");
      console.log("Fingerprint auth error:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleFingerPrint}>
      <FingerPrintIcon color={Colors.green} width={40} height={40} />
      <Text style={styles.text}>Use fingerprint instead? OTA update</Text>
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