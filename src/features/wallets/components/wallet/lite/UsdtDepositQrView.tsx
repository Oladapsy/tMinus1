import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
} from "react-native";
import { QrCodeSvg, plainRenderer } from "react-native-qr-svg";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import CopyIcon from "@/assets/icons/qr/copy2.svg";

interface Props {
  onCopyAddress: () => void;
  onSimulateDeposit: (amount: number) => void;
  onGoBack: () => void;
}

export default function UsdtDepositQrView({
  onCopyAddress,
  onSimulateDeposit,
  onGoBack,
}: Props) {
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [simulationAmount, setSimulationAmount] = useState("250.00");

  const handleConfirmSimulation = () => {
    const numericAmount = parseFloat(simulationAmount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onSimulateDeposit(numericAmount);
      setIsSimulationOpen(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerTitleRow}>
        <Title
          text="USDT deposit"
          color={Colors.newWhite}
          size={26}
          fontFamily={FontFamily.bold}
        />
        <Paragraph
          text="Copy the demo address or scan the QR code."
          color={Colors.newSecondary}
          size={11}
          textAlign="left"
        />
      </View>

      <View style={styles.qrCardFrame}>
        <QrCodeSvg
          renderer={plainRenderer}
          value="TXYZ5dirgMNYdQskfiP5zj39VYemXareK4C"
          frameSize={150}
        />
      </View>

      <View style={styles.metaLabelBlock}>
        <Paragraph
          text="Network"
          color={Colors.newSecondary}
          size={11}
          textAlign="left"
        />
        <View style={styles.metaValueBox}>
          <Paragraph
            text="TRC20 sandbox network"
            color={Colors.newWhite}
            size={13.5}
            fontFamily={FontFamily.bold}
            textAlign="left"
          />
        </View>
      </View>

      <View style={styles.metaLabelBlock}>
        <Paragraph
          text="Deposit address"
          color={Colors.newSecondary}
          size={11}
          textAlign="left"
        />
        <View style={styles.addressDisplayRow}>
          <Paragraph
            text="TXYZ...9F12"
            color={Colors.newWhite}
            size={13.5}
            fontFamily={FontFamily.bold}
            textAlign="left"
          />
          <TouchableOpacity
            onPress={onCopyAddress}
            style={styles.copyActionButton}
            activeOpacity={0.7}
          >
            <CopyIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionButtonsRow}>
        <PrimaryButton
          text="Copy address"
          onPress={onCopyAddress}
          textColor={Colors.newDark}
          Bgcolor={Colors.green}
          style={styles.flexButton}
          fontSize={13}
        />
        <PrimaryButton
          text="Simulate deposit"
          onPress={() => setIsSimulationOpen(true)}
          textColor={Colors.newWhite}
          Bgcolor="rgba(255, 255, 255, 0.04)"
          style={[styles.flexButton, styles.borderOutlineBtn]}
          fontSize={13}
        />
      </View>

      <TouchableOpacity
        style={{ marginTop: 24, alignSelf: "center" }}
        onPress={onGoBack}
      >
        <Paragraph
          text="Go Back"
          color={Colors.newSecondary}
          size={13}
          fontFamily={FontFamily.bold}
        />
      </TouchableOpacity>

      {/* Slide up panel sheet overlay */}
      <Modal visible={isSimulationOpen} animationType="slide" transparent>
        <View style={styles.modalOverlayDimmer}>
          <View style={styles.simulationSheetContainer}>
            <Title
              text="Simulate deposit"
              color={Colors.newWhite}
              size={18}
              fontFamily={FontFamily.bold}
            />
            <View style={{ marginTop: 4, marginBottom: 20 }}>
              <Paragraph
                text="Specify the test amount you wish to credit to your sandbox wallet account."
                color={Colors.newSecondary}
                size={12}
                textAlign="left"
              />
            </View>

            <View style={styles.inputContainerBox}>
              <TextInput
                style={styles.numericTextInputField}
                keyboardType="numeric"
                value={simulationAmount}
                onChangeText={setSimulationAmount}
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
              <Text style={styles.inputCryptoSuffixLabel}>USDT</Text>
            </View>

            <View style={styles.modalActionButtonsGrid}>
              <Pressable
                style={styles.modalCancelBtnFrame}
                onPress={() => setIsSimulationOpen(false)}
              >
                <Text style={styles.modalCancelBtnText}>Dismiss</Text>
              </Pressable>
              <Pressable
                style={styles.modalConfirmBtnFrame}
                onPress={handleConfirmSimulation}
              >
                <Text style={styles.modalConfirmBtnText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  headerTitleRow: {
    marginTop: 24,
    marginBottom: 20,
    flexDirection: "column",
    gap: 4,
  },
  qrCardFrame: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 28,
  },
  metaLabelBlock: { width: "100%", marginBottom: 16 },
  metaValueBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  addressDisplayRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    paddingLeft: 16,
    paddingRight: 6,
    height: 46,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  copyActionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    marginTop: 10,
    marginBottom: 24,
  },
  flexButton: { flex: 1, height: 44, borderRadius: 12 },
  borderOutlineBtn: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  modalOverlayDimmer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  simulationSheetContainer: {
    backgroundColor: Colors.newDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  inputContainerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    width: "100%",
    marginBottom: 28,
  },
  numericTextInputField: {
    flex: 1,
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
    padding: 0,
  },
  inputCryptoSuffixLabel: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  modalActionButtonsGrid: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  modalCancelBtnFrame: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  modalCancelBtnText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  modalConfirmBtnFrame: {
    flex: 1,
    backgroundColor: Colors.green,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalConfirmBtnText: {
    color: Colors.newDark,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
});
