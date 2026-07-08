import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import NewWalletScreen from "@/src/screens/wallet/NewWalletScreen";
import OldWalletScreen from "@/src/screens/wallet/OldWalletScreen";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { useGetProfileQuery } from "@/src/services/profileApi";
import { useGetWalletQuery } from "@/src/services/walletApi";
import { useLocalSearchParams } from "expo-router";

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED";

const MainWalletScreen = () => {
  // 🟢 Read both the legacy shortcut parameters AND your new trade success route fields
  const { action, initialWorkflow, initialTxReference } = useLocalSearchParams<{
    action?: string;
    initialWorkflow?: string;
    initialTxReference?: string;
  }>();

  const { data: userResponse, isLoading: isProfileLoading } =
    useGetProfileQuery();
  const { data: walletResponse, isLoading: isWalletLoading } =
    useGetWalletQuery();

  const oldScreen = false;

  if (isProfileLoading || isWalletLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  const currentKycStatus = (userResponse?.data?.kycStatus?.toUpperCase() ||
    "NOT_STARTED") as KycStatus;

  // 🟢 Compute the primary starting workflow layout dynamically
  let startingWorkflow = "dashboard";
  if (initialWorkflow) {
    startingWorkflow = initialWorkflow;
  } else if (action === "open_deposit") {
    startingWorkflow = "deposit_selector";
  }

  return (
    <View style={styles.container}>
      <KycGateGuard status={currentKycStatus} gateType="wallets">
        {oldScreen && <OldWalletScreen />}

        {oldScreen === false && (
          <NewWalletScreen
            walletData={walletResponse?.data}
            initialWorkflow={startingWorkflow}
            initialTxReference={initialTxReference} // 🟢 Pass the reference ID string down to activate the details view instantly
          />
        )}
      </KycGateGuard>
    </View>
  );
};

export default MainWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.newDark || "#121824",
  },
});
