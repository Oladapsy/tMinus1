import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Title from "@/src/components/common/Title";
import { Colors } from "@/src/constants/colors";


interface RecentCoinCardProps {
  icon: React.ReactNode;
  name: string;
  price: string | number;
  pair: string;
  change: string | number;
  changeColor: string; // e.g., "green" for positive, "red" for negative
  graph: React.ReactNode; // small line graph component
  onPress?: () => void;
}

export default function RecentCoinCard({
  icon,
  name,
  pair,
  price,
  change,
  changeColor,
  graph,
  onPress
}: RecentCoinCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Top row ---> Price and Icon*/}
      <View style={styles.topRow}>
        <Title text={price} color={Colors.green} />
      </View>
      
    </TouchableOpacity>
  );
}

const styles = {
    container: {
        width: 163,
        height: 118,
        BackgroundColor: "white",
        borderRadius: 16,
        paddingLeft: 12,
        paddingRight: 8,
        paddingTop: 10,
        // the elevation
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    topRow: {

    },
    
}