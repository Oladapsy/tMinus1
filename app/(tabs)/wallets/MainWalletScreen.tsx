import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import ProWalletScreen from "@/src/screens/wallet/ProWalletScreen";
import React from "react";
import { View } from "react-native";

const MainWalletScreen = () => {
  // 1. This value will be pulled from global Redux state slice later!
  // "APPROVED" state changes the UI
  const currentKycStatus = "PENDING";

  return (
    <View style={{ flex: 1 }}>
      <KycGateGuard status={currentKycStatus} gateType="wallets">
        {/* This mount the pro screen for old design  */}
        <ProWalletScreen />
        {/* i will then use a lite flow later for new design */}
      </KycGateGuard>
    </View>
  );
};

export default MainWalletScreen;
