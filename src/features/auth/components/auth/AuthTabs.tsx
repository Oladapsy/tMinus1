import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function AuthTabs({ tabs, activeIndex, onChange }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                { color: isActive ? Colors.mediumGray : Colors.secondary },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.tabDark,
    padding: 4,
    borderRadius: 12,
    marginTop: 32,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
});
