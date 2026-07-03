import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import NewWalletScreen from "@/src/screens/wallet/NewWalletScreen";
import OldWalletScreen from "@/src/screens/wallet/OldWalletScreen";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { useGetProfileQuery } from "@/src/services/profileApi"; 
import { useGetWalletQuery } from "@/src/services/walletApi";
import { useLocalSearchParams } from "expo-router"; // 🟢 1. Import the params hook

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED";

const MainWalletScreen = () => {
  // 🟢 2. Read the search parameters coming from the Home navigation trigger
  const { action } = useLocalSearchParams<{ action?: string }>();

  const { data: userResponse, isLoading: isProfileLoading } = useGetProfileQuery();
  const { data: walletResponse, isLoading: isWalletLoading } = useGetWalletQuery();

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

  return (
    <View style={styles.container}>
      <KycGateGuard status={currentKycStatus} gateType="wallets">
        {oldScreen && <OldWalletScreen />}

        {oldScreen === false && (
          /* 🟢 3. Pass the action straight into NewWalletScreen as an initial configuration */
          <NewWalletScreen 
            walletData={walletResponse?.data} 
            initialWorkflow={action === "open_deposit" ? "deposit_selector" : "dashboard"} 
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
    backgroundColor: Colors.newDark,
  },
});