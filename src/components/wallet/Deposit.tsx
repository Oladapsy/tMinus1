import { StyleSheet, View } from "react-native";
import React from "react";
import CoinAndPrice from "./CoinAndPrice";
import BitCoinIcon from "@/assets/icons/home/coin/btc.svg";

const Deposit = () => {
  return (
    <View style={styles.container}>
      <CoinAndPrice
        icon={<BitCoinIcon />}
        coin="BITCOIN"
        coinCode="BTC"
        amount="678899"
        usdValue="999999"
      />
      <CoinAndPrice
        icon={<BitCoinIcon />}
        coin="BITCOIN"
        coinCode="BTC"
        amount="989999"
        usdValue="99909"
      />
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    }
});
