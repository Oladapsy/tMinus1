import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { useToast } from "@/src/context/ToastContext";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "@/src/features/profile/api/profileApi";
import { NotificationItem } from "@/src/features/notification/utils/data/alert";
import { NotificationFilterType } from "@/src/features/notification/utils/data/notificationFilters";
import { Colors } from "@/src/constants/colors";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import HeadIcons from "@/src/features/shared/components/tab/HeadIcons";
import Title from "@/src/features/shared/components/Title";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "@/src/features/shared/components/Paragraph";
import IconAndText from "@/src/features/shared/components/tab/IconAndText";
import { Filter } from "react-native-svg";
import NotificationFilterDropdown from "@/src/features/notification/NotificationFilterDropdown";
import NotificationCards from "@/src/features/notification/NotificationCards";
import EmptyNotification from "@/src/features/notification/EmptyNotification";

export default function NotificationScreen() {
  const { showToast } = useToast();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<NotificationFilterType>("all");

  // 1. Live RTK-Query Hook Stream Connections
  const { data: apiResponse, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationReadMutation();
  const [markAllRead, { isLoading: isBulkUpdating }] =
    useMarkAllNotificationsReadMutation();

  const rawNotificationsList = apiResponse?.data || [];
  const unreadCount = apiResponse?.meta?.unread || 0;

  // 2. Client Side Filters computed on active server responses
  const filteredData = rawNotificationsList.filter((item: NotificationItem) => {
    if (filter === "all") return true;
    if (filter === "unread") return !item.isRead;
    return item.type === filter;
  });

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) {
      showToast("No unread items to clear.", "success");
      return;
    }
    try {
      await markAllRead().unwrap();
      showToast("All notifications marked as read!", "success");
    } catch (err) {
      showToast("Failed to clear notifications.", "error");
      console.log(err);
    }
  };

  const handleCardPress = async (item: NotificationItem) => {
    if (item.isRead) return;
    try {
      await markAsRead(item.id).unwrap();
    } catch (err) {
      console.log("Failed to mark single row notification read:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={[Styles.container, Styles.centerContainer]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <MySafeAreaView style={Styles.container}>
      <View>
        <HeadIcons />
      </View>

      <View style={Styles.notification}>
        <View style={Styles.titleFilter}>
          <Title
            text="Notifications"
            color="white"
            size={18}
            fontFamily={FontFamily.bold}
          />

          <View style={Styles.filterAndText}>
            {/* Mark All Text is now live! */}
            <TouchableOpacity
              onPress={handleMarkAllRead}
              disabled={isBulkUpdating || unreadCount === 0}
              activeOpacity={0.7}
            >
              <Paragraph
                text={isBulkUpdating ? "Updating..." : "Mark Read All"}
                size={14}
                color={unreadCount === 0 ? Colors.newSecondary : Colors.green}
              />
            </TouchableOpacity>

            <View>
              <IconAndText
                icon={<Filter />}
                onPress={() => setShowFilter((prev) => !prev)}
              />

              {showFilter && (
                <NotificationFilterDropdown
                  selected={filter}
                  onSelect={(value) => {
                    setFilter(value as NotificationFilterType);
                    setShowFilter(false);
                  }}
                />
              )}
            </View>
          </View>
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCardPress(item)}
              activeOpacity={item.isRead ? 1 : 0.8}
            >
              <NotificationCards
                title={item.title}
                body={item.body}
                // 🌟 THE FIX: Assert string type to match what the component expects
                type={
                  item.type as "deposit" | "kyc" | "security" | "withdrawal"
                }
                createdAt={item.createdAt}
                isRead={item.isRead}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<EmptyNotification />}
        />
      </View>
    </MySafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 24,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  notification: {
    flex: 1,
  },
  titleFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingTop: 20,
  },
  filterAndText: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
