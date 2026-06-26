import { StyleSheet, Text, TouchableOpacity, } from "react-native";
import React from "react";

interface Props {
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export default function SocialButton({ text, icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {icon}
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    height: 54,
    width: 173,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
