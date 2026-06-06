import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import KycGateGuard from "@/src/components/kyc/KycGateGuard";
import LiteTradeScreen from "@/src/screens/Trade/LiteTradeScreen";

const TradesScreen = () => {
  // this will be grabbed from redux
  const currentKycStatus = "NOT_STARTED";

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={style.image}
        resizeMode="cover"
      >
        <MySafeAreaView style={style.container}>
          <KycGateGuard status={currentKycStatus} gateType="trades">
            <LiteTradeScreen />
          </KycGateGuard>
        </MySafeAreaView>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary,
  },
  image: { flex: 1 },
});

export default TradesScreen;
