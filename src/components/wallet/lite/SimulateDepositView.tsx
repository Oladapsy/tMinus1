import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ItemAndAddress from "../../common/ItemAndAdress";
import Paragraph from "../../common/Paragraph";
import Title from "../../common/Title";

interface SelectedAssetPayload {
  id: string;
  name: string;
  symbol: string;
  network: string;
  depositAddress: string;
}

interface SimulateDepositViewProps {
  asset: SelectedAssetPayload;
  onGoBack: () => void;
  onCreateDeposit: () => void;
}

export default function SimulateDepositView({
  asset,
  onGoBack,
  onCreateDeposit,
}: SimulateDepositViewProps) {
  return (
    <View style={styles.container}>
      {/* Screen Header Frame */}
      <BackHeader
        title="Simulate deposit"
        paragraph="Create a pending deposit for testing polling and receipts."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Field 1: Asset Code Display */}
        <ItemAndAddress title="Asset" address={asset.symbol} />

        {/* Field 2: Static Sandbox Demo Amount */}
        <ItemAndAddress title="Amount" address="250.00" />

        {/* Field 3: Settlement Block Delay Metrics */}
        <ItemAndAddress title="Settlement delay" address="10 seconds" />

        {/* Custom Dynamic Deposit Preview Sheet */}
        <View style={styles.previewContainer}>
          <Title text="Deposit preview" size={15} />

          <View style={{ marginTop: 10 }}>
            <Title text="+250 USDT" color={Colors.green} size={23} />
          </View>

          <View style={{ marginTop: 4 }}>
            <Paragraph
              text="Status starts as pending, then completes automatically."
              textAlign="left"
              size={12}
            />
          </View>
        </View>

        {/* Action Form Confirmation Trigger Block */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="Create sandbox deposit"
            fontSize={13.5}
            fontFamily={FontFamily.medium}
            onPress={onCreateDeposit}
          />
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
    alignItems: "center",
  },
  previewContainer: {
    backgroundColor: Colors.newDark,
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 12,
    alignItems: "flex-start",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 40,
  },
});
