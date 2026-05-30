// src/components/trades/TradeHeader.tsx
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import AvatarIcon from "@/assets/icons/main/tminusProfile.svg";
import CandleIcon from "@/assets/icons/trade/arrowSwapHorizontal.svg";
import DollarIcon from "@/assets/icons/trade/dollarCircle.svg";
import StarIcon from "@/assets/icons/trade/star.svg";

export default function TradeHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AvatarIcon width={42} height={42} />
      </TouchableOpacity>

      <View style={styles.icons}>
        <TouchableOpacity>
          <CandleIcon color={Colors.green} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <DollarIcon color={Colors.green} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <StarIcon color={Colors.green} width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  icons: {
    flexDirection: "row",
    gap: 20,
  },
});