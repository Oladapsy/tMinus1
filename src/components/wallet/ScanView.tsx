import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Title from "@/src/components/common/Title";
import CameraIcon from "@/assets/icons/qr/smallCamera.svg";
import Paragraph from "../common/Paragraph";
import PrimaryButton from "../common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import ScanIcon from "@/assets/icons/qr/qr-code1.svg";

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

      {/* Placeholder for camera */}
      <TouchableOpacity
        style={styles.cameraPlaceholder}
        onPress={onRequestPermission}
      >
        <Paragraph
          text="Tap to start scanning"
          size={14}
          color={Colors.mediumGray}
        />
      </TouchableOpacity>

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
  cameraPlaceholder: {
    height: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.thinWhite,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  button1: {
    marginBottom: 20,
  },
});
