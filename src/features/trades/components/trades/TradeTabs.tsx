// src/components/trades/TradeTabs.tsx
import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import Paragraph from "../common/Paragraph";

const TABS: ("Convert" | "Spot" | "Margin" | "Fiat")[] = [
  "Convert",
  "Spot",
  "Margin",
  "Fiat",
];

export default function TradeTabs() {
  const [active, setActive] = useState<"Convert" | "Spot" | "Margin" | "Fiat">(
    "Spot",
  );

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActive(tab)}
          style={[
            styles.tab,
            {
              backgroundColor: active === tab ? Colors.primary : Colors.tabDark,
            },
          ]}
        >
          <Paragraph
            text={tab}
            size={14}
            color={active === tab ? Colors.mediumGray : Colors.secondary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabDark,
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
