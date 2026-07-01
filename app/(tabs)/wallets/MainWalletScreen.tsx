import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import NewWalletScreen from "@/src/screens/wallet/NewWalletScreen";
import OldWalletScreen from "@/src/screens/wallet/OldWalletScreen";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { useGetProfileQuery } from "@/src/services/profileApi"; // 🟢 Grabs cached data from Redux store automatically!
import { useGetWalletQuery } from "@/src/services/walletApi";

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED";

const MainWalletScreen = () => {
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

  return (
    <View style={styles.container}>
      <KycGateGuard status={currentKycStatus} gateType="wallets">
        {oldScreen && <OldWalletScreen />}

        {oldScreen === false && (
          /* 🟢 Pass the full walletResponse?.data so NewWalletScreen gets BOTH balances AND portfolioValueUsd */
          <NewWalletScreen walletData={walletResponse?.data} />
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
