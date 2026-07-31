// src/components/home/QuickActions.tsx
import { View, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";

// import your SVG icons
import SavingsIcon from "@/assets/icons/home/savings.svg";
import StakingIcon from "@/assets/icons/home/menu/staking.svg";
import PayIcon from "@/assets/icons/home/menu/pay.svg";
import CryptoLoanIcon from "@/assets/icons/home/menu/cryptoLoans.svg";
import PoolIcon from "@/assets/icons/home/menu/pool.svg";
import ETHIcon from "@/assets/icons/home/menu/eth.svg";
import LaunchPadIcon from "@/assets/icons/home/launchPad.svg";
import IconGrid, { IconGridItem } from "../shared/components/tab/IconGrid";

const ACTIONS: IconGridItem[] = [
  {
    icon: <SavingsIcon width={48} height={48} color={Colors.green} />,
    label: "Savings",
    onPress: () => {},
  },
  {
    icon: <StakingIcon width={48} height={48} color={Colors.green} />,
    label: "Staking",
    onPress: () => {},
  },
  {
    icon: <PayIcon width={48} height={48} color={Colors.green} />,
    label: "Pay",
    onPress: () => {},
  },
  {
    icon: <CryptoLoanIcon width={48} height={48} color={Colors.green} />,
    label: "Crypto Loans",
    onPress: () => {},
  },
  {
    icon: <PoolIcon width={48} height={48} color={Colors.green} />,
    label: "Pool",
    onPress: () => {},
  },
  {
    icon: <ETHIcon width={48} height={48} color={Colors.green} />,
    label: "ETH 2.0",
    onPress: () => {},
  },
  {
    icon: <LaunchPadIcon width={48} height={48} color={Colors.green} />,
    label: "Lunchpad",
    onPress: () => {},
  },
];

export default function FinanceActions() {
  return (
    <View style={styles.container}>
      <IconGrid
        items={ACTIONS}
        title="Finance"
        showTitleDivider={true}
        columns={4}
        containerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
