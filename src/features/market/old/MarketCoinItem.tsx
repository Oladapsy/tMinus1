import { StyleSheet, View } from "react-native";
import React, { ComponentType } from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Graph from "@/assets/icons/market/greenGraph.svg";
import RedGraph from "@/assets/icons/market/redGraph.svg";
import { SvgProps } from "react-native-svg";
import Paragraph from "../../shared/components/Paragraph";

type Props = {
  icon: ComponentType<SvgProps>;
  coin: string;
  coinCode: string;
  price: string;
  percentage: string;
  positive: boolean;
};

const MarketCoinItem = ({
  icon: Icon,
  coin,
  coinCode,
  price,
  percentage,
  positive,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.left}>
        <Icon width={40} height={40} />
        <View style={styles.coinInfo}>
          <Paragraph
            text={coin}
            textAlign="left"
            color="white"
            size={14}
            fontFamily={FontFamily.bold}
          />
          <Paragraph text={coinCode} textAlign="left" size={14} />
        </View>
      </View>

      {/* Graph */}
      <View style={styles.graph}>{positive ? <Graph /> : <RedGraph />}</View>

      {/* Right */}
      <View style={styles.right}>
        <Paragraph
          text={`$${price}`}
          textAlign="right"
          color="white"
          size={14}
          fontFamily={FontFamily.bold}
        />

        <Paragraph
          text={percentage}
          textAlign="right"
          size={14}
          color={positive ? Colors.green : Colors.red}
        />
      </View>
    </View>
  );
};

export default MarketCoinItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.thinWhite,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  coinInfo: {
    marginLeft: 13,
  },
  graph: {
    flex: 1,
    alignItems: "center",
    marginLeft: 85,
  },

  right: {
    flex: 1,
    alignItems: "flex-end",
  },
});
