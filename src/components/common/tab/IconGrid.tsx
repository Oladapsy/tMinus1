// src/components/common/IconGrid.tsx
import { View, StyleSheet, ViewStyle } from "react-native";
import IconAndText from "./IconAndText";
import { Colors } from "@/src/constants/colors";
import Paragraph from "../Paragraph";

export interface IconGridItem {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

interface IconGridProps {
  items: IconGridItem[];
  title?: string;
  columns?: 2 | 3 | 4;
  showCellBorders?: boolean; // ← home screen style (borders between cells)
  showTitleDivider?: boolean; // ← menu style (line under title only)
  containerStyle?: ViewStyle;
}

export default function IconGrid({
  items,
  title,
  columns = 4,
  showCellBorders = false,
  showTitleDivider = false,
  containerStyle,
}: IconGridProps) {
  // split the item into rows
  const rows = items.reduce<IconGridItem[][]>((acc, item, index) => {
    // get the row items fall under --> e.g 0/4 =0 && 4/4=1
    const rowIndex = Math.floor(index / columns);
    // If this row doesn’t exist yet, create it.
    // First time we hit row 0 → acc[0] = [].
    // First time we hit row 1 → acc[1] = [].
    if (!acc[rowIndex]) acc[rowIndex] = [];
    // put current item into the row
    acc[rowIndex].push(item);
    // return current item
    return acc;
  }, []);

  // needed to know when we get to the last row
  // 
  const totalRows = rows.length;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Title + optional divider underneath */}
      {title && (
        <View
          style={[
            styles.titleWrapper,
            showTitleDivider && styles.titleWithDivider,
          ]}
        >
          <Paragraph text={title} color={Colors.mediumGray} size={18} textAlign="left" />
        </View>
      )}

      {/* Loop through each row */}
      {rows.map((row, rowIndex) => {
        const isLastRow = rowIndex === totalRows - 1;

        return (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, colIndex) => {
              const isLastCol = colIndex === row.length - 1;

              const cellBorderStyle = showCellBorders
                ? {
                    borderRightWidth: isLastCol ? 0 : StyleSheet.hairlineWidth,
                    borderBottomWidth: isLastRow ? 0 : StyleSheet.hairlineWidth,
                    borderColor: "#FFFFFF10",
                  }
                : {};

              return (
                <View
                  key={colIndex}
                  style={[
                    styles.cell,
                    { width: `${100 / columns}%` as any },
                    cellBorderStyle,
                  ]}
                >
                  <IconAndText
                    icon={item.icon}
                    label={item.label}
                    onPress={item.onPress}
                  />
                </View>
              );
            })}

            {/* empty filler cells */}
            {row.length < columns &&
              // creates array of the number of missing cell
              Array(columns - row.length)
                .fill(null)
                .map((_, i) => {
                  const isLastFiller = i === columns - row.length - 1;
                  const fillerBorderStyle = showCellBorders
                    ? {
                        borderRightWidth: isLastFiller
                          ? 0
                          : StyleSheet.hairlineWidth,
                        borderColor: "#FFFFFF10",
                      }
                    : {};

                  return (
                    <View
                      key={`empty-${i}`}
                      style={[
                        styles.cell,
                        { width: `${100 / columns}%` as any },
                        fillerBorderStyle,
                      ]}
                    />
                  );
                })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  titleWrapper: {
    paddingBottom: 12,
    marginBottom: 0,
  },
  titleWithDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#FFFFFF10",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 9,
  },
});
