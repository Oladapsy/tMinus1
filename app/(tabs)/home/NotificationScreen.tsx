import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import { Colors } from "@/src/constants/colors";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import IconAndText from "@/src/components/common/tab/IconAndText";
import Filter from "@/assets/icons/notification/Filter.svg";
import NotificationCards from "@/src/components/notification/NotificationCards";
import { NOTIFICATION_DATA } from "@/src/data/notification";

export default function NotificationScreen() {
  return (
    <MySafeAreaView style={Styles.container}>
      {/* The header */}
      <View>
        <HeadIcons />
      </View>

      {/* notification optional text and filter icon that filters */}
      <View style={Styles.titleFilter}>
        <Title
          text="Notifications"
          color="white"
          size={18}
          fontFamily={FontFamily.bold}
        />

        <IconAndText icon={<Filter />} />
      </View>

      {/* Notification */}
      <View>
        <FlatList
        data={NOTIFICATION_DATA}
        

        
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
  titleFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingTop: 20,
    borderBottomColor: Colors.thinWhite,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
