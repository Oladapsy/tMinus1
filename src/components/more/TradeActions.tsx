// src/components/home/QuickActions.tsx
import { View, StyleSheet } from "react-native";
import IconGrid, { IconGridItem } from "@/src/components/common/tab/IconGrid";
import { Colors } from "@/src/constants/colors";

// import your SVG icons
import SpotIcon from "@/assets/icons/home/menu/Spot.svg";
import GridTradingIcon from "@/assets/icons/home/gridTrading.svg";
import ConvertIcon from "@/assets/icons/home/menu/convert.svg";
import MarginIcon from "@/assets/icons/home/margin.svg";
import LiquidSwapIcon from "@/assets/icons/home/liquidSwap.svg";
import KycIcon from "@/assets/icons/profile/kyc/kyc.svg";
import { useRouter } from "expo-router";


export default function TradeActions() {
  const nativeRouter = useRouter();


const ACTIONS: IconGridItem[] = [
  {
    icon: <ConvertIcon width={48} height={48} color={Colors.green} />,
    label: "Convert",
    onPress: () => {},
  },
  {
    icon: <SpotIcon width={48} height={48} color={Colors.green} />,
    label: "Spot",
    onPress: () => {},
  },
  {
    icon: <MarginIcon width={48} height={48} color={Colors.green} />,
    label: "Margin",
    onPress: () => {},
  },
  {
    icon: <GridTradingIcon width={48} height={48} color={Colors.green} />,
    label: "Grid Trading",
    onPress: () => {},
  },
  {
    icon: <LiquidSwapIcon width={48} height={48} color={Colors.green} />,
    label: "Liquid Swap",
    onPress: () => {},
  },
  {
    icon: <KycIcon width={36} height={48} color={Colors.green} />,
    label: "KYC",
    onPress: () => {
      nativeRouter.push("/profile/kyc");
    },
  },
];

  return (
    <View style={styles.container}>
      <IconGrid
        items={ACTIONS}
        title="Trade"
        showTitleDivider={true}
        columns={4}
        containerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.red,
  },
});
