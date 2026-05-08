import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "./Paragraph";
import Graph from "@/assets/icons/main/Graph";

interface RecentCoinCardProps {
  icon: React.ReactNode;
  price: string;
  pair: string;
  change: string;
  onPress?: () => void;
  changePositive?: boolean;
}

export default function RecentCoinCard({
  icon,
  pair,
  price,
  change,
  onPress,
  changePositive,
}: RecentCoinCardProps) {
  const Color = changePositive === true ? Colors.green : Colors.red;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Top row ---> Price and Icon*/}
      <View style={styles.topRow}>
        <Title
          text={price}
          size={16}
          color={Color}
          fontFamily={FontFamily.bold}
        />
        {icon}
      </View>

      <View style={styles.row2}>
        <Title
          text={pair}
          size={14}
          color={Colors.primary}
          fontFamily={FontFamily.regular}
        />
        <Paragraph text={change} size={12} color={Color} />
      </View>

      <View style={styles.graphRow}>
        <Graph color={Color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 163,
    height: 118,
    backgroundColor: "white",
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 12,
    // the elevation
    shadowColor: Colors.primary,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row2: {
    flexDirection: "row",
    gap: 4,
    marginTop: 8,
    alignItems: "center",
  },
  graphRow: {
    marginTop: 20,
  },
});
