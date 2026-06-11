import React from "react";
import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { CryptoAsset } from "@/src/types/wallet";

interface Props {
  cryptoAssets: CryptoAsset[];
  onSelectAsset: (assetId: string) => void;
  onCancel: () => void;
}

export default function DepositSelectorView({ cryptoAssets, onSelectAsset, onCancel }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerTitleRow}>
        <Title text="Deposit" color={Colors.newWhite} size={26} fontFamily={FontFamily.bold} />
        <Paragraph text="Choose the asset you want to fund in sandbox mode." color={Colors.newSecondary} size={11} textAlign="left" />
      </View>

      <View style={styles.listContainerStack}>
        {cryptoAssets.map((asset) => (
          <Pressable key={asset.id} style={styles.assetItemRow} onPress={() => onSelectAsset(asset.id)}>
            <View style={styles.leftAssetMeta}>
              <View style={[styles.statusDot, { backgroundColor: asset.dotColor }]} />
              <View style={styles.textStackColumn}>
                <Title text={asset.name} color={Colors.newWhite} size={13.5} fontFamily={FontFamily.bold} />
                <Paragraph text={`${asset.symbol} · ${asset.network}`} color={Colors.newSecondary} size={11} textAlign="left" />
              </View>
            </View>
            <View style={styles.rightAssetValues}>
              <Title text={asset.id === "usdt" ? "$1.00" : `$${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} color={Colors.newWhite} size={13.5} fontFamily={FontFamily.bold} textAlign="right" />
              <Paragraph text={asset.recommended ? "Recommended" : "Available"} color={asset.recommended ? Colors.green : Colors.newSecondary} size={11} textAlign="right" />
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomActionButtonContainer}>
        <PrimaryButton text="Continue with USDT" Bgcolor={Colors.green} textColor={Colors.newDark} onPress={() => onSelectAsset("usdt")} style={{ width: "100%", height: 46 }} />
        <TouchableOpacity style={{ marginTop: 16 }} onPress={onCancel}>
          <Paragraph text="Cancel" color={Colors.newSecondary} size={13} fontFamily={FontFamily.bold} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  headerTitleRow: { marginTop: 24, marginBottom: 20, flexDirection: "column", gap: 4 },
  listContainerStack: { flexDirection: "column", gap: 10 },
  assetItemRow: { backgroundColor: Colors.newDark, borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.02)" },
  leftAssetMeta: { flexDirection: "row", alignItems: "center", gap: 14 },
  statusDot: { width: 18, height: 18, borderRadius: 9 },
  textStackColumn: { flexDirection: "column", gap: 2 },
  rightAssetValues: { flexDirection: "column", gap: 2, alignItems: "flex-end" },
  bottomActionButtonContainer: { marginTop: 40, width: "100%", alignItems: "center" }
});