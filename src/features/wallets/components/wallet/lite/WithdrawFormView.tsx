import React, { useState, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { AssetData } from "@/src/features/wallets/screens/NewWalletScreen";

interface WithdrawFormViewProps {
  initialAsset: AssetData;
  allAssets: AssetData[];
  onGoBack: () => void;
  onPreviewWithdrawal: (
    amount: number,
    destination: string, // Represents crypto address OR recipient ID/Email string
    chosenNetwork: string,
    withdrawalType: "external" | "internal",
  ) => void;
}

const COIN_NETWORK_MAP: Record<string, string[]> = {
  BTC: ["Bitcoin Native Network", "Lightning Network"],
  ETH: ["Ethereum Mainnet (ERC-20)", "Arbitrum One", "Optimism"],
  USDT: ["TRON (TRC-20)", "Ethereum (ERC-20)", "BNB Smart Chain (BEP-20)"],
  USDC: ["Ethereum (ERC-20)", "Solana Native", "Polygon PoS"],
  SOL: ["Solana Native Network"],
};

export default function WithdrawFormView({
  initialAsset,
  allAssets,
  onGoBack,
  onPreviewWithdrawal,
}: WithdrawFormViewProps) {
  const [withdrawalType, setWithdrawalType] = useState<"external" | "internal">(
    "external",
  );
  const [currentAsset, setCurrentAsset] = useState<AssetData>(initialAsset);
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState(""); // Captures either crypto address or internal recipient input

  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const [networkModalVisible, setNetworkModalVisible] = useState(false);

  const availableNetworks = useMemo(() => {
    return COIN_NETWORK_MAP[currentAsset.symbol] || [currentAsset.network];
  }, [currentAsset]);

  const [selectedNetwork, setSelectedNetwork] = useState(availableNetworks[0]);

  const handleAssetSelect = (asset: AssetData) => {
    setCurrentAsset(asset);
    const networks = COIN_NETWORK_MAP[asset.symbol] || [asset.network];
    setSelectedNetwork(networks[0]);
    setAssetModalVisible(false);
  };

  const availableBalanceNum = useMemo(() => {
    const cleanStr = currentAsset.balance.replace(/,/g, "").split(" ")[0];
    return parseFloat(cleanStr) || 0;
  }, [currentAsset]);

  const handleValidateForm = () => {
    const parsedAmount = parseFloat(amount);

    if (!destination.trim()) {
      Alert.alert(
        "Input Missing",
        withdrawalType === "external"
          ? "Please provide your destination blockchain wallet address."
          : "Please enter recipient User ID, Email, or Phone number.",
      );
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Input Error", "Please enter a valid amount greater than 0.");
      return;
    }
    if (parsedAmount > availableBalanceNum) {
      Alert.alert(
        "Insufficient Balance",
        `You do not have enough funds. Maximum available is ${currentAsset.balance}.`,
      );
      return;
    }

    // 🟢 Send all gathered variables up to the master orchestrator screen logic layer
    onPreviewWithdrawal(
      parsedAmount,
      destination.trim(),
      withdrawalType === "external"
        ? selectedNetwork
        : "Internal Instant Transfer",
      withdrawalType,
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title={
          withdrawalType === "external"
            ? "Withdraw Crypto"
            : "Internal Transfer"
        }
        paragraph="Transfers require identity verification checks."
        onBack={onGoBack}
      />

      {/* 🟢 SEGMENTED TRANSFER TYPE SELECTOR TOGGLE SWITCH PANEL */}
      <View style={styles.toggleRowContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            withdrawalType === "external" && styles.activeToggleButton,
          ]}
          onPress={() => setWithdrawalType("external")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              withdrawalType === "external" && styles.activeToggleText,
            ]}
          >
            On-Chain Crypto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            withdrawalType === "internal" && styles.activeToggleButton,
          ]}
          onPress={() => setWithdrawalType("internal")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              withdrawalType === "internal" && styles.activeToggleText,
            ]}
          >
            Internal User
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Interactive Asset Picker */}
        <TouchableOpacity
          style={styles.inputSelectorCard}
          onPress={() => setAssetModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.inputLabel}>Asset Source</Text>
          <View style={styles.innerFlexRow}>
            <Text style={styles.primaryValueText}>
              {currentAsset.name} ({currentAsset.symbol})
            </Text>
            <Text style={styles.caretText}>▼</Text>
          </View>
          <Text style={styles.balanceSubLabel}>
            Available: {currentAsset.balance}
          </Text>
        </TouchableOpacity>

        {/* Value Input */}
        <View style={styles.inputSelectorCard}>
          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            style={styles.formInputSource}
            placeholder="0.00"
            placeholderTextColor={Colors.newSecondary}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* 🟢 DYNAMIC DESTINATION INPUT LABELS BASED ON ACTIVE MODE */}
        <View style={styles.inputSelectorCard}>
          <Text style={styles.inputLabel}>
            {withdrawalType === "external"
              ? "Destination Blockchain Address"
              : "Recipient Information"}
          </Text>
          <TextInput
            style={styles.formInputSource}
            placeholder={
              withdrawalType === "external"
                ? `Paste external ${currentAsset.symbol} address`
                : "Enter email, phone, user id, or address"
            }
            placeholderTextColor={Colors.newSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        {/* 🟢 CONDITIONALLY HIDE BLOCKCHAIN PROTOCOL NETWORKS SELECTION MATRIX FOR INTERNAL MODES */}
        {withdrawalType === "external" && (
          <TouchableOpacity
            style={styles.inputSelectorCard}
            onPress={() => setNetworkModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.inputLabel}>Settlement Network</Text>
            <View style={styles.innerFlexRow}>
              <Text style={styles.primaryValueText}>{selectedNetwork}</Text>
              <Text style={styles.caretText}>▼</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.verifiedLimitContainer}>
          <Title
            text="Verified limit"
            size={14}
            color={Colors.newWhite}
            textAlign="left"
          />
          <View style={{ marginTop: 4 }}>
            <Paragraph
              text={
                withdrawalType === "external"
                  ? "$2,500 limit · Network Fees apply"
                  : "Instant settlement · 0% Internal Transfer Fees"
              }
              color={Colors.newSecondary}
              size={12}
              textAlign="left"
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text={
              withdrawalType === "external"
                ? "Preview withdrawal"
                : "Preview Transfer"
            }
            fontSize={13.5}
            fontFamily={FontFamily.medium}
            onPress={handleValidateForm}
          />
        </View>
      </ScrollView>

      {/* Asset Picker Modal */}
      <Modal visible={assetModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdropBlur}>
          <View style={styles.modalCardContainer}>
            <Title text="Choose Asset Source" size={17} />
            <FlatList
              data={allAssets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.rowSelectorItem}
                  onPress={() => handleAssetSelect(item)}
                >
                  <Text style={styles.rowItemBoldText}>
                    {item.name} ({item.symbol})
                  </Text>
                  <Text style={styles.rowItemSecondaryText}>
                    {item.balance}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={{ marginTop: 16 }}>
              <PrimaryButton
                text="Close Options"
                Bgcolor={Colors.dark}
                onPress={() => setAssetModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Network Picker Modal */}
      <Modal visible={networkModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdropBlur}>
          <View style={styles.modalCardContainer}>
            <Title text="Choose Settlement Network" size={17} />
            <FlatList
              data={availableNetworks}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.rowSelectorItem}
                  onPress={() => {
                    setSelectedNetwork(item);
                    setNetworkModalVisible(false);
                  }}
                >
                  <Text style={styles.rowItemBoldText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={{ marginTop: 16 }}>
              <PrimaryButton
                text="Close Options"
                Bgcolor={Colors.dark}
                onPress={() => setNetworkModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 40, width: "100%" },
  toggleRowContainer: {
    flexDirection: "row",
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    padding: 4,
    marginVertical: 14,
    width: "100%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeToggleButton: {
    backgroundColor: Colors.primary,
  },
  toggleButtonText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  activeToggleText: {
    color: Colors.newWhite,
    fontFamily: FontFamily.bold,
  },
  inputSelectorCard: {
    backgroundColor: Colors.newDark,
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 12,
  },
  inputLabel: {
    color: Colors.newSecondary,
    fontSize: 10,
    fontFamily: FontFamily.medium,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  innerFlexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryValueText: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  caretText: { color: Colors.newSecondary, fontSize: 11 },
  balanceSubLabel: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginTop: 4,
  },
  formInputSource: {
    color: Colors.newWhite,
    fontSize: 15,
    fontFamily: FontFamily.bold,
    paddingVertical: 2,
  },
  verifiedLimitContainer: {
    backgroundColor: "rgba(94, 213, 168, 0.12)",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 18,
  },
  buttonWrapper: { width: "100%", marginTop: 32 },
  modalBackdropBlur: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  modalCardContainer: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 42,
    maxHeight: "55%",
  },
  rowSelectorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.newDark,
  },
  rowItemBoldText: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  rowItemSecondaryText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
});
