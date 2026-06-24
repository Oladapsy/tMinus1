import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PinInputField from "@/src/components/common/PinInputField"; // Import your new functional field!
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { router } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

export default function TransactionPinScreen() {
  // Local state tracking parameters
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleUpdatePin = () => {
    console.log("Submitting secure values:", {
      currentPin,
      newPin,
      confirmPin,
    });
    // validation check logics or submit handling functions here!
  };

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
        >
          {/* 1. TOP SECTION: Header Info */}
          <View style={styles.pageTitle}>
            <BackHeader
              title="Transaction PIN"
              paragraph="Update the PIN used for trade and withdrawal confirmations."
              onBack={()=>{router.back()}}
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
              placeholder="Enter 4 digits" // Optional
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
            <PrimaryButton
              text="Update PIN"
              Bgcolor={Colors.green}
              textColor={Colors.newBlack}
              fontSize={13}
              style={{ fontFamily: FontFamily.bold }}
              onPress={handleUpdatePin}
            />
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
    marginTop: 150,
  },
});
