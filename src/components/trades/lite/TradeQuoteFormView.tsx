import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import BackHeader from "@/src/components/common/BackHeader";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useCreateQuoteMutation } from "@/src/services/tradeApi";
import { useGetMarketAssetsQuery } from "@/src/services/marketApi";
import { AssetSymbol, TradeType } from "@/src/types/trade";

interface TradeQuoteFormViewProps {
  initialMode: "Buy" | "Sell" | "Swap";
  initialSymbol: string;
  onGoBack: () => void;
  onRequestQuote: (
    amount: string,
    targetAsset: string,
    currentMode: "Buy" | "Sell" | "Swap",
    quoteId: string,
  ) => void;
}

export default function TradeQuoteFormView({
  initialMode,
  initialSymbol,
  onGoBack,
  onRequestQuote,
}: TradeQuoteFormViewProps) {
  const [currentMode, setCurrentMode] = useState<"Buy" | "Sell" | "Swap">(
    initialMode,
  );
  const [amount, setAmount] = useState("10");
  const [fromAsset, setFromAsset] = useState<string>("USDT");
  const [toAsset, setToAsset] = useState<string>(initialSymbol || "BTC");
  const [activePicker, setActivePicker] = useState<"from" | "to" | null>(null);
  const [estimatedReceive, setEstimatedReceive] = useState<string>("");

  // 📡 Load true backend data stream
  const { data: marketAssetsResponse, isLoading: isAssetsLoading } =
    useGetMarketAssetsQuery({ limit: 50 });
  const allSupportedCoins = marketAssetsResponse?.data || [];

  const [createQuote, { isLoading }] = useCreateQuoteMutation();

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (currentMode === "Buy") {
      setFromAsset("USDT");
      setToAsset(initialSymbol || "BTC");
    } else if (currentMode === "Sell") {
      setFromAsset(initialSymbol || "BTC");
      setToAsset("USDT");
    }
    setEstimatedReceive("");
  }, [currentMode, initialSymbol]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
        runSilentPreviewCalculation();
      } else {
        setEstimatedReceive("");
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [amount, fromAsset, toAsset]);

  const runSilentPreviewCalculation = async () => {
    try {
      const response = await createQuote({
        type: currentMode.toLowerCase() as TradeType,
        fromAsset: fromAsset as AssetSymbol,
        toAsset: toAsset as AssetSymbol,
        fromAmount: Number(amount),
      }).unwrap();

      if (response?.data?.toAmount) {
        setEstimatedReceive(`${response.data.toAmount} ${toAsset}`);
      }
    } catch (err) {
      setEstimatedReceive("Rate unavailable");
    }
  };

  const handleSwapAssets = () => {
    const temp = fromAsset;
    setFromAsset(toAsset);
    setToAsset(temp);
    setEstimatedReceive("");
  };

  const handleFetchFinalQuote = async () => {
    if (!amount || isNaN(Number(amount))) return;
    try {
      const response = await createQuote({
        type: currentMode.toLowerCase() as TradeType,
        fromAsset: fromAsset as AssetSymbol,
        toAsset: toAsset as AssetSymbol,
        fromAmount: Number(amount),
      }).unwrap();

      if (response?.data?.id) {
        onRequestQuote(amount, toAsset, currentMode, response.data.id);
      }
    } catch (err) {
      console.error("Failed to generate asset pairs quote context:", err);
    }
  };

  /**
   * 🔄 Weserv Image Transform Pipeline
   * Takes the backend SVG URL reference path, passes it to an open-source image proxy router,
   * which translates the SVG vector graphics data straight into high-performance PNG image streams.
   */
  const renderAssetLogo = (
    iconUrlPath: string,
    styleOverride = styles.assetLogoImage,
  ) => {
    if (!iconUrlPath)
      return (
        <View
          style={[styleOverride, { backgroundColor: "rgba(255,255,255,0.1)" }]}
        />
      );

    const rawAbsoluteUrl = iconUrlPath.startsWith("http")
      ? iconUrlPath
      : `${BASE_URL}${iconUrlPath}`;
    const pngCompiledUrl = `https://images.weserv.nl/?url=${encodeURIComponent(rawAbsoluteUrl)}&output=png`;

    return (
      <Image
        source={{ uri: pngCompiledUrl }}
        style={styleOverride}
        defaultSource={require("@/assets/images/icon.png")}
      />
    );
  };

  // Helper selectors to fetch current selected metadata rows cleanly
  const currentFromItem = allSupportedCoins.find((c) => c.symbol === fromAsset);
  const currentToItem = allSupportedCoins.find((c) => c.symbol === toAsset);

  return (
    <View style={styles.container}>
      <BackHeader
        title={`${currentMode} Crypto`}
        paragraph="Create an instantaneous asset pair quote."
        onBack={onGoBack}
      />

      <View style={styles.formGroup}>
        {/* YOU PAY CARD */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>You Pay</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={Colors.newSecondary}
            />
            <TouchableOpacity
              style={styles.assetSelector}
              onPress={() => setActivePicker("from")}
            >
              {currentFromItem &&
                renderAssetLogo(currentFromItem.iconUrl, styles.formRowIcon)}
              <Text style={styles.assetUnit}>{fromAsset} ▾</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SWAP ICON BADGE CONTROL */}
        <View style={styles.arrowWrapper}>
          <TouchableOpacity
            style={styles.arrowTouchCircle}
            onPress={handleSwapAssets}
            activeOpacity={0.8}
          >
            <Text style={styles.arrowIcon}>⇅</Text>
          </TouchableOpacity>
        </View>

        {/* YOU RECEIVE CARD */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>You Receive</Text>
          <View style={styles.inputRow}>
            {isLoading && !estimatedReceive ? (
              <ActivityIndicator
                size="small"
                color={Colors.green}
                style={{ marginRight: "auto" }}
              />
            ) : (
              <Text
                style={[
                  styles.textInput,
                  {
                    color:
                      estimatedReceive &&
                      estimatedReceive !== "Rate unavailable"
                        ? Colors.newWhite
                        : Colors.newSecondary,
                  },
                ]}
              >
                {estimatedReceive || "Calculating conversion..."}
              </Text>
            )}
            <TouchableOpacity
              style={styles.assetSelector}
              onPress={() => setActivePicker("to")}
            >
              {currentToItem &&
                renderAssetLogo(currentToItem.iconUrl, styles.formRowIcon)}
              <Text style={styles.assetUnit}>{toAsset} ▾</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor:
              currentMode === "Sell" ? Colors.newRed : Colors.green,
          },
        ]}
        onPress={handleFetchFinalQuote}
        disabled={
          isLoading ||
          !estimatedReceive ||
          estimatedReceive === "Rate unavailable"
        }
      >
        <Text style={styles.actionButtonText}>
          {isLoading ? "Fetching fresh quote..." : "Get Quote"}
        </Text>
      </TouchableOpacity>

      {/* SELECT COIN TOKEN PICKER SHEET */}
      <Modal visible={activePicker !== null} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setActivePicker(null)}
        >
          <View style={styles.dropdownModalBox}>
            <Text style={styles.modalTitle}>Select Token Asset</Text>

            {isAssetsLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.green}
                style={{ marginVertical: 20 }}
              />
            ) : (
              <FlatList
                data={allSupportedCoins}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.marketAssetRow}
                    onPress={() => {
                      if (activePicker === "from") setFromAsset(item.symbol);
                      else setToAsset(item.symbol);
                      setActivePicker(null);
                    }}
                  >
                    {renderAssetLogo(item.iconUrl, styles.assetLogoImage)}

                    <View style={styles.metaTextBox}>
                      <Text style={styles.marketAssetSymbol}>
                        {item.symbol}
                      </Text>
                      <Text style={styles.marketAssetName}>
                        {item.name} • {item.network}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  formGroup: { gap: 4, marginVertical: 20 },
  inputCard: { backgroundColor: Colors.newDark, padding: 16, borderRadius: 16 },
  inputLabel: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    flex: 1,
    padding: 0,
  },

  assetSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
  },
  // 🟢 FIXED: Removed background color to perfectly eliminate strict layout matching typing runtime compilation collisions
  formRowIcon: { width: 18, height: 18, borderRadius: 9, marginRight: 6 },
  assetUnit: { color: Colors.green, fontSize: 14, fontFamily: FontFamily.bold },

  arrowWrapper: { alignItems: "center", zIndex: 10, marginVertical: -14 },
  arrowTouchCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.newDark,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  arrowIcon: { color: Colors.green, fontSize: 14, fontFamily: FontFamily.bold },

  actionButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 44,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  dropdownModalBox: {
    backgroundColor: Colors.newDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "60%",
  },
  modalTitle: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
    marginBottom: 16,
    textAlign: "center",
  },

  marketAssetRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  assetLogoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  metaTextBox: { flex: 1, justifyContent: "center" },
  marketAssetSymbol: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  marketAssetName: { color: Colors.newSecondary, fontSize: 12, marginTop: 2 },
});
