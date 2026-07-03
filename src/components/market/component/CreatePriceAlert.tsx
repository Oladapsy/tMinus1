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
import { useGetMarketAssetsQuery } from "@/src/services/marketApi"; // 🌟 verified service query location
import { MarketAsset } from "@/src/types/alert";

interface CreatePriceAlertProps {
  onGoBack: () => void;
  onAlertCreated: (payload: {
    symbol: string;
    direction: "Above" | "Below";
    targetPrice: string;
  }) => void;
  isSubmitting?: boolean;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export default function CreatePriceAlert({
  onGoBack,
  onAlertCreated,
  isSubmitting,
}: CreatePriceAlertProps) {
  // 1. Single Live Hook Stream Connection
  const { data: assetsRes, isLoading } = useGetMarketAssetsQuery();
  
  // 🧠 Stable array fallback reference to prevent rendering thrash
  const assetList = React.useMemo(() => assetsRes?.data || [], [assetsRes?.data]);

  // 2. Component States
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [direction, setDirection] = useState<"Above" | "Below">("Above");
  const [targetPrice, setTargetPrice] = useState("");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Set the first item (Bitcoin) as default once the data loads stably
  useEffect(() => {
    if (assetList.length > 0 && !selectedAsset) {
      const fallbackSelection = assetList.find((a: any) => a.symbol === "BTC") || assetList[0];
      setSelectedAsset(fallbackSelection as unknown as MarketAsset);
    }
  }, [assetList, selectedAsset]);

  const handleCreate = () => {
    const cleanPrice = targetPrice.trim().replace(/,/g, "");
    if (!cleanPrice || isNaN(Number(cleanPrice)) || !selectedAsset) return;
    
    onAlertCreated({
      symbol: selectedAsset.symbol,
      direction,
      targetPrice: cleanPrice,
    });
  };

  const formattedSummaryPrice = isNaN(Number(targetPrice.replace(/,/g, "")))
    ? targetPrice
    : Number(targetPrice.replace(/,/g, "")).toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });

  if (isLoading || !selectedAsset) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="small" color={Colors.green} />
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
          paragraph={`Get notified when ${selectedAsset.symbol.toUpperCase()} crosses your target.`}
          onBack={onGoBack}
        />

        {/* 🔘 SELECTABLE Asset Row Preview Box */}
        <TouchableOpacity
          style={styles.assetPreviewCard}
          onPress={() => setIsSelectorOpen(true)}
          activeOpacity={0.8}
        >
          <View style={styles.leftRow}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: `${BASE_URL}${selectedAsset.iconUrl}` }}
                style={styles.avatarCircle}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.symbolText}>{selectedAsset.symbol.toUpperCase()} ▾</Text>
              <Text style={styles.nameText}>{selectedAsset.name}</Text>
            </View>
          </View>
          <Text style={styles.currentPriceText}>
            $
            {selectedAsset.priceUsd.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
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
              placeholder={selectedAsset.priceUsd.toFixed(2)}
              placeholderTextColor="rgba(255,255,255,0.15)"
            />
            <Text style={styles.currencyLabel}>USD</Text>
          </View>
        </View>

        {/* Meta Info Informational Rows */}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Trigger</Text>
          <Text style={styles.metaValue}>
            {selectedAsset.symbol.toUpperCase()} {direction.toLowerCase()} $
            {formattedSummaryPrice || "0.00"}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Status</Text>
          <Text style={[styles.metaValue, { color: Colors.green }]}>
            Active after creation
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.actionButton,
          isSubmitting && styles.disabledActionButton,
        ]}
        onPress={handleCreate}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Text style={styles.actionButtonText}>Create alert</Text>
        )}
      </TouchableOpacity>

      {/* 🪙 ASSET SELECTOR MODAL */}
      <Modal visible={isSelectorOpen} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Crypto Asset</Text>

            <FlatList
              data={assetList}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.assetSelectorItem}
                  onPress={() => {
                    setSelectedAsset(item as unknown as MarketAsset);
                    setIsSelectorOpen(false);
                  }}
                >
                  <View style={styles.leftRow}>
                    <View style={styles.avatarWrapperSmall}>
                      <Image
                        source={{
                          uri: `https://images.weserv.nl/?url=${encodeURIComponent(`${BASE_URL}${item.iconUrl}`)}&output=png&w=64&h=64`,
                        }}
                        style={styles.avatarCircleSmall}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text style={styles.symbolText}>{item.symbol.toUpperCase()}</Text>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                  </View>
                  <Text style={styles.modalPriceText}>
                    $
                    {item.priceUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
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
  },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 160 },
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
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.03)",
    overflow: "hidden",
  },
  avatarWrapperSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    overflow: "hidden",
  },
  avatarCircle: { width: "100%", height: "100%" },
  avatarCircleSmall: { width: "100%", height: "100%" },
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
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledActionButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: FontFamily.bold,
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