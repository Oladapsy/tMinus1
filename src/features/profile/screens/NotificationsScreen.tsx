import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import BackHeader from "@/src/components/common/BackHeader";
import { useRouter } from "expo-router";

// 🌟 Import your real types and RTK query hooks
import { 
  useGetNotificationsQuery, 
  useMarkNotificationReadMutation, 
  useMarkAllNotificationsReadMutation 
} from "@/src/features/profile/api/profileApi";
import { NotificationItem } from "@/src/features/notification/utils/data/alert";

export default function NotificationsScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  // 📡 Connect live queries and mutation triggers
  const { data: apiResponse, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationReadMutation();
  const [markAllRead, { isLoading: isBulkUpdating }] = useMarkAllNotificationsReadMutation();

  const notifications = apiResponse?.data || [];
  const unreadCount = apiResponse?.meta?.unread || 0;
  const hasNotifications = notifications.length > 0;

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    try {
      await markAllRead().unwrap();
      showToast?.("All notifications marked as read!", "success");
    } catch (err) {
      showToast?.("Failed to clear notifications.", "error");
      console.log("Failed to clear notifications context:", err);
    }
  };

  const handleSelectNotification = async (item: NotificationItem) => {
    if (item.isRead) return;
    try {
      await markAsRead(item.id).unwrap();
      showToast?.(`Marked "${item.title}" as read`, "success");
    } catch (err) {
      console.log("Failed to clear notification index context:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: Colors.newBlack }]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

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
            <BackHeader 
              title="Notifications" 
              paragraph="Security, KYC, transaction, and alert messages." 
              onBack={() => router.back()} 
              staright
            />
          </View>

          {/* 1. Display mark all option if there are unread notifications available */}
          {unreadCount > 0 && (
            <View style={styles.actionBtnWrapper}>
              <PrimaryButton
                text={isBulkUpdating ? "Processing..." : "Mark all as read"}
                Bgcolor={Colors.newDark}
                textColor={Colors.newWhite}
                onPress={handleMarkAllAsRead}
                fontSize={14}
                style={{ fontFamily: FontFamily.bold }}
                disabled={isBulkUpdating}
              />
            </View>
          )}

          {/* 2. DYNAMIC CONDITIONAL VIEWPORT SWITCH */}
          {hasNotifications ? (
            <View style={styles.listWrapper}>
              {notifications.map((item: NotificationItem) => (
                <ProfileOptionRow
                  key={item.id}
                  title={item.title}
                  subtitle={item.body}
                  badgeText={item.isRead ? "Read" : "New"}
                  onPress={() => handleSelectNotification(item)}
                />
              ))}
            </View>
          ) : (
            /* Empty State Container Panel */
            <View style={styles.calmStateBox}>
              <Title
                text="All caught up"
                color={Colors.newWhite}
                size={14}
                fontFamily={FontFamily.bold}
              />
              <View style={styles.calmDescMargin}>
                <Paragraph
                  text="You don't have any notifications yet. Perform some activity and notifications will appear here."
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});