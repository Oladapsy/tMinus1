import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export default function WalletPendingKyc() {
  const router = useRouter();

  const handleGateAction = () => {
    // Take them straight back to the main KYC route (Index) where screenIndex 6 handles the pending state UI!
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
          
          {/* 1. TOP SECTION: Muted Asset Balance Information Preview */}
          <View style={styles.topSection}>
            <View style={styles.disabledPreviewPlaceholder}>
              <Text style={styles.placeholderText}>Withdraw USDT</Text>
              <View style={styles.balanceContainer}>
                <Title text="920.00" size={32} color={Colors.newWhite} />
                <Text style={styles.usdtLabel}>USDT</Text>
              </View>
            </View>
          </View>

          {/* 2. MIDDLE SECTION: The Pending Warning Block Box */}
          <View style={styles.middleSection}>
            <View style={styles.lockBox}>
              <Text style={styles.warningBadgeText}>Withdrawal unavailable</Text>
              
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

          {/* 3. FOOTER SECTION: Dynamic Status Router Tracker Button */}
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
  disabledPreviewPlaceholder: {
    opacity: 0.3, // Soft layout opacity blur mimicking disabled behind-the-scenes interface values
    marginTop: 12,
  },
  placeholderText: {
    color: Colors.newWhite || "#FFF",
    fontSize: 22,
    fontFamily: FontFamily.bold,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 8,
  },
  usdtLabel: {
    color: Colors.newSecondary,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  middleSection: {
    width: "100%",
    marginTop: 30,
  },
  footerSection: {
    width: "100%",
    marginTop: 46,
  },
  // Restrictive Warning Card Module Styles
  lockBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,77,77,0.12)",
  },
  warningBadgeText: {
    color: Colors.newRed || "#FF4D4D",
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