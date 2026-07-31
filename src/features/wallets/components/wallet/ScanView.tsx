import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CameraIcon from "@/assets/icons/qr/smallCamera.svg";
import Paragraph from "@/src/features/shared/components/Paragraph";
import { Colors } from "@/src/constants/colors";
import ScanIcon from "@/assets/icons/qr/qr-code1.svg";
import BigCameraIcon from "@/assets/icons/qr/largeCamera1.svg";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import Title from "@/src/features/shared/components/Title";
import PrimaryButton from "@/src/features/shared/components/PrimaryButton";

interface Props {
  permission: any;
  scanned: boolean;
  onScanned: (data: any) => void;
  onShowQR: () => void;
  onRequestPermission: () => void;
}

export default function ScanView({
  permission,
  scanned,
  onScanned,
  onShowQR,
  onRequestPermission,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.cameraAndText}>
        <CameraIcon />
        <Title text="Scan QR code" size={18} />
      </View>

      <View style={styles.headParagraph}>
        <Paragraph
          text="Scan the QR code and it will be recognized automatically."
          size={14}
          textAlign="center"
          lineHeight={20}
        />
      </View>

      {!permission?.granted ? (
        <TouchableOpacity
          style={styles.permissionBox}
          onPress={onRequestPermission}
        >
          <View style={styles.scanBox}>
            <BigCameraIcon />
            <Paragraph
              text="Tap to allow camera access"
              color={Colors.secondary}
              size={14}
            />
            {/* Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.scanBox}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={scanned ? undefined : onScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          />

          {/* Corners */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      )}

      {/* Buttons */}
      <View style={styles.button1}>
        <PrimaryButton
          text="Show QR code"
          icon={<ScanIcon />}
          onPress={onShowQR}
        />
      </View>

      <PrimaryButton
        text="Cancel"
        Bgcolor={Colors.secondary}
        textColor="white"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  cameraAndText: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  headParagraph: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  button1: {
    marginVertical: 20,
  },
  permissionBox: {},
  scanBox: {
    height: 360,
    borderRadius: 10,
    backgroundColor: Colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // position: "relative",
  },
  corner: {
    width: 32,
    height: 36,
    borderColor: "white",
    position: "absolute",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
});
