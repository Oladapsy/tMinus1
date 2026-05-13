import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Title from "@/src/components/common/Title";
import CameraIcon from "@/assets/icons/qr/smallCamera.svg";
import Paragraph from "../common/Paragraph";
import PrimaryButton from "../common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import ScanIcon from "@/assets/icons/qr/qr-code1.svg";

interface Props {
  permission: string;
  scanned: string;
  onScanned: string;
  onShowQR: string;
  onRequestPermission: string;
}
export default function ScanView() {
  return (
    <View style={Styles.container}>
      {/* head */}
      <View style={Styles.cameraAndText}>
        <CameraIcon />
        <Title text="Scan QR code" size={18} />
      </View>

      <View style={Styles.headParagraph}>
        <Paragraph
          text="Scan the QR code and it automatically recognize it."
          size={14}
          textAlign="center"
          lineHeight={20}
        />
      </View>

      {/* Body */}

      {/* Footer */}
      <View style={Styles.button1}>
        <PrimaryButton text="Show QR code" icon={<ScanIcon />} />
      </View>
      <PrimaryButton
        text="Cancel"
        Bgcolor={Colors.secondary}
        textColor="white"
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraAndText: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 4,
  },
  headParagraph: {
    paddingHorizontal: 60,
    marginBottom: 16,
  },
  button1: {
    marginBottom: 20,
  },
});
