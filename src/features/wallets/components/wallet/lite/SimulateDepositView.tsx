import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ItemAndAddress from "../../common/ItemAndAdress";
import Paragraph from "../../common/Paragraph";
import Title from "../../common/Title";

// 🟢 Hook directly into your official API slice module mutation generator
import { useSimulateDepositMutation } from "@/src/features/wallets/api/walletApi";

interface SelectedAssetPayload {
  id: string;
  name: string;
  symbol: string;
  network: string;
  depositAddress: string;
}

interface SimulateDepositViewProps {
  asset: SelectedAssetPayload;
  onGoBack: () => void;
  onCreateDeposit: () => void;
}

export default function SimulateDepositView({
  asset,
  onGoBack,
  onCreateDeposit,
}: SimulateDepositViewProps) {
  // 🟢 Bind the precise mutation execution trigger from your endpoint schema
  const [triggerSimulation, { isLoading }] = useSimulateDepositMutation();

  // Dynamic sandbox values matching your chosen asset configuration profiles
  const simulationAmount = asset.symbol === "BTC" ? "0.005" : "250.00";

 const handleCreateDeposit = async () => {
    try {
      await triggerSimulation({
        amount: parseFloat(simulationAmount),
        settlementDelaySeconds: 10,
      }).unwrap();

      onCreateDeposit();
    } catch (error: any) {
      console.log("Sandbox simulation failed:", error);

      // 🟢 Dig deep into the API payload structure to extract the exact error text
      const errorMessage = 
        error?.data?.error?.message || 
        error?.data?.message || 
        "Failed to trigger sandbox balance credit.";

      Alert.alert(
        "Simulation Error",
        `${errorMessage} (Status: ${error?.status || 'Unknown'})`
      );
    }
  };
  return (
    <View style={styles.container}>
      <BackHeader
        title="Simulate deposit"
        paragraph="Create a pending deposit for testing polling and receipts."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ItemAndAddress
          title="Asset"
          address={`${asset.name} (${asset.symbol})`}
        />
        <ItemAndAddress title="Amount" address={simulationAmount} />
        <ItemAndAddress title="Settlement delay" address="10 seconds" />

        <View style={styles.previewContainer}>
          <Title text="Deposit preview" size={15} />

          <View style={{ marginTop: 10 }}>
            <Title
              text={`+${simulationAmount} ${asset.symbol}`}
              color={Colors.green}
              size={23}
            />
          </View>

          <View style={{ marginTop: 4 }}>
            <Paragraph
              text="Status starts as pending, then completes automatically."
              textAlign="left"
              size={12}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={Colors.green}
              style={{ paddingVertical: 12 }}
            />
          ) : (
            <PrimaryButton
              text="Create sandbox deposit"
              fontSize={13.5}
              fontFamily={FontFamily.medium}
              onPress={handleCreateDeposit}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40, alignItems: "center" },
  previewContainer: {
    backgroundColor: Colors.newDark,
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 12,
    alignItems: "flex-start",
  },
  buttonWrapper: { width: "100%", marginTop: 40 },
});
