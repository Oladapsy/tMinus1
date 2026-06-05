import { StyleSheet, View } from "react-native";
import React from "react";
import KycLevelCard from "@/src/components/kyc/KycLevelCard";
import KycLimitRow from "@/src/components/kyc/KycLimitRow";
import PrimaryButton from "../common/PrimaryButton";
import Paragraph from "../common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface KycScreenProps {
  onNext: () => void;
}
export default function KycScreen1({ onNext }: KycScreenProps) {
  return (
    <View style={styles.container}>
      <KycLevelCard
        levelText="Level 0"
        title="Starter account"
        description="Browse markets now. Verify to trade, withdraw, and raise sandbox deposit limits."
      />

      {/* the 3 limit row */}
      <View style={styles.listWrapper}>
        <KycLimitRow label="Trade limit" value="Locked" isLocked={true} />
        <KycLimitRow label="Withdrawal limit" value="Locked" isLocked={true} />
        <KycLimitRow
          label="Sandbox deposit"
          value="$100 max"
          isLocked={false}
        />
      </View>

      {/* Footer and action */}
      <View style={styles.footer}>
        <PrimaryButton
          text="Start verification"
          onPress={onNext}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
          fontSize={13}
          style={{ fontFamily: FontFamily.bold }}
        />
        <View style={styles.noteSpacing}>
          <Paragraph
            text="You can continue browsing markets without verification."
            color={Colors.newSecondary}
            size={10}
            textAlign="center"
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    marginTop: 32,
  },
  footer: {
    marginTop: 80,
  },
  noteSpacing: {
    marginTop: 10,
  },
});
