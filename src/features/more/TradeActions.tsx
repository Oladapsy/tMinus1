// src/components/home/QuickActions.tsx
import { Colors } from "@/src/constants/colors";
import { StyleSheet, View } from "react-native";

// import your SVG icons
import GridTradingIcon from "@/assets/icons/home/gridTrading.svg";
import LiquidSwapIcon from "@/assets/icons/home/liquidSwap.svg";
import MarginIcon from "@/assets/icons/home/margin.svg";
import ConvertIcon from "@/assets/icons/home/menu/convert.svg";
import SpotIcon from "@/assets/icons/home/menu/Spot.svg";
import KycIcon from "@/assets/icons/profile/kyc/kyc.svg";
import { useRouter } from "expo-router";
import IconGrid, { IconGridItem } from "../shared/components/tab/IconGrid";

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
