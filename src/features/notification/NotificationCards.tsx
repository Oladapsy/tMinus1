import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import Paragraph from "../shared/components/Paragraph";


interface NotificationCardProp {
  title: string;
  body: string;
  type: "kyc" | "deposit" | "withdrawal" | "security";
  createdAt: string;
  isRead: boolean;
}

const ICONS = {
  kyc: Colors.green,
  deposit: Colors.yellow,
  withdrawal: Colors.red,
  security: Colors.red,
};
export default function NotificationCards({
  title,
  body,
  type,
  createdAt,
  isRead,
}: NotificationCardProp) {
  const icons = ICONS[type] || Colors.green;
  return (
    <View style={[Styles.container, !isRead && Styles.unread]}>
      {/* Title and icon */}
      <View style={Styles.textIconWrapper}>
        <Paragraph
          text={title}
          color={Colors.mediumGray}
          size={14}
          textAlign="left"
        />
        {/* Icon */}
        <View style={[Styles.icon, { backgroundColor: icons }]} />
      </View>

      <View>
        <Paragraph text={body} size={14} textAlign="left" />
        <Paragraph
          text={new Date(createdAt).toLocaleString()}
          textAlign="left"
          size={8}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.thinWhite,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
  },
  unread: {},
  icon: {
    height: 13,
    width: 13,
    borderRadius: 100,
  },
  textIconWrapper: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
