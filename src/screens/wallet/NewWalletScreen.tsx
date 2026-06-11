import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

// Modular Imports
import DepositSelectorView from "@/src/components/wallet/lite/DepositSelectorView";
import UsdtDepositQrView from "@/src/components/wallet/lite/UsdtDepositQrView";
import WalletDashboardView from "@/src/components/wallet/lite/WalletDashboardView";
import { CryptoAsset, WalletWorkflowMode } from "@/src/types/wallet";

export default function NewWalletScreen() {
  const { showToast } = useToast();
  const [workflowMode, setWorkflowMode] =
    useState<WalletWorkflowMode>("dashboard");
  const [copied, setCopied] = useState(false);

  // Core Balances State
  const [usdtBalance, setUsdtBalance] = useState(1000);
  const [btcBalance] = useState(0.02);
  const [ethBalance] = useState(0.34);

  const currentUsdtValue = usdtBalance * 1;
  const currentBtcValue = btcBalance * 64200;
  const currentEthValue = ethBalance * 3407;
  const totalPortfolioValue =
    currentUsdtValue + currentBtcValue + currentEthValue;

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
      dotColor: Colors.newCryptoYellow,
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      network: "Sepolia",
      value: currentEthValue,
      balance: ethBalance,
      dotColor: Colors.purple,
    },
  ];

  const handleCopy = async () => {
    await Clipboard.setStringAsync("TXYZ5dirgMNYdQskfiP5zj39VYemXareK4C");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSimulatedCredit = (amount: number) => {
    setUsdtBalance((prev) => prev + amount);
    setWorkflowMode("dashboard");
    showToast(`Successfully credited +$${amount.toFixed(2)} USDT!`, "success");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImageWrapper}
      resizeMode="cover"
    >
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

        {workflowMode === "dashboard" && (
          <WalletDashboardView
            totalPortfolioValue={totalPortfolioValue}
            cryptoAssets={CRYPTO_ASSETS}
            onNavigateToDeposit={() => setWorkflowMode("deposit_selector")}
          />
        )}

        {workflowMode === "deposit_selector" && (
          <DepositSelectorView
            cryptoAssets={CRYPTO_ASSETS}
            onSelectAsset={(id) =>
              id === "usdt" ? setWorkflowMode("usdt_deposit") : null
            }
            onCancel={() => setWorkflowMode("dashboard")}
          />
        )}

        {workflowMode === "usdt_deposit" && (
          <UsdtDepositQrView
            onCopyAddress={handleCopy}
            onSimulateDeposit={handleSimulatedCredit}
            onGoBack={() => setWorkflowMode("deposit_selector")}
          />
        )}
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageWrapper: {
    flex: 1,
    backgroundColor: Colors.primary, // Fallback color while image is loading
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent", // Transparent so the image texture shows through perfectly!
  },
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
});
