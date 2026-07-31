import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDisable2FaMutation } from "@/src/features/auth/api/authApi";
import EyeIcon from "@/assets/icons/wallet/eye-slash.svg";
import EyeOpenIcon from "@/assets/icons/wallet/eye-open.svg";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import BackHeader from "@/src/features/shared/components/BackHeader";
import PrimaryButton from "@/src/features/shared/components/PrimaryButton";

export default function DisableTwoFactorScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [disable2Fa, { isLoading }] = useDisable2FaMutation();

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUsingRecovery, setIsUsingRecovery] = useState(false);

  const handleDisable2FA = async () => {
    if (!password || !code) return;

    try {
      // Build request payload matching DisableTwoFaRequest schema
      const payload = isUsingRecovery
        ? { password, recoveryCode: code }
        : { password, code };

      await disable2Fa(payload).unwrap();
      showToast?.("Two-factor authentication disabled safely.", "success");

      // Pop back to the main security layout settings list
      router.back();
    } catch (error: any) {
      showToast?.(
        error?.data?.message ||
          "Failed to disable 2FA. Please check your entries.",
        "error",
      );
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <BackHeader
          title="Disable 2FA"
          paragraph="Enter your security credentials below to turn off authenticator protection."
          onBack={() => router.back()}
        />

        {/* Input Forms Stack */}
        <View style={styles.formContainer}>
          {/* Account Password Field */}
          <Text style={styles.inputLabel}>Account Password</Text>
          <View style={styles.passwordInputRow}>
            <TextInput
              style={styles.flexInput}
              placeholder="Enter your password"
              placeholderTextColor={Colors.newSecondary}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOpenIcon
                  color={Colors.newSecondary}
                  width={20}
                  height={20}
                />
              ) : (
                <EyeIcon color={Colors.newSecondary} width={20} height={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* Authenticator Challenge Input Field */}
          <Text style={styles.inputLabel}>
            {isUsingRecovery ? "Backup Recovery Code" : "Authenticator Code"}
          </Text>
          <TextInput
            style={styles.standardInput}
            placeholder={isUsingRecovery ? "XXXXX-XXXXX" : "••••••"}
            placeholderTextColor={Colors.newSecondary}
            keyboardType={isUsingRecovery ? "default" : "numeric"}
            maxLength={isUsingRecovery ? 11 : 6}
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            editable={!isLoading}
          />

          {/* Inline Toggle Mode Link */}
          <TouchableOpacity
            style={styles.modeToggleWrapper}
            onPress={() => {
              setCode("");
              setIsUsingRecovery(!isUsingRecovery);
            }}
          >
            <Text style={styles.modeToggleText}>
              {isUsingRecovery
                ? "Use standard authenticator pin instead"
                : "Lost access? Use a backup recovery code"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Button Blocks */}
        <View style={styles.footerSection}>
          <PrimaryButton
            text={isLoading ? "Disabling..." : "Disable 2FA"}
            Bgcolor={
              password && code ? Colors.red || "#FF3333" : Colors.newDark
            }
            textColor={password && code ? Colors.newWhite : Colors.newSecondary}
            fontSize={13}
            style={{ fontFamily: FontFamily.bold }}
            onPress={handleDisable2FA}
            disabled={!password || !code || isLoading}
          />
        </View>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  formContainer: { marginTop: 30, gap: 10 },
  inputLabel: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
    marginTop: 12,
    marginBottom: 4,
  },
  passwordInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
  },
  flexInput: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontFamily: FontFamily.regular,
    height: "100%",
  },
  standardInput: {
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
    color: "white",
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  modeToggleWrapper: { marginTop: 8, alignSelf: "flex-start" },
  modeToggleText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    textDecorationLine: "underline",
  },
  footerSection: { marginTop: "auto" },
});
