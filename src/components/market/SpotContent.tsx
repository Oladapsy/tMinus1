import { StyleSheet, FlatList } from "react-native";
import React from "react";
import { marketData, MarketItem } from "@/src/data/marketData";
import MarketCoinItem from "./MarketCoinItem";

const SpotContent = () => {
  return (
    <FlatList<MarketItem>
      data={marketData}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MarketCoinItem
          icon={item.icon}
          coin={item.coin}
          coinCode={item.coinCode}
          price={item.price}
          percentage={item.percentage}
          positive={item.positive}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

export default SpotContent;

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 120,
  },
});