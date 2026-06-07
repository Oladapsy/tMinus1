import MockFormInputCard from "@/src/components/common/MockFormInputCard";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function TransactionPinScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. TOP SECTION: Header Info */}
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Transaction PIN"
              paragraph="Update the PIN used for trade and withdrawal confirmations."
            />
          </View>

          {/* 2. MIDDLE REGION: Input Cards Group */}
          <View style={styles.inputGroup}>
            <MockFormInputCard label="Current PIN" value="••••" />
            <MockFormInputCard label="New PIN" value="" />
            <MockFormInputCard label="Confirm PIN" value="••••" />
          </View>

          {/* 3. INFORMATION SECTION: PIN Rules Text */}
          <View style={styles.rulesContainer}>
            <Text style={styles.rulesTitle}>PIN rules</Text>
            <View style={styles.rulesDescMargin}>
              <Paragraph
                text="Use four digits. Avoid repeated or obvious numbers in production apps."
                color={Colors.newSecondary}
                size={12.5}
                lineHeight={18}
                textAlign="left"
              />
            </View>
          </View>

          {/* 4. FOOTER SECTION: Action Trigger Button */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text="Update PIN"
              Bgcolor={Colors.green}
              textColor={Colors.newBlack}
              fontSize={13}
              style={{ fontFamily: FontFamily.bold }}
              onPress={() => console.log("Update PIN executed")}
            />
          </View>
        </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    marginTop: 14,
    marginBottom: 28,
  },
  inputGroup: {
    width: "100%",
    gap: 16,
  },
  rulesContainer: {
    width: "100%",
    marginTop: 28,
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 22,
  },
  rulesTitle: {
    color: Colors.newWhite,
    fontSize: 13.5,
    fontFamily: FontFamily.bold,
    marginBottom: 6,
  },
  rulesDescMargin: {
    width: "100%",
  },
  footerSection: {
    width: "100%",
    marginTop: 150,
  },
});
