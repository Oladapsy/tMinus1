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
import * as Clipboard from "expo-clipboard";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext"; // Imported your toast hook
import CopyIcon from "@/assets/icons/qr/copy2.svg";

type WalletWorkflowMode = "dashboard" | "deposit_selector" | "usdt_deposit";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  network: string;
  value: number; // Changed to number for clean arithmetic aggregation
  balance: number; // Changed to number for dynamic mathematics calculation
  dotColor: string;
  recommended?: boolean;
}

export default function NewWalletScreen() {
  const { showToast } = useToast();
  const [workflowMode, setWorkflowMode] =
    useState<WalletWorkflowMode>("dashboard");
  const [copied, setCopied] = useState(false);

  // Simulation Panel state managers
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [simulationAmount, setSimulationAmount] = useState("250.00");

  // Reactive balance state trackers
  const [usdtBalance, setUsdtBalance] = useState(1000);
  const [btcBalance] = useState(0.02);
  const [ethBalance] = useState(0.34);

  const btcPrice = 64200;
  const ethPrice = 3407;
  const usdtPrice = 1;

  // Calculates totals dynamically across frames
  const currentUsdtValue = usdtBalance * usdtPrice;
  const currentBtcValue = btcBalance * btcPrice;
  const currentEthValue = ethBalance * ethPrice;
  const totalPortfolioValue =
    currentUsdtValue + currentBtcValue + currentEthValue;

  const usdtAddress = "TXYZ...9F12";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("TXYZ5dirgMNYdQskfiP5zj39VYemXareK4C");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const executeSandboxDepositSimulation = () => {
    const numericAmount = parseFloat(simulationAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showToast("Please enter a valid deposit amount", "error");
      return;
    }

    // Add the simulated funds to the balance state variable
    setUsdtBalance((prev) => prev + numericAmount);
    setIsSimulationOpen(false);
    setWorkflowMode("dashboard"); // Take them back to dashboard to view update
    showToast(
      `Successfully credited +$${numericAmount.toFixed(2)} USDT!`,
      "success",
    );
  };

  const CRYPTO_ASSETS: CryptoAsset[] = [
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      network: "TRC20",
      value: currentUsdtValue,
      balance: usdtBalance,
      dotColor: Colors.green,
      recommended: true,
    },
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      network: "Testnet",
      value: currentBtcValue,
      balance: btcBalance,
      dotColor: "#FF9900",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      network: "Sepolia",
      value: currentEthValue,
      balance: ethBalance,
      dotColor: "#627EEA",
    },
  ];

  // ==========================================
  // RENDER: FRAME 1 - WALLET DASHBOARD
  // ==========================================
  if (workflowMode === "dashboard") {
    return (
      <MySafeAreaView
        style={styles.safeContainer}
        edges={["top", "bottom", "left", "right"]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerTitleRow}>
            <Title
              text="Wallet"
              color={Colors.newWhite}
              size={26}
              fontFamily={FontFamily.bold}
            />
            <Paragraph
              text="Aggregated in USD from active asset balances."
              color={Colors.newSecondary}
              size={11}
              textAlign="left"
            />
          </View>

          <View style={styles.portfolioCard}>
            <Paragraph
              text="Total portfolio value"
              color={Colors.newSecondary}
              size={11}
              textAlign="left"
            />
            <View style={styles.balanceRow}>
              <Title
                text={`$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                color={Colors.newWhite}
                size={32}
                fontFamily={FontFamily.bold}
              />
            </View>
            <Text style={styles.growthText}>+2.8% today</Text>
          </View>

          <View style={styles.actionsButtonBar}>
            <PrimaryButton
              text="Deposit"
              Bgcolor={Colors.green}
              textColor={Colors.newDark}
              onPress={() => setWorkflowMode("deposit_selector")}
              style={styles.actionBtnFlex}
              fontSize={13}
            />
            <PrimaryButton
              text="Withdraw"
              Bgcolor={Colors.newDark}
              textColor={Colors.newWhite}
              onPress={() => console.log("Withdraw clicked")}
              style={[styles.actionBtnFlex, styles.outlineButtonBorder]}
              fontSize={13}
            />
            <PrimaryButton
              text="Trade"
              Bgcolor={Colors.newDark}
              textColor={Colors.newWhite}
              onPress={() => console.log("Trade clicked")}
              style={[styles.actionBtnFlex, styles.outlineButtonBorder]}
              fontSize={13}
            />
          </View>

          <View style={styles.sectionHeader}>
            <Paragraph
              text="Assets"
              color={Colors.newWhite}
              size={14}
              fontFamily={FontFamily.bold}
              textAlign="left"
            />
          </View>

          <View style={styles.listContainerStack}>
            {CRYPTO_ASSETS.map((asset) => (
              <View key={asset.id} style={styles.assetItemRow}>
                <View style={styles.leftAssetMeta}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: asset.dotColor },
                    ]}
                  />
                  <View style={styles.textStackColumn}>
                    <Title
                      text={asset.name}
                      color={Colors.newWhite}
                      size={13.5}
                      fontFamily={FontFamily.bold}
                    />
                    <Paragraph
                      text={`${asset.symbol} · ${asset.network}`}
                      color={Colors.newSecondary}
                      size={11}
                      textAlign="left"
                    />
                  </View>
                </View>
                <View style={styles.rightAssetValues}>
                  <Title
                    text={`$${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    color={Colors.newWhite}
                    size={13.5}
                    fontFamily={FontFamily.bold}
                    textAlign="right"
                  />
                  <Paragraph
                    text={`${asset.balance.toLocaleString()} ${asset.symbol}`}
                    color={Colors.newSecondary}
                    size={11}
                    textAlign="right"
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </MySafeAreaView>
    );
  }

  // ==========================================
  // RENDER: FRAME 3 - DEPOSIT SELECTOR LIST
  // ==========================================
  if (workflowMode === "deposit_selector") {
    return (
      <MySafeAreaView
        style={styles.safeContainer}
        edges={["top", "bottom", "left", "right"]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerTitleRow}>
            <Title
              text="Deposit"
              color={Colors.newWhite}
              size={26}
              fontFamily={FontFamily.bold}
            />
            <Paragraph
              text="Choose the asset you want to fund in sandbox mode."
              color={Colors.newSecondary}
              size={11}
              textAlign="left"
            />
          </View>

          <View style={styles.listContainerStack}>
            {CRYPTO_ASSETS.map((asset) => (
              <Pressable
                key={asset.id}
                style={styles.assetItemRow}
                onPress={() =>
                  asset.id === "usdt" ? setWorkflowMode("usdt_deposit") : null
                }
              >
                <View style={styles.leftAssetMeta}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: asset.dotColor },
                    ]}
                  />
                  <View style={styles.textStackColumn}>
                    <Title
                      text={asset.name}
                      color={Colors.newWhite}
                      size={13.5}
                      fontFamily={FontFamily.bold}
                    />
                    <Paragraph
                      text={`${asset.symbol} · ${asset.network}`}
                      color={Colors.newSecondary}
                      size={11}
                      textAlign="left"
                    />
                  </View>
                </View>
                <View style={styles.rightAssetValues}>
                  <Title
                    text={
                      asset.id === "usdt"
                        ? "$1.00"
                        : `$${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                    }
                    color={Colors.newWhite}
                    size={13.5}
                    fontFamily={FontFamily.bold}
                    textAlign="right"
                  />
                  <Paragraph
                    text={asset.recommended ? "Recommended" : "Available"}
                    color={
                      asset.recommended ? Colors.green : Colors.newSecondary
                    }
                    size={11}
                    textAlign="right"
                  />
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.bottomActionButtonContainer}>
            <PrimaryButton
              text="Continue with USDT"
              Bgcolor={Colors.green}
              textColor={Colors.newDark}
              onPress={() => setWorkflowMode("usdt_deposit")}
              style={{ width: "100%", height: 46 }}
            />
            <TouchableOpacity
              style={{ marginTop: 16 }}
              onPress={() => setWorkflowMode("dashboard")}
            >
              <Paragraph
                text="Cancel"
                color={Colors.newSecondary}
                size={13}
                fontFamily={FontFamily.bold}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </MySafeAreaView>
    );
  }

  // ==========================================
  // RENDER: FRAME 4 - USDT DEPOSIT QR GRID
  // ==========================================
  return (
    <MySafeAreaView
      style={styles.safeContainer}
      edges={["top", "bottom", "left", "right"]}
    >
      {copied && (
        <View style={styles.toast}>
          <Paragraph
            text="Copied address!"
            size={12}
            color={Colors.green}
            fontFamily={FontFamily.bold}
          />
        </View>
      )}

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
              text={usdtAddress}
              color={Colors.newWhite}
              size={13.5}
              fontFamily={FontFamily.bold}
              textAlign="left"
            />
            <TouchableOpacity
              onPress={copyToClipboard}
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
            onPress={copyToClipboard}
            textColor={Colors.newDark}
            Bgcolor={Colors.green}
            style={styles.flexButton}
            fontSize={13}
          />
          <PrimaryButton
            text="Simulate deposit"
            onPress={() => setIsSimulationOpen(true)} // Open Simulation Sheet overlay
            textColor={Colors.newWhite}
            Bgcolor="rgba(255, 255, 255, 0.04)"
            style={[styles.flexButton, styleMod.borderOutlineBtn]}
            fontSize={13}
          />
        </View>

        <TouchableOpacity
          style={{ marginTop: 24, alignSelf: "center" }}
          onPress={() => setWorkflowMode("deposit_selector")}
        >
          <Paragraph
            text="Go Back"
            color={Colors.newSecondary}
            size={13}
            fontFamily={FontFamily.bold}
          />
        </TouchableOpacity>

        {/* ==========================================
            POPUP OVERLAY: FRAME 5 - SIMULATOR BOTTOM MODAL SHEET
           ========================================== */}
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
                  onPress={executeSandboxDepositSimulation}
                >
                  <Text style={styles.modalConfirmBtnText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </MySafeAreaView>
  );
}

const styleMod = StyleSheet.create({
  borderOutlineBtn: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
});

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: Colors.primary },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  headerTitleRow: {
    marginTop: 24,
    marginBottom: 20,
    flexDirection: "column",
    gap: 4,
  },
  portfolioCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    width: "100%",
  },
  balanceRow: { marginTop: 4, marginBottom: 2 },
  growthText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.bold,
    marginTop: 2,
  },
  actionsButtonBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    marginTop: 24,
    marginBottom: 28,
  },
  actionBtnFlex: { flex: 1, height: 42, borderRadius: 12 },
  outlineButtonBorder: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  sectionHeader: { marginBottom: 12 },
  listContainerStack: { flexDirection: "column", gap: 10 },
  assetItemRow: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  leftAssetMeta: { flexDirection: "row", alignItems: "center", gap: 14 },
  statusDot: { width: 18, height: 18, borderRadius: 9 },
  textStackColumn: { flexDirection: "column", gap: 2 },
  rightAssetValues: { flexDirection: "column", gap: 2, alignItems: "flex-end" },
  bottomActionButtonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
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
  toast: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: Colors.newDark,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 999,
  },

  // Simulation bottom sheet overlay styling blocks
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
