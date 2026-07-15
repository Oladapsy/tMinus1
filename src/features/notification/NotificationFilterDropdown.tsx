import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Paragraph from "../common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { NOTIFICATION_FILTERS, NotificationFilterType } from "@/src/features/notification/utils/data/notificationFilters";

interface Props {
  selected: NotificationFilterType;
  onSelect: (value: NotificationFilterType) => void;
}

export default function NotificationFilterDropdown({ selected, onSelect }: Props) {
  return (
    <View style={styles.dropdown}>
      {NOTIFICATION_FILTERS.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={styles.option}
          onPress={() => onSelect(item.value)}
        >
          <Paragraph
            text={item.label}
            color={selected === item.value ? Colors.green : "white"}
            size={12.5}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 2,
    position: "absolute",
    right: 0,
    top: 30,
    zIndex: 10,
    width: 100,
  },
  option: {
    paddingVertical: 0,
  },
});
