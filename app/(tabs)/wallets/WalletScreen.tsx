import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import ScanView from "@/src/components/wallet/ScanView";

const WalletScreen = () => {
  const [mode, setMode] = useState<"scan" | "myqr">("scan");
 const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.message}>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  return (
    <MySafeAreaView style={styles.container}>
      <HeadIcons />

      <ScanView />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  message: {

  }
});

export default WalletScreen;
