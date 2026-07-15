import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import MockFormInputCard from "@/src/components/common/MockFormInputCard";

export default function WalletPendingKyc() {
  const router = useRouter();

  const handleGateAction = () => {
    router.push("/profile/kyc");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          {/* 1. TOP SECTION: Header Info */}
          <View style={styles.topSection}>
            <TitleAndParagraph
              title="Withdraw USDT"
              paragraph="Verification controls how much you can move out of your wallet."
            />
          </View>

          {/* 2. MIDDLE REGION: Form Layout + Locked Overlay */}
          <View style={styles.middleSection}>
            <View style={styles.disabledPreviewPlaceholder}>
              <MockFormInputCard
                label="Available"
                value="920.00 USDT"
                rightContent={
                  <View style={styles.reviewChip}>
                    <Text style={styles.reviewChipText}>Review</Text>
                  </View>
                }
              />

              {/* Card B: Amount Field Input */}
              <MockFormInputCard
                label="Amount"
                value="500"
                rightContent={<Text style={styles.currencyLabel}>USDT</Text>}
              />
            </View>

            {/* The Actual Pending Warning Block Box */}
            <View style={styles.lockBox}>
              <Text style={styles.warningBadgeText}>
                Withdrawal unavailable
              </Text>

              <View style={styles.descMargin}>
                <Paragraph
                  text="Your KYC is under review. Withdrawals unlock after approval."
                  color={Colors.newSecondary}
                  size={13}
                  textAlign="left"
                  lineHeight={18}
                />
              </View>

              {/* Dynamic Limit Status Row Element */}
              <View style={styles.limitRow}>
                <Text style={styles.limitLabel}>Current withdrawal limit</Text>
                <Text style={styles.limitValue}>$0</Text>
              </View>
            </View>
          </View>

          {/* 3. FOOTER SECTION: Action Trigger */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text="View verification status"
              onPress={handleGateAction}
              Bgcolor={Colors.green}
              textColor={Colors.newBlack}
              fontSize={13}
              style={{ fontFamily: FontFamily.bold }}
            />
          </View>
        </View>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topSection: {
    marginTop: 10,
    width: "100%",
  },
  middleSection: {
    width: "100%",
    marginTop: 30,
    gap: 16,
  },
  disabledPreviewPlaceholder: {
    gap: 20,
    width: "100%",
  },

  reviewChip: {
    backgroundColor: Colors.newBrightYellow,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },

  reviewChipText: {
    color: Colors.newBlack,
    fontSize: 11,
    fontFamily: FontFamily.bold,
  },

  currencyLabel: {
    color: Colors.newSecondary,
    fontSize: 13.5,
    fontFamily: FontFamily.bold,
  },
  // here
  footerSection: {
    width: "100%",
    marginTop: 52,
  },
  lockBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,77,77,0.12)",
    marginTop: 4,
  },
  warningBadgeText: {
    color: Colors.newRed,
    fontSize: 14,
    fontFamily: FontFamily.bold,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  descMargin: {
    marginBottom: 24,
  },
  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingTop: 16,
  },
  limitLabel: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  limitValue: {
    color: Colors.newRed,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
});
