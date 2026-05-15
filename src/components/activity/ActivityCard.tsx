import { View, StyleSheet } from "react-native";
import React from "react";
import Paragraph from "../common/Paragraph";
import { Colors } from "@/src/constants/colors";
import Title from "../common/Title";
import ForwardIcon from "@/assets/icons/activity/pointFoward.svg";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  pair: string;
  date: string;
  amount1: string;
  amount2: string;
  price: string;
  status: "Filled" | "Cancelled";
}

export default function ActivityCard({
  pair,
  date,
  amount1,
  amount2,
  price,
  status,
}: Props) {
  const isFilled = status === "Filled";

  return (
    <View style={Style.card}>
      {/* Logo */}
      <View
        style={[
          Style.logo,
          { backgroundColor: isFilled ? Colors.thinGreen : Colors.thinRed },
        ]}
      >
        <Paragraph
          text={isFilled ? "L/B" : "L/S"}
          color={isFilled ? Colors.green : Colors.red}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* First line */}
        <View style={Style.row}>
          <Title text={pair} size={14} fontFamily={FontFamily.bold} />

          <View style={[Style.row, { gap: 8 }]}>
            <Paragraph text={date} size={12} />
            <ForwardIcon />
          </View>
        </View>

        {/* second line */}
        <View style={Style.row}>
          <Paragraph text="Amount" size={14} />
          <View style={Style.row}>
            <Paragraph text={amount1} size={14} color={Colors.green} />
            <Paragraph text="/" size={14} />
            <Paragraph text={amount2} size={14} />
          </View>
        </View>

        {/* third line */}
        <View style={Style.row}>
          <Paragraph text="Price" size={14} />
          <Paragraph text={price} size={14} />
        </View>

        {/* fourth line */}
        <View style={Style.row}>
          <Paragraph text="Status" size={14} />
          <Paragraph
            text={status}
            size={14}
            color={isFilled ? Colors.green : Colors.red}
          />
        </View>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.thinWhite,
    paddingVertical: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
