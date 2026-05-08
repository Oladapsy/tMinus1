// src/components/common/IconAndText.tsx
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface IconAndTextProps {
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export default function IconAndText({
  icon,
  label,
  onPress,
  labelStyle,
  containerStyle,
}: IconAndTextProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
      activeOpacity={onPress ? 0.7 : 1} // no opacity effect if not pressable
    >
      {icon}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 0,
  },
  label: {
    color: Colors.mediumGray,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    textAlign: "center",
  },
});
