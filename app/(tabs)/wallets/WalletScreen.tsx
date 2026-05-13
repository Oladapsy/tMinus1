import { StyleSheet } from "react-native";
import React, { useState } from "react";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import ScanView from "@/src/components/wallet/ScanView";

const WalletScreen = () => {
  const [mode, setMode] = useState<"scan" | "myqr">("scan");
  const [permission, requestPermission] = useCameraPermissions();
  // const [scanned, setScanned] = useState(false);

  return (
    <MySafeAreaView style={Style.container}>
      <HeadIcons />

      <ScanView/>
    </MySafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default WalletScreen;
