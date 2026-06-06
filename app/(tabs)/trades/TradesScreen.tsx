import { StyleSheet, View } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import LiteTradeScreen from "@/src/screens/Trade/LiteTradeScreen";

const TradesScreen = () => {
  // This will be grabbed from Redux later
  const currentKycStatus = "NOT_STARTED";

  return (
    <KycGateGuard status={currentKycStatus} gateType="trades">
      <MySafeAreaView style={styles.container}>
        <LiteTradeScreen />
      </MySafeAreaView>
    </KycGateGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TradesScreen;
