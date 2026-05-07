// src/components/common/IconGrid.tsx
import { View, StyleSheet, ViewStyle } from "react-native";
import IconAndText from "./IconAndText";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "@/src/components/common/Paragraph";

export interface IconGridItem {
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
}

interface IconGridProps {
  items: IconGridItem[];
  title?: string;              // optional header
  columns?: number;            // locked to max 4
  containerStyle?: ViewStyle;
}

export default function IconGrid({
  items,
  title,
  columns = 4,
  containerStyle,
}: IconGridProps) {

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Optional header */}
      {title && <Paragraph text={title} />}

     <View style={[styles.grid, containerStyle]}>
      {items.map((item, index) => (
        <IconAndText
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
          containerStyle={{ width: `${100 / columns}%` as any }}
        />
      ))}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
  },
});