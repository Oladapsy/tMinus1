import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import BackHeader from "@/src/components/common/BackHeader";
import WalletAssetRow from "./WalletAssetRow";

interface AssetData {
  id: string;
  name: string;
  symbol: string;
  network: string;
  balance: string;
  value: string;
  color: string;
}

interface DepositSelectorViewProps {
  assets: AssetData[];
  onSelectAsset: (assetId: string) => void;
  onCancel: () => void;
}

export default function DepositSelectorView({
  assets,
  onSelectAsset,
  onCancel,
}: DepositSelectorViewProps) {
  return (
    <View style={styles.container}>
      {/* 1. Reusable Back Header Row */}
      <BackHeader title="Deposit" onBack={onCancel} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 2. Headline prompt tracking */}
        <View style={styles.titleSpace}>
          <TitleAndParagraph 
            title="Select Asset" 
            paragraph="Choose the cryptocurrency you wish to fund your sandbox wallet with."
          />
        </View>

        {/* 3. Render List Grid directly leveraging our existing Asset Rows */}
        <View style={styles.listContainer}>
          {assets.map((asset) => (
            <WalletAssetRow
              key={asset.id}
              name={asset.name}
              symbol={asset.symbol}
              network={asset.network}
              balanceString={asset.balance}
              valueString={asset.value}
              dotColor={asset.color}
              onPress={() => onSelectAsset(asset.id)} // Interactive select trigger!
            />
          ))}
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
  },
  titleSpace: {
    marginTop: 8,
    marginBottom: 24,
  },
  listContainer: {
    gap: 2,
  },
});