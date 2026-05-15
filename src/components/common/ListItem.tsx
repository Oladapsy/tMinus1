import { View, TouchableOpacity, StyleSheet } from "react-native";
import Paragraph from "@/src/components/common/Paragraph";
import ArrowRight from "@/assets/icons/main/foward.svg";
import { Colors } from "@/src/constants/colors";

interface Props {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  onPress: () => void;
  borderBottom?: boolean;
}

export default function ListItem({
  icon,
  label,
  value,
  borderBottom = true,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.row, borderBottom && styles.borderBottom]}
      onPress={onPress}
    >
      <View style={styles.left}>
        {icon && <View>{icon}</View>}
        <Paragraph text={label} size={14} color={Colors.mediumGray} />
      </View>

      <View style={styles.right}>
        {value && (
          <Paragraph text={value} size={14} color={Colors.secondary} />
        )}
        <ArrowRight color={Colors.secondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 18,
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.thinWhite,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
