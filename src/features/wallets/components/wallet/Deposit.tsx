import { FlatList, StyleSheet} from "react-native";
import React from "react";
import CoinAndPrice from "./CoinAndPrice";
import { walletData } from "@/src/data/walletData";

type Props = {
  showBalance: boolean;
};
const Deposit = ({ showBalance }: Props) => {
  return (
    <FlatList
      data={walletData}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CoinAndPrice
          icon={item.icon}
          coin={item.coin}
          coinCode={item.coinCode}
          amount={item.amount}
          usdValue={item.usdValue}
          showBalance={showBalance}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

export default Deposit;

const styles = StyleSheet.create({
    container: {
      paddingBottom: 40,
    }
});
