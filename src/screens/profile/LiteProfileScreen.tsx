import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// 🌟 TEST IMPORTS ADDED
import { useDispatch } from "react-redux";
import { setSessionExpired, logOut } from "@/src/store/authSlice";
import BackHeader from "@/src/components/common/BackHeader";
import {
  useGetProfileQuery,
  useGetNotificationsQuery,
  useGetPriceAlertsQuery,
} from "@/src/services/profileApi";
import { PriceAlertItem } from "@/src/types/alert";

export default function LiteProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch(); // 🌟 Access the Redux action pipeline

  const { data: profileResponse, isLoading, error } = useGetProfileQuery();

  const { data: apiResponse } = useGetNotificationsQuery();
  const unreadCount = apiResponse?.meta?.unread || 0;

  // price alert list
  const { data: priceAlertsResponse } = useGetPriceAlertsQuery();

  const activeAlertsCount =
    priceAlertsResponse?.data?.filter((alert: PriceAlertItem) => alert.isActive)
      .length || 0;

  // Generate a dynamic, clean subtitle string
  const alertSubtitle =
    activeAlertsCount === 0
      ? "No active alerts"
      : `${activeAlertsCount} active alert${activeAlertsCount > 1 ? "s" : ""}`;
  // end of price alert list

  // Dynamic text strings based on unread counts
  const notificationSubtitle =
    unreadCount > 0
      ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
      : "No unread messages";

  if (isLoading) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: Colors.newBlack }]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  if (error || !profileResponse) {
    console.log("Profile Fetch Error Context:", error);

    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: Colors.newBlack, padding: 24 },
        ]}
      >
        <Text
          style={{
            color: Colors.red,
            fontFamily: FontFamily.medium,
            textAlign: "center",
          }}
        >
          Failed to load profile details. Please pull down to retry or login
          again.
        </Text>
      </View>
    );
  }

  const profile = profileResponse.data;

  // extract user initial badge
  const avatarInitial = profile.fullName
    ? profile.fullName.charAt(0).toUpperCase()
    : "U";

  const isVerified = profile.kycStatus.toLowerCase() === "approved";
  const isUnVerified = profile.kycStatus.toLowerCase() !== "approved";

  // logout pipeline

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
            <BackHeader title="Profile" onBack={router.back} staright />
          </View>

          {/* USER HEADER CARD */}
          <View style={styles.headerCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>{avatarInitial}</Text>
            </View>

            <View style={styles.userInfo}>
              <TitleAndParagraph
                title={profile.fullName}
                titleSize={20}
                paragraphSize={12}
                paragraph={profile.email}
              />

              {isVerified && (
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}

              {isUnVerified && (
                <View style={styles.notVerifiedPill}>
                  <Text style={styles.notVerifiedText}>Not Verified</Text>
                </View>
              )}
            </View>
          </View>

          {/* LITE MODE NAVIGATION OPTIONS */}
          <View style={styles.menuSection}>
            {/* 🌟 TEMPORARY TEST ROW: Click this to instantly reveal your new Reauth UI */}
            <ProfileOptionRow
              title="⚠️ Test Reauth Lockscreen"
              subtitle="Simulate session timeout layout"
              onPress={() => {
                console.log("Triggering reauth lock screen overlay state...");
                dispatch(setSessionExpired(true));
              }}
            />
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
              subtitle={alertSubtitle}
              badgeText={activeAlertsCount}
              onPress={() => router.push("/profile/security/price-alerts")}
            />
            <ProfileOptionRow
              title="Notifications"
              subtitle={notificationSubtitle}
              // Only display a numerical badge if there's actually unread content, otherwise pass undefined or 0
              badgeText={unreadCount > 0 ? unreadCount : undefined}
              onPress={() => router.push("/profile/notifications")}
              // onPress={() => router.push("/(tabs)/home/NotificationScreen")}
            />
            <ProfileOptionRow
              title="Watchlist"
              subtitle="BTC, ETH, SOL"
              onPress={() => console.log("Watchlist pressed")}
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
                console.log("Triggering reauth lock screen overlay state...");
                dispatch(logOut());
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
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  avatarCircle: {
    width: 60,
    height: 60,
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
  notVerifiedPill: {
    backgroundColor: "rgba(244, 41, 0, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 9,
  },
  notVerifiedText: {
    color: Colors.red,
    fontSize: 10,
    fontFamily: FontFamily.bold,
  },
  menuSection: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
  footerSection: {
    width: "100%",
    marginTop: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
