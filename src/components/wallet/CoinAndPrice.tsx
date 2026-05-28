import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import Paragraph from "@/src/components/common/Paragraph";
import { FontFamily } from "@/src/constants/fonts";

type Props = {
  icon: React.ReactNode;
  coin: string;
  coinCode: string;
  amount: string;
  usdValue: string;
};

const CoinAndPrice = ({ icon, coin, coinCode, amount, usdValue }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon}
        <View style={styles.coinInfo}>
          <Paragraph text={coin} textAlign="left" color="white" size={14} fontFamily={FontFamily.bold}/>
          <Paragraph text={coinCode} textAlign="left" size={14} />
        </View>
      </View>
      <View style={styles.right}>
          <Paragraph text={amount} textAlign="left" color="white" size={14} fontFamily={FontFamily.bold}/>
        <Paragraph text={`$${usdValue}`} textAlign="right" size={14} />
      </View>
    </View>
  );
};

export default CoinAndPrice;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderBottomColor: Colors.thinWhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinInfo: {
    marginLeft: 8,
  },
  right: {
    alignItems: "flex-end",
  },
});
