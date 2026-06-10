import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import NewWalletScreen from "@/src/screens/wallet/NewWalletScreen";
import OldWalletScreen from "@/src/screens/wallet/OldWalletScreen";
import React from "react";
import { View } from "react-native";

const MainWalletScreen = () => {
  // 1. This value will be pulled from global Redux state slice later!
  // "APPROVED" state changes the UI
  // PENDING
  const currentKycStatus = "APPROVED";

  const oldScreen = false;

  return (
    <View style={{ flex: 1 }}>
      <KycGateGuard status={currentKycStatus} gateType="wallets">
        {/* This mount the pro screen for old design  */}
        {oldScreen && <OldWalletScreen />}
        {oldScreen === false && <NewWalletScreen />}
        {/* i will then use a lite flow later for new design */}
      </KycGateGuard>
    </View>
  );
};

export default MainWalletScreen;
