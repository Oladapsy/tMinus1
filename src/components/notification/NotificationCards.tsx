import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface NotificationCardProp {
  title: string;
  body: string;
  type: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationCards({
  title,
  body,
  type,
  createdAt,
  isRead,
}: NotificationCardProp) {
  return (
    <View>
      <Text>NotificationCards</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {},
});
