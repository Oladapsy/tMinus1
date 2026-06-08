import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router";
import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function LiteProfileScreen() {
  const router = useRouter();
  const kycStatus = "APPROVED"; // Grabbed from global state later

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
          <View style={styles.pageTitle}>
            <TitleAndParagraph title="Profile" />
          </View>

          {/* USER HEADER CARD */}
          <View style={styles.headerCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>A</Text>
            </View>

            <View style={styles.userInfo}>
              <TitleAndParagraph
                title="Ada Student"
                titleSize={20}
                paragraphSize={12}
                paragraph="student@cryptoclass.test"
              />

              {kycStatus === "APPROVED" && (
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
          </View>

          {/* LITE MODE NAVIGATION OPTIONS */}
          <View style={styles.menuSection}>
            <ProfileOptionRow
              title="Edit profile"
              subtitle="Name, email, phone"
              onPress={() => router.push("/profile/Edit")}
            />
            <ProfileOptionRow
              title="Security"
              subtitle="2FA, PIN, recovery codes"
              onPress={() => router.push("/profile/security")}
            />
            <ProfileOptionRow
              title="Price alerts"
              subtitle="3 active alerts"
              badgeText={3}
              onPress={() => router.push("/profile/security/price-alerts")}
            />
            <ProfileOptionRow
              title="Notifications"
              subtitle="2 unread messages"
              badgeText={2}
              //   onPress={() => router.push("/profile/notifications")}
            />
            <ProfileOptionRow
              title="Watchlist"
              subtitle="BTC, ETH, SOL"
              //   onPress={() => router.push("/profile/watchlist")}
            />
          </View>

          {/* FOOTER DISMISS BUTTON */}
          <View style={styles.footerSection}>
            <PrimaryButton
              text="Logout"
              Bgcolor={Colors.newDark}
              textColor={Colors.newWhite}
              fontSize={14}
              style={{ fontFamily: FontFamily.bold }}
              onPress={() => {
                console.log("logged out pressed");
              }}
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
    marginBottom: 20,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  avatarCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: {
    color: Colors.newBlack,
    fontSize: 24,
    fontFamily: FontFamily.bold,
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  verifiedPill: {
    backgroundColor: "rgba(0, 255, 128, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 9,
  },
  verifiedText: {
    color: Colors.green,
    fontSize: 10,
    fontFamily: FontFamily.bold,
  },
  menuSection: {
    width: "100%",
    marginTop: 40,
    gap: 12,
  },
  footerSection: {
    width: "100%",
    marginTop: 100,
  },
});
