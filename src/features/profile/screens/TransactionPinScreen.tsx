import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PinInputField from "@/src/components/common/PinInputField";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router"; // 🌟 Use useRouter instance from route context hook
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
// 🌟 Hook up imports to bind data interactions to the network
import { useUpdatePinMutation } from "@/src/features/profile/api/profileApi";
import { useToast } from "@/src/context/ToastContext";

export default function TransactionPinScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  // Local state tracking parameters
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // 🌟 Initialize our updatePin mutation hook tracking states
  const [updatePin, { isLoading: isUpdating }] = useUpdatePinMutation();

  const handleUpdatePin = async () => {
    // 1. Basic length requirement guard validation checks
    if (
      currentPin.length !== 4 ||
      newPin.length !== 4 ||
      confirmPin.length !== 4
    ) {
      showToast?.("All PIN fields must be exactly 4 digits long.", "error");
      return;
    }

    // 2. Matching confirmation validation constraint
    if (newPin !== confirmPin) {
      showToast?.("Your new PIN and confirmation PIN do not match.", "error");
      return;
    }

    // 3. Prevent trivial identical sequential assignments check
    if (currentPin === newPin) {
      showToast?.(
        "Your new PIN must be different from your current PIN.",
        "error",
      );
      return;
    }

    try {
      // 🚀 Fire network mutation tracking responses cleanly
      await updatePin({
        currentPin,
        newPin,
      }).unwrap();

      showToast?.("Transaction PIN successfully updated!", "success");
      router.back();
    } catch (err: any) {
      const errMsg =
        err?.data?.message || "Failed to alter transaction security settings.";
      showToast?.(errMsg, "error");
    }
  };

  // Dynamically control disabled button layout state context when input forms are incomplete
  const isFormIncomplete =
    currentPin.length < 4 || newPin.length < 4 || confirmPin.length < 4;

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. TOP SECTION: Header Info */}
          <View style={styles.pageTitle}>
            <BackHeader
              title="Transaction PIN"
              paragraph="Update the PIN used for trade and withdrawal confirmations."
              onBack={() => router.back()}
            />
          </View>

          {/* 2. MIDDLE REGION: Live Functional Input Cards Group */}
          <View style={styles.inputGroup}>
            <PinInputField
              label="Current PIN"
              value={currentPin}
              onChangeText={setCurrentPin}
            />
            <PinInputField
              label="New PIN"
              value={newPin}
              onChangeText={setNewPin}
              placeholder="Enter 4 digits"
            />
            <PinInputField
              label="Confirm PIN"
              value={confirmPin}
              onChangeText={setConfirmPin}
            />
          </View>

          {/* 3. INFORMATION SECTION: PIN Rules Text */}
          <View style={styles.rulesContainer}>
            <Title
              text="PIN rules"
              size={13}
              color={Colors.newWhite}
              fontFamily={FontFamily.bold}
            />
            <View style={styles.rulesDescMargin}>
              <Paragraph
                text="Use four digits. Avoid repeated or obvious numbers in production apps."
                color={Colors.newSecondary}
                size={12.5}
                lineHeight={18}
                textAlign="left"
              />
            </View>
          </View>

          {/* 4. FOOTER SECTION: Action Trigger Button */}
          <View style={styles.footerSection}>
            {isUpdating ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color={Colors.green} />
              </View>
            ) : (
              <PrimaryButton
                text="Update PIN"
                Bgcolor={isFormIncomplete ? Colors.newDark : Colors.green}
                textColor={
                  isFormIncomplete ? Colors.secondary : Colors.newBlack
                }
                fontSize={13}
                style={{ fontFamily: FontFamily.bold }}
                onPress={handleUpdatePin}
                disabled={isFormIncomplete}
              />
            )}
          </View>
        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    marginTop: 14,
    marginBottom: 28,
  },
  inputGroup: {
    width: "100%",
    gap: 16,
  },
  rulesContainer: {
    width: "100%",
    marginTop: 36,
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 22,
  },
  rulesDescMargin: {
    width: "100%",
    marginTop: 6,
  },
  footerSection: {
    width: "100%",
    marginTop: 100,
  },
  loaderContainer: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
