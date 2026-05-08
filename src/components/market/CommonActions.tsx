// src/components/home/QuickActions.tsx
import { View, StyleSheet } from "react-native";
import IconGrid, { IconGridItem } from "@/src/components/common/tab/IconGrid";
import { Colors } from "@/src/constants/colors";

// import your SVG icons
import DepositIcon from "@/assets/icons/home/deposit.svg";
import ReferralIcon from "@/assets/icons/home/referal.svg";
import Transfer from "@/assets/icons/home/menu/transfer.svg";
import Orders from "@/assets/icons/home/menu/order.svg";

const ACTIONS: IconGridItem[] = [
  {
    icon: <Transfer width={48} height={48} color={Colors.green} />,
    label: "Transfer",
    onPress: () => {},
  },
  {
    icon: <DepositIcon width={48} height={48} color={Colors.green} />,
    label: "Deposit",
    onPress: () => {},
  },
  {
    icon: <Orders width={48} height={48} color={Colors.green} />,
    label: "Orders",
    onPress: () => {},
  },
  {
    icon: <ReferralIcon width={48} height={48} color={Colors.green} />,
    label: "Referral",
    onPress: () => {},
  },
];

export default function CommonActions() {
  return (
    <View style={styles.container}>
      <IconGrid
        items={ACTIONS}
        title="Common"
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
