// src/utils/biometrics.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const BIOMETRIC_KEY = "user_biometrics_enabled";

export const getBiometricStatus = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(BIOMETRIC_KEY);
  return value === "true";
};

export const setBiometricStatus = async (enabled: boolean): Promise<void> => {
  await AsyncStorage.setItem(BIOMETRIC_KEY, enabled ? "true" : "false");
};