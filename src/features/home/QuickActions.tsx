// src/components/home/QuickActions.tsx
import { View, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";

// import your SVG icons
import DepositIcon from "@/assets/icons/home/deposit.svg";
import ReferralIcon from "@/assets/icons/home/referal.svg";
import GridTradingIcon from "@/assets/icons/home/gridTrading.svg";
import MarginIcon from "@/assets/icons/home/margin.svg";
import LaunchpadIcon from "@/assets/icons/home/launchPad.svg";
import SavingsIcon from "@/assets/icons/home/savings.svg";
import LiquidSwapIcon from "@/assets/icons/home/liquidSwap.svg";
import MoreIcon from "@/assets/icons/home/more.svg";
import { router } from "expo-router";
import IconGrid, { IconGridItem } from "../shared/components/tab/IconGrid";

const ACTIONS: IconGridItem[] = [
  {
    icon: <DepositIcon width={48} height={48} color={Colors.green} />,
    label: "Deposit",
    onPress: () => {},
  },
  {
    icon: <ReferralIcon width={48} height={48} color={Colors.green} />,
    label: "Referral",
    onPress: () => {},
  },
  {
    icon: <GridTradingIcon width={48} height={48} color={Colors.green} />,
    label: "Grid Trading",
    onPress: () => {},
  },
  {
    icon: <MarginIcon width={48} height={48} color={Colors.green} />,
    label: "Margin",
    onPress: () => {},
  },
  {
    icon: <LaunchpadIcon width={48} height={48} color={Colors.green} />,
    label: "Launchpad",
    onPress: () => {},
  },
  {
    icon: <SavingsIcon width={48} height={48} color={Colors.green} />,
    label: "Savings",
    onPress: () => {},
  },
  {
    icon: <LiquidSwapIcon width={48} height={48} color={Colors.green} />,
    label: "Liquid Swap",
    onPress: () => {},
  },
  {
    icon: <MoreIcon width={48} height={48} color={Colors.green} />,
    label: "More",
    onPress: () => {router.push("/home/Menu")},
  },
];

export default function QuickActions() {
  return (
    <View style={styles.container}>
      <IconGrid
        items={ACTIONS}
        columns={4}
        showCellBorders={true}
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
