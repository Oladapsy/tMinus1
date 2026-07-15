import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface WalletFallbackStateProps {
  icon: string;
  isErrorType?: boolean;
  title: string;
  paragraph: string;
  actionText: string;
  onActionPress: () => void;
}

export default function WalletFallbackState({
  icon,
  isErrorType = false,
  title,
  paragraph,
  actionText,
  onActionPress,
}: WalletFallbackStateProps) {
  return (
    <View style={styles.fallbackCenterBox}>
      {/* Icon Circle */}
      <View
        style={isErrorType ? styles.errorIconCircle : styles.emptyIconCircle}
      >
        <Text style={isErrorType ? styles.errorIconText : styles.emptyIconText}>
          {icon}
        </Text>
      </View>

      {/* Styled Centered Text Content */}
      <View style={styles.textWrapper}>
        <Title
          text={title}
          color="white"
          size={18}
          fontFamily={FontFamily.bold}
          textAlign="center"
        />
        <View style={{ marginTop: 8 }}>
          <Paragraph
            text={paragraph}
            color={Colors.secondary}
            size={13}
            fontFamily={FontFamily.regular}
            textAlign="center"
            lineHeight={18}
          />
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.stateActionButton}
        onPress={onActionPress}
      >
        <Text style={styles.stateActionButtonText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fallbackCenterBox: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(94, 213, 168, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyIconText: {
    color: Colors.green,
    fontSize: 28,
    fontFamily: FontFamily.medium,
  },
  errorIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 77, 77, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  errorIconText: {
    color: Colors.newRed,
    fontSize: 28,
    fontFamily: FontFamily.bold,
  },
  textWrapper: {
    width: "100%",
    alignItems: "center",
  },
  stateActionButton: {
    backgroundColor: Colors.green,
    height: 48,
    width: "100%",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  stateActionButtonText: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
});
