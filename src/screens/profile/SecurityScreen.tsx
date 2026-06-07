import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
// import { useRouter } from "expo-router";

export default function SecurityScreen() {
  //   const router = useRouter();

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
          {/* HEADER SECTOR */}
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Security"
              paragraph="Protect account access and sensitive actions."
            />
          </View>

          {/* SECURITY CONFIGURATION LIST ROWS */}
          <View style={styles.menuSection}>
            <ProfileOptionRow
              title="Transaction PIN"
              subtitle="Required for trades and withdrawals"
              badgeText="Set"
              //   onPress={() => router.push("/profile/security/pin")}
            />
            <ProfileOptionRow
              title="Authenticator app"
              subtitle="Enabled for login protection"
              badgeText="On"
              //   onPress={() => router.push("/profile/security/two-factor")}
            />
            <ProfileOptionRow
              title="Recovery codes"
              subtitle="8 backup codes remaining"
              badgeText="View"
              //   onPress={() => router.push("/profile/security/recovery-codes")}
            />
            <ProfileOptionRow
              title="Registered devices"
              subtitle="iPhone 15 Pro · push enabled"
              badgeText="2"
              //   onPress={() => router.push("/profile/security/devices")}
            />
            <ProfileOptionRow
              title="Biometric login"
              subtitle="Face ID enabled on this device"
              badgeText="On"
              onPress={() => console.log("Toggle Biometrics")}
            />
          </View>

          {/* ADMIN CALLOUT WARNING BOX */}
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>
              Admin will never ask for codes
            </Text>
            <View style={styles.warningDescMargin}>
              <Paragraph
                text="Keep recovery codes private and regenerate them if exposed."
                color={Colors.newYellowWarning}
                size={12}
                lineHeight={17}
                textAlign="left"
              />
            </View>
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
  menuSection: {
    width: "100%",
    gap: 12,
  },
  warningBox: {
    backgroundColor: Colors.newYellowSlim,
    borderRadius: 16,
    padding: 20,
    marginTop: 42,
    width: "100%",
  },
  warningTitle: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
    marginBottom: 6,
  },
  warningDescMargin: {
    width: "100%",
  },
});
