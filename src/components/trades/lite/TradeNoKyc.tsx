import { StyleSheet, View, Text } from "react-native";
import React from "react";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { router } from "expo-router";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "@/src/components/common/Paragraph";

export default function TradeNoKyc() {
  const handleGateAction = () => {
    router.push("/profile/kyc");
  };

  return (
    <View style={styles.container}>
      {/* TOp */}
      <View >
        <TitleAndParagraph
          title="Buy Bitcoin"
          paragraph="Create a quote after your verification is approved."
        />
      </View>

      {/* 2nd card */}

      {/* Third card */}
      <View>
        <View style={styles.lockBox}>
          <Text style={styles.lockBadgeText}>Locked</Text>
          <View style={styles.descMargin}>
            <Paragraph
              text="Complete KYC before you can request buy, sell, or swap quotes."
              color={Colors.newSecondary}
              size={13}
              textAlign="center"
              lineHeight={18}
            />
          </View>
          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>Trade limit</Text>
            <Text style={styles.limitValue}>$0</Text>
          </View>
        </View>
      </View>

      {/* Footer */}

      <PrimaryButton
        text="Verify identity"
        onPress={handleGateAction}
        Bgcolor={Colors.green}
        textColor={Colors.newBlack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 20,
  },
  lockBox: {
    backgroundColor: Colors.newDark || "#0F141C",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  lockBadgeText: {
    color: Colors.newRed || "#FF4D4D",
    fontSize: 16,
    fontFamily: FontFamily.bold,
    marginBottom: 12,
  },
  warningBadgeText: {
    color: Colors.newRed || "#FF4D4D",
    fontSize: 14,
    fontFamily: FontFamily.bold,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  descMargin: { marginBottom: 24 },
  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    paddingTop: 16,
  },
  limitLabel: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  limitValue: {
    color: Colors.newRed || "#FF4D4D",
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
});
