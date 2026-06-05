import { StyleSheet, View } from "react-native";
import React from "react";
import KycTierCard from "@/src/components/kyc/KycTierCard";
import KycNoteCard from "../KycNoteCard";
import PrimaryButton from "../../common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
interface KycScreenProps {
  onNext: () => void;
}

export default function KycScreen2({ onNext }: KycScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <KycTierCard
          tierNumber="0"
          title="Starter"
          description="Trade locked · Withdraw locked · $100 deposit"
          isActive={false}
        />

        <KycTierCard
          tierNumber="1"
          title="Review"
          description="Documents submitted · $250 deposit"
          isActive={false}
        />

        <KycTierCard
          tierNumber="2"
          title="Verified"
          description="Verification is required before executing quotes or requesting withdrawals."
          isActive={true}
          pillText="$5,000 trade · $2,500 withdrawal"
        />
      </View>

      <KycNoteCard
        showIcon={false}
        text="Verification is required before executing quotes or requesting withdrawals."
      />

      <View style={styles.button}>
        <PrimaryButton
          text="Continue"
          onPress={onNext}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
          fontSize={13}
          style={{ fontFamily: FontFamily.bold }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    marginTop: 36,
    marginBottom: 24,
  },
  button: {
    marginTop: 48,
  }
});
