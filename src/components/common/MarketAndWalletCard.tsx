import { StyleSheet, View } from "react-native";
import React from "react";
import Title from "./Title";

interface Props {
  icon: React.ReactNode;
  coin: string;
  coinShortCode: string;
  amount: string;
  price?: string;
  percentIncDec?: string;
}
const MarketAndWalletCard = ({
  icon,
  coin,
  coinShortCode,
  amount,
  price,
  percentIncDec,
}: Props) => {
  return (
    <View>
      <View>{icon}</View>
      <Title text={coin} />
    </View>
  );
};

export default MarketAndWalletCard;

const styles = StyleSheet.create({});
