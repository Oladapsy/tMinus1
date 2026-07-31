import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import { Colors } from "@/src/constants/colors";
import { useCameraPermissions } from "expo-camera";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import HeadIcons from "@/src/features/shared/components/tab/HeadIcons";
import ScanView from "@/src/features/wallets/components/wallet/ScanView";
import { MyQRView } from "@/src/features/wallets/components/wallet/MyQRView";


const WalletScreen = () => {
  const [mode, setMode] = useState<"scan" | "myqr">("scan");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleScanned = ({ data }: any) => {
    setScanned(true);
    console.log("Scanned:", data);
  };

  // ⭐ Auto-request permission when entering scan mode
  useEffect(() => {
    if (mode === "scan" && !permission?.granted) {
      requestPermission();
    }
  }, [mode]);

  // if (!permission) return <View />;
  
  return (
    <MySafeAreaView style={styles.container}>
      <HeadIcons />

      {mode === "scan" ? (
        <ScanView
          permission={permission}
          scanned={scanned}
          onScanned={handleScanned}
          onShowQR={() => setMode("myqr")}
          onRequestPermission={requestPermission}
        />
      ) : (
        <MyQRView
          btcAddress="btc5dirgMNYdQskfiP5zj39VYemXareK4C"
          usdAddress="usdt5dirgMNYdQskfiP5zj39VYemXareK4C"
          usdBalance="40,059.83"
          btcBalance="1.02"
          onScanQR={() => {
            setMode("scan");
            setScanned(false);
          }}
        />
      )}
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default WalletScreen;
