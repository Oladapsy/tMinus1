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
        amount="32,697.05"
        usdValue="$468,554.23"
      />
      <CoinAndPrice
        icon={<BitCoinIcon />}
        coin="BITCOIN"
        coinCode="BTC"
        amount="32,697.05"
        usdValue="$468,554.23"
      />
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
    container: {
    }
});
