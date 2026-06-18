import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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

interface AssetSelectorViewProps {
  title: "Deposit" | "Withdraw"; // 🌟 Dynamic layout variant configurations
  assets: AssetData[];
  onSelectAsset: (assetId: string) => void;
  onCancel: () => void;
}

export default function AssetSelectorView({
  title,
  assets,
  onSelectAsset,
  onCancel,
}: AssetSelectorViewProps) {
  
  // Dynamic descriptive context paragraphs based on state variant
  const contextParagraph =
    title === "Deposit"
      ? "Choose the asset you want to fund in sandbox mode."
      : "Choose the asset you want to withdraw from your sandbox wallet.";

  return (
    <View style={styles.container}>
      <BackHeader 
        title={title} 
        paragraph={contextParagraph} 
        onBack={onCancel} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
              onPress={() => onSelectAsset(asset.id)}
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
  listContainer: {
    gap: 2,
  },
});