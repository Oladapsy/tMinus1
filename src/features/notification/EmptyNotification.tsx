import { View, StyleSheet } from "react-native";
import React from "react";
import { FontFamily } from "@/src/constants/fonts";
import EmptyNotificationIcon from "@/assets/icons/notification/notificationIconRain.svg";
import { Colors } from "@/src/constants/colors";
import Title from "../shared/components/Title";

export default function EmptyNotification() {
  return (
    <View style={Styles.container}>
      <EmptyNotificationIcon width={97} height={136}/>
      <View style={Styles.text}>
        <Title
          text="You have no notifications"
          color="white"
          size={14}
          fontFamily={FontFamily.bold}
          textAlign="center"
        />

        <Title
          text="Your notifications appears here"
          color={Colors.secondary}
          size={14}
          fontFamily={FontFamily.bold}
          textAlign="center"
          lineHeight={25}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  text: {
    paddingTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
