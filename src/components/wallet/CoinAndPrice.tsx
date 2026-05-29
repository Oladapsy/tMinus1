import { StyleSheet, View } from "react-native";
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
  showBalance: boolean;
};

const CoinAndPrice = ({ icon, coin, coinCode, amount, usdValue, showBalance }: Props) => {
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
          <Paragraph text={showBalance ? amount : "********"} textAlign="left" color="white" size={14} fontFamily={FontFamily.bold}/>
        <Paragraph text={showBalance ? `$${usdValue}` : "********"} textAlign="right" size={14} />
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
    marginLeft: 13,
  },
  right: {
    alignItems: "flex-end",
  },
});
