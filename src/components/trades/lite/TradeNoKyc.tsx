import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Title from "../../common/Title";

export default function TradeNoKyc() {
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
          {/* TOP SECTION */}
          <View style={styles.topSection}>
            <TitleAndParagraph
              title="Buy Bitcoin"
              paragraph="Create a quote after your verification is approved."
            />
          </View>

          {/* MIDDLE SECTION: Mock interface row + Lock card overlay */}
          <View style={styles.middleSection}>
            <View style={styles.mockTickerCard}>
              <View style={styles.tickerHeader}>
                <Title text="BTC / USDT" size={15} color={Colors.newWhite} />
              </View>
              <View style={styles.tickerPriceRow}>
                <Title text="64,200.50" size={32} color={Colors.newWhite} />
                <Title text="+2.1%" size={13} color={Colors.green} />
              </View>
              <View style={styles.mockProgressBar} />
            </View>

            {/* Lock Error Card Overlay Component */}
            <View style={styles.lockBox}>
              <View style={styles.lockBadgeBg}>
                <Text style={styles.lockBadgeText}>Locked</Text>
              </View>
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

          {/* FOOTER SECTION */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text="Verify identity"
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

  // here
  middleSection: {
    justifyContent: "center",
    width: "100%",
    gap: 16,
    marginTop: 30,
  },
  footerSection: {
    width: "100%",
    marginTop: 46,
  },
  mockTickerCard: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    paddingHorizontal: 22,
    width: "100%",
    paddingBottom: 44,
    paddingTop: 26,
  },
  tickerHeader: {
    marginBottom: 8,
  },
  tickerPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  // here
  mockProgressBar: {
    height: 22,
    backgroundColor: Colors.newGreen,
    borderRadius: 8,
    marginTop: 14,
    width: "100%",
  },

  // Restrictive Lock Card UI Styles
  lockBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,77,77,0.12)",
    marginTop: 17,
  },
  lockBadgeBg: {
    backgroundColor: Colors.newLightRed,
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  lockBadgeText: {
    color: Colors.newRed,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  descMargin: {
    marginBottom: 24,
    paddingHorizontal: 6,
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
