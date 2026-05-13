import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { QrCodeSvg, plainRenderer } from "react-native-qr-svg";

interface Props {
  address: string;
  onScanQR: () => void;
}
export const MyQRView = () => {
  return (
    <View>
      <Text>QRCOde</Text>
    </View>
  );
};

const style = StyleSheet.create({});
