import { View, TouchableOpacity, StyleSheet } from "react-native";
import Paragraph from "@/src/components/common/Paragraph";
import ArrowRight from "@/assets/icons/main/foward.svg";
import { Colors } from "@/src/constants/colors";

interface Props {
  icon: React.ReactNode;
  label: string;
  value: string;
  onPress: () => void;
  borderBottom?: boolean;
}

export default function SettingsItem({ icon, label, value, borderBottom, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View>{icon}</View>
      <Paragraph text={label} size={14} color={Colors.mediumGray} />
      <View style={styles.right}>
        <Paragraph text={value} size={14} color={Colors.secondary} />
        <ArrowRight color={Colors.secondary} width={24} height={24}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tertiary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
