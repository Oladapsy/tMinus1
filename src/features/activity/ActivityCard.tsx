import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import ForwardIcon from "@/assets/icons/activity/pointFoward.svg";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "../shared/components/Paragraph";
import Title from "../shared/components/Title";

interface Props {
  pair: string;
  date: string;
  amount1: string;
  amount2: string;
  price: string;
  status: "Filled" | "Cancelled" | "Pending";
}

export default function ActivityCard({
  pair,
  date,
  amount1,
  amount2,
  price,
  status,
}: Props) {
  const statusColor =
    status === "Filled"
      ? Colors.green
      : status === "Pending"
        ? Colors.yellow
        : Colors.red;

  const statusBg =
    status === "Filled"
      ? Colors.thinGreen
      : status === "Pending"
        ? Colors.thinYellow
        : Colors.thinRed;

  return (
    <View style={Style.card}>
      {/* Logo */}
      <View style={[Style.logo, { backgroundColor: statusBg }]}>
        <Paragraph
          text={status === "Filled" ? "L/B" : "L/S"}
          color={statusColor}
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

        {/* Second line */}
        <View style={Style.row}>
          <Paragraph text="Amount" size={14} />

          <View style={Style.row}>
            <Paragraph text={amount1} size={14} color={Colors.green} />
            <Paragraph text="/" size={14} />
            <Paragraph text={amount2} size={14} />
          </View>
        </View>

        {/* Third line */}
        <View style={Style.row}>
          <Paragraph text="Price" size={14} />
          <Paragraph text={price} size={14} />
        </View>

        {/* Fourth line */}
        <View style={Style.row}>
          <Paragraph text="Status" size={14} />

          <Paragraph text={status} size={14} color={statusColor} />
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
