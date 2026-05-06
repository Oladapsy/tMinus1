// src/components/auth/ResendTimer.tsx
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  seconds?: number;
  onResend?: () => void;
}

export default function ResendTimer({ seconds = 30, onResend }: Props) {
  const [countdown, setCountdown] = useState(seconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    // if React re-renders before the timer finishes, cancel the old timer.
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(seconds);
    setCanResend(false);
    onResend?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Resend code ({countdown})
      </Text>
      <TouchableOpacity onPress={handleResend} disabled={!canResend}>
        <Text style={[styles.link, !canResend && styles.linkDisabled]}>
          Resend Link
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    gap: 4,
  },
  text: {
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  link: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  linkDisabled: {
    opacity: 0.4,
  },
});