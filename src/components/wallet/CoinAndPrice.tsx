import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import Paragraph from "@/src/components/common/Paragraph";

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
          <Paragraph text={coin} textAlign="right" />
          <Paragraph text={coinCode} textAlign="right" />
        </View>
      </View>
      <View style={styles.right}>
        <Paragraph text={amount} textAlign="right" />
        <Paragraph text={`$${usdValue}`} textAlign="right" />
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
    marginBottom: 16,
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
