import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "@/src/components/common/BackHeader";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import CalloutBox from "@/src/components/common/CalloutBox";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";

interface SelectedAssetPayload {
  id: string;
  name: string;
  symbol: string;
  network: string;
  depositAddress: string;
}

interface CryptoDepositQrViewProps {
  asset: SelectedAssetPayload;
  onCopyAddress: () => void;
  onSimulateDeposit: () => void;
  onGoBack: () => void;
}

export default function CryptoDepositQrView({
  asset,
  onCopyAddress,
  onSimulateDeposit,
  onGoBack,
}: CryptoDepositQrViewProps) {
  return (
    <View style={styles.container}>
      {/* 🌟 Dynamic Title Generation based on what asset token was selected */}
      <BackHeader
        title={`${asset.symbol} deposit`}
        paragraph={`Copy the demo address or scan the QR code.`}
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* QR Code Canvas */}
        <View style={styles.qrContainerWrapper}>
          <View style={styles.qrWhiteBox}>
            <QRCode
              value={asset.depositAddress}
              size={140}
              backgroundColor="white"
              color="black"
            />
          </View>
        </View>

        {/* 🌟 Dynamic Field 1: Network */}
        <View style={styles.fieldWrapper}>
          <TitleAndParagraph
            title="Network"
            paragraph={`${asset.network} sandbox network`}
            titleSize={12}
            paragraphSize={15}
          />
        </View>

        {/* 🌟 Dynamic Field 2: Address */}
        <View style={styles.fieldWrapper}>
          <TitleAndParagraph
            title="Deposit address"
            paragraph={asset.depositAddress}
            titleSize={12}
            paragraphSize={15}
          />
        </View>

        {/* Horizontal Action Row Split Matrix */}
        <View style={styles.actionRowGrid}>
          <View style={styles.flexButton}>
            <PrimaryButton
              text="Copy address"
              fontSize={14}
              fontFamily={FontFamily.medium}
              onPress={onCopyAddress}
            />
          </View>

          <View style={styles.flexButton}>
            <PrimaryButton
              text="Simulate deposit"
              fontSize={14}
              fontFamily={FontFamily.medium}
              Bgcolor={Colors.dark}
              textColor={Colors.newWhite}
              onPress={onSimulateDeposit}
            />
          </View>
        </View>

        {/* Warning Callout */}
        <View style={styles.calloutSpacing}>
          <CalloutBox
            title="Important"
            paragraph="Only use the sandbox simulator in class. This address is not real custody."
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: "center",
  },
  qrContainerWrapper: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 24,
    marginTop: 10,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  qrWhiteBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  fieldWrapper: {
    backgroundColor: Colors.newDark,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 14,
    alignItems: "flex-start",
  },
  actionRowGrid: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    marginTop: 10,
    marginBottom: 28,
  },
  flexButton: {
    flex: 1,
  },
  calloutSpacing: {
    width: "100%",
  },
});
