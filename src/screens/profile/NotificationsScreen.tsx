import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

interface API_NotificationItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsScreen() {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState<API_NotificationItem[]>([
    {
      id: "ntf_kyc",
      userId: "usr_student",
      title: "KYC approved",
      body: "Your account is ready for sandbox trading.",
      type: "kyc",
      isRead: false,
      createdAt: "2026-05-03T14:08:00.000Z",
    },
    {
      id: "ntf_dep_01",
      userId: "usr_student",
      title: "USDT deposit completed",
      body: "250 USDT added to wallet.",
      type: "deposit",
      isRead: false,
      createdAt: "2026-06-01T10:30:00.000Z",
    },
    {
      id: "ntf_alert_01",
      userId: "usr_student",
      title: "BTC price alert",
      body: "BTC crossed your target threshold.",
      type: "price_alert",
      isRead: true,
      createdAt: "2026-06-02T11:15:00.000Z",
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    showToast("All notifications marked as read!");
  };

  const handleSelectNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    );

    const target = notifications.find((n) => n.id === id);
    if (target && !target.isRead) {
      showToast(`Marked "${target.title}" as read`);
    }
  };

  const hasNotifications = notifications.length > 0;

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
          {/* Top Title Section */}
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Notifications"
              paragraph="Security, KYC, transaction, and alert messages."
            />
          </View>

          {/* 1. Only display "Mark all as read" button if there are active notifications available */}
          {hasNotifications && (
            <View style={styles.actionBtnWrapper}>
              <PrimaryButton
                text="Mark all as read"
                Bgcolor={Colors.newDark}
                textColor={Colors.newWhite}
                onPress={handleMarkAllAsRead}
                fontSize={14}
                style={{ fontFamily: FontFamily.bold }}
              />
            </View>
          )}

          {/* 2. DYNAMIC CONDITIONAL VIEWPORT SWITCH */}
          {hasNotifications ? (
            <View style={styles.listWrapper}>
              {notifications.map((item) => (
                <ProfileOptionRow
                  key={item.id}
                  title={item.title}
                  subtitle={item.body}
                  badgeText={item.isRead ? "Read" : "New"}
                  onPress={() => handleSelectNotification(item.id)}
                />
              ))}
            </View>
          ) : (
            /* Empty State Container Panel: Only displays when notifications length === 0 */
            <View style={styles.calmStateBox}>
              <Title
                text="All caught up"
                color={Colors.newWhite}
                size={14}
                fontFamily={FontFamily.bold}
              />
              <View style={styles.calmDescMargin}>
                <Paragraph
                  text="WTou don't have any notification yet!!! Perform some activity and notification will appear here"
                  color={Colors.newSecondary}
                  size={12}
                  lineHeight={16}
                  textAlign="left"
                />
              </View>
            </View>
          )}
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
    marginTop: 20,
    marginBottom: 20,
  },
  actionBtnWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  listWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
  },
  calmStateBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 24,
    marginTop: 12,
    width: "100%",
    minHeight: 110,
    justifyContent: "center",
  },
  calmDescMargin: { width: "100%", marginTop: 6 },
});
