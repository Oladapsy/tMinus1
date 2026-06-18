import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BackHeader from "@/src/components/common/BackHeader";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ItemAndAddress from "@/src/components/common/ItemAndAdress";

interface SelectedAssetPayload {
  id: string;
  name: string;
  symbol: string;
  network: string;
  balance: string;
}

interface WithdrawFormViewProps {
  asset: SelectedAssetPayload;
  onGoBack: () => void;
  onPreviewWithdrawal: () => void;
}

export default function WithdrawFormView({
  asset,
  onGoBack,
  onPreviewWithdrawal,
}: WithdrawFormViewProps) {
  // Extracting just the raw numerical balance part from the string (e.g., "1,000.00")
  const numericBalance = asset.balance.split(" ")[0];

  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <BackHeader
        title="Withdraw"
        paragraph="Withdrawals require verification and transaction PIN."
        onBack={onGoBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Field 1: Asset Code & Available Balance dynamic context */}
        <ItemAndAddress
          title="Asset"
          address={`${asset.symbol} · Available ${numericBalance}`}
        />
        {/* Field 2: Mock Amount (Hardcoded placeholder based on Withdraw Form.png) */}
        <ItemAndAddress title="Amount" address="100.00" />

        {/* Field 3: Destination Address placeholder */}
        <ItemAndAddress title="Destination address" address="TXYZ...8K21" />

        {/* Field 4: Sandbox Network Details */}
        <ItemAndAddress
          title="Network"
          address={`${asset.network} sandbox network`}
        />

        {/* Verified Limits Card Callout Block */}
        <View style={styles.verifiedLimitContainer}>
          <Title
            text="Verified limit"
            size={15}
            color={Colors.newWhite}
            textAlign="left"
          />
          <View style={{ marginTop: 4 }}>
            <Paragraph
              text="$2,500 per request · $10,000 daily"
              color={Colors.newSecondary}
              size={12}
              textAlign="left"
            />
          </View>
        </View>

        {/* Form Submission Confirmation Action Trigger */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="Preview withdrawal"
            fontSize={13.5}
            fontFamily={FontFamily.medium}
            onPress={onPreviewWithdrawal}
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
  verifiedLimitContainer: {
    backgroundColor: Colors.newGreen,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "flex-start",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 40,
  },
});
