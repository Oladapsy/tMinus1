import { View, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import { Colors } from "@/src/constants/colors";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import IconAndText from "@/src/components/common/tab/IconAndText";
import Filter from "@/assets/icons/notification/Filter.svg";
import NotificationCards from "@/src/components/notification/NotificationCards";
import { NOTIFICATION_DATA } from "@/src/data/notification";
import Paragraph from "@/src/components/common/Paragraph";
import { NotificationFilterType } from "@/src/data/notificationFilters";
import NotificationFilterDropdown from "@/src/components/notification/NotificationFilterDropdown";
import EmptyNotification from "@/src/components/notification/EmptyNotification";

export default function NotificationScreen() {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<NotificationFilterType>("all");

  // the filter logic
  const filteredData = NOTIFICATION_DATA.data.filter((item) => {
    if (filter === "all") return true;
    if (filter === "unread") return !item.isRead;
    return item.type === filter;
  });

  return (
    <MySafeAreaView style={Styles.container}>
      {/* The header */}
      <View>
        <HeadIcons />
      </View>

      {/* notification optional text and filter icon that filters */}
      <View style={Styles.notification}>
        <View style={Styles.titleFilter}>
          <Title
            text="Notifications"
            color="white"
            size={18}
            fontFamily={FontFamily.bold}
          />

          <View style={Styles.filterAndText}>
            <Paragraph text="Mark Read All" size={14} />
            <View>
              <IconAndText
                icon={<Filter />}
                onPress={() => setShowFilter((prev) => !prev)}
              />

              {showFilter && (
                <NotificationFilterDropdown
                  selected={filter}
                  onSelect={(value) => {
                    setFilter(value);
                    setShowFilter(false);
                  }}
                />
              )}
            </View>
          </View>
        </View>

        {/* Notification */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <NotificationCards
              title={item.title}
              body={item.body}
              type={item.type}
              createdAt={item.createdAt}
              isRead={item.isRead}
            />
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
  },
  notification: {
    paddingHorizontal: 24,
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
  },
});
