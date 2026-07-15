import React, { useState } from "react";
import { ScrollView, StyleSheet, View, TextInput, Text, ActivityIndicator, Alert } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ItemAndAddress from "../../common/ItemAndAdress";

import { AssetData } from "@/src/screens/wallet/NewWalletScreen";

interface WithdrawConfirmationViewProps {
  asset: AssetData;
  amount: number;
  address: string;
  network: string;
  withdrawalType: "external" | "internal";
  isLoading: boolean; // 🟢 Pass down processing state from parent screen
  onGoBack: () => void;
  onSubmitWithdrawal: (pin: string) => void; // 🟢 Sends PIN string up to master query executor
}

export default function WithdrawConfirmationView({
  asset,
  amount,
  address,
  network,
  withdrawalType,
  isLoading,
  onGoBack,
  onSubmitWithdrawal,
}: WithdrawConfirmationViewProps) {
  const [pin, setPin] = useState("");

  const fee = withdrawalType === "external" ? amount * 0.005 : 0;
  const deliveryAmount = Math.max(0, amount - fee);

  const truncatedAddress = address.length > 14 
    ? `${address.slice(0, 8)}...${address.slice(-6)}` 
    : address;

  const handleSubmit = () => {
    if (pin.length < 4) {
      Alert.alert("Security PIN Required", "Please enter your complete 4-digit transaction PIN.");
      return;
    }
    onSubmitWithdrawal(pin);
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title={withdrawalType === "external" ? "Confirm Withdrawal" : "Confirm Transfer"}
        paragraph="Ensure all receipt metrics match completely."
        onBack={onGoBack}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.reviewCard}>
          <View style={styles.amountHeader}>
            <Title text={`${amount} ${asset.symbol}`} size={28} fontFamily={FontFamily.bold} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Transfer Asset" color={Colors.newSecondary} size={14} />
            <Title text={`${asset.name} (${asset.symbol})`} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={styles.row}>
            <Paragraph text={withdrawalType === "external" ? "Settlement Network" : "Transfer Route"} color={Colors.newSecondary} size={14} />
            <Title text={network} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={styles.row}>
            <Paragraph text={withdrawalType === "external" ? "Target Crypto Address" : "Recipient Value"} color={Colors.newSecondary} size={14} />
            <Title text={truncatedAddress} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={styles.row}>
            <Paragraph text="Processing Fee" color={Colors.newSecondary} size={14} />
            <Title text={`${fee} ${asset.symbol}`} size={14} fontFamily={FontFamily.medium} />
          </View>

          <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Paragraph text="Net Disbursed Value" color={Colors.newSecondary} size={14} />
            <Title text={`${deliveryAmount} ${asset.symbol}`} size={14} fontFamily={FontFamily.medium} />
          </View>
        </View>

        <View style={styles.pinFormInputWrapper}>
          <Text style={styles.pinLabel}>Enter 4-Digit Security PIN</Text>
          <TextInput
            style={styles.pinInputStyle}
            placeholder="••••"
            placeholderTextColor={Colors.newSecondary}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            value={pin}
            editable={!isLoading}
            onChangeText={setPin}
          />
        </View>

        <View style={styles.buttonWrapper}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.green} style={{ paddingVertical: 12 }} />
          ) : (
            <PrimaryButton
              text={withdrawalType === "external" ? "Submit External Request" : "Execute Instant Transfer"}
              fontSize={14}
              fontFamily={FontFamily.medium}
              onPress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40, alignItems: "center", width: "100%" },
  reviewCard: {
    backgroundColor: Colors.newDark,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "stretch",
  },
  amountHeader: { alignItems: "center", marginBottom: 28, marginTop: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
  pinFormInputWrapper: {
    backgroundColor: Colors.newDark,
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: "center"
  },
  pinLabel: {
    color: Colors.newSecondary,
    fontSize: 10,
    fontFamily: FontFamily.medium,
    textTransform: "uppercase",
    marginBottom: 6
  },
  pinInputStyle: {
    color: Colors.newWhite,
    fontSize: 22,
    fontFamily: FontFamily.bold,
    textAlign: "center",
    letterSpacing: 8,
    width: "50%",
    paddingVertical: 4
  },
  buttonWrapper: { width: "100%", marginTop: 32 },
});