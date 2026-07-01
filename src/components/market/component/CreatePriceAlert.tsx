import React, { useState, useEffect } from "react";
import {
  ScrollView,
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
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../../common/BackHeader";
import { useGetMarketAssetsQuery } from "@/src/services/profileApi";
import { MarketAsset } from "@/src/types/alert";

interface CreatePriceAlertProps {
  onGoBack: () => void;
  onAlertCreated: (payload: {
    symbol: string;
    direction: "Above" | "Below";
    targetPrice: string;
  }) => void;
}

const BASE_URL = "https://crypto-api-guwm.onrender.com";

export default function CreatePriceAlert({
  onGoBack,
  onAlertCreated,
}: CreatePriceAlertProps) {
  // 1. Single Live Hook Stream Connection
  const { data: assetsRes, isLoading } = useGetMarketAssetsQuery();
  const assetList = assetsRes?.data || [];

  // 2. Component States
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [direction, setDirection] = useState<"Above" | "Below">("Above");
  const [targetPrice, setTargetPrice] = useState("");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Set the first item (Bitcoin) as default once the data loads
  useEffect(() => {
    if (assetList.length > 0 && !selectedAsset) {
      setSelectedAsset(assetList[0]);
    }
  }, [assetList]);

  const handleCreate = () => {
    if (!targetPrice || !selectedAsset) return;
    onAlertCreated({
      symbol: selectedAsset.symbol,
      direction,
      targetPrice: targetPrice.replace(/,/g, ""),
    });
  };

  const formattedSummaryPrice = isNaN(Number(targetPrice.replace(/,/g, "")))
    ? targetPrice
    : Number(targetPrice.replace(/,/g, "")).toLocaleString();

  if (isLoading || !selectedAsset) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <BackHeader
          title="Create price alert"
          paragraph={`Get notified when ${selectedAsset.symbol} crosses your target.`}
          onBack={onGoBack}
        />

        {/* 🔘 SELECTABLE Asset Row Preview Box */}
        <TouchableOpacity
          style={styles.assetPreviewCard}
          onPress={() => setIsSelectorOpen(true)}
          activeOpacity={0.8}
        >
          <View style={styles.leftRow}>
            {/* Live Server Icon Processing */}
            <Image
              source={{ uri: `${BASE_URL}${selectedAsset.iconUrl}` }}
              style={styles.avatarCircle}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.symbolText}>{selectedAsset.symbol} ▾</Text>
              <Text style={styles.nameText}>{selectedAsset.name}</Text>
            </View>
          </View>
          <Text style={styles.currentPriceText}>
            $
            {selectedAsset.priceUsd.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
        </TouchableOpacity>

        {/* Direction Select Pills Toggle Bar */}
        <View style={styles.pillRow}>
          <TouchableOpacity
            style={[
              styles.pillButton,
              direction === "Above" && styles.activePill,
            ]}
            onPress={() => setDirection("Above")}
          >
            <Text
              style={[
                styles.pillText,
                direction === "Above" && styles.activePillText,
              ]}
            >
              Above
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pillButton,
              direction === "Below" && styles.activePill,
            ]}
            onPress={() => setDirection("Below")}
          >
            <Text
              style={[
                styles.pillText,
                direction === "Below" && styles.activePillText,
              ]}
            >
              Below
            </Text>
          </TouchableOpacity>
        </View>

        {/* Large Styled Target Price Input Section */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Target price</Text>
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.hugeInput}
              value={targetPrice}
              onChangeText={setTargetPrice}
              keyboardType="numeric"
              placeholder={selectedAsset.priceUsd.toString()}
              placeholderTextColor="rgba(255,255,255,0.2)"
            />
            <Text style={styles.currencyLabel}>USD</Text>
          </View>
        </View>

        {/* Meta Info Informational Rows */}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Trigger</Text>
          <Text style={styles.metaValue}>
            {selectedAsset.symbol} {direction.toLowerCase()} $
            {formattedSummaryPrice || "0"}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Status</Text>
          <Text style={[styles.metaValue, { color: Colors.green }]}>
            Active after creation
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.actionButton} onPress={handleCreate}>
        <Text style={styles.actionButtonText}>Create alert</Text>
      </TouchableOpacity>

      {/* 🪙 ASSET SELECTOR MODAL */}
      <Modal visible={isSelectorOpen} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Crypto Asset</Text>

            <FlatList
              data={assetList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.assetSelectorItem}
                  onPress={() => {
                    setSelectedAsset(item);
                    setIsSelectorOpen(false);
                  }}
                >
                  <View style={styles.leftRow}>
                    <Image
                      source={{ uri: `${BASE_URL}${item.iconUrl}` }}
                      style={styles.avatarCircleSmall}
                      resizeMode="contain"
                    />
                    <View>
                      <Text style={styles.symbolText}>{item.symbol}</Text>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                  </View>
                  <Text style={styles.modalPriceText}>
                    $
                    {item.priceUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setIsSelectorOpen(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 110 },
  assetPreviewCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  leftRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20 },
  avatarCircleSmall: { width: 32, height: 32, borderRadius: 16 },
  symbolText: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  nameText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginTop: 2,
  },
  currentPriceText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  pillRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  pillButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  activePill: { backgroundColor: Colors.green },
  pillText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  activePillText: { color: Colors.primary, fontFamily: FontFamily.bold },
  inputBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  inputLabel: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 8,
  },
  hugeInput: {
    color: Colors.newWhite,
    fontSize: 28,
    fontFamily: FontFamily.bold,
    flex: 1,
    padding: 0,
  },
  currencyLabel: {
    color: Colors.newSecondary,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 10,
  },
  metaLabel: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  metaValue: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  actionButton: {
    position: "absolute",
    bottom: 75,
    left: 24,
    right: 24,
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: FontFamily.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.primary || "#1c1d22",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "75%",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginBottom: 16,
    textAlign: "center",
  },
  assetSelectorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  modalPriceText: { color: "#fff", fontSize: 15, fontFamily: FontFamily.bold },
  closeModalBtn: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
  },
  closeModalText: { color: "#fff", fontSize: 14, fontFamily: FontFamily.bold },
});
