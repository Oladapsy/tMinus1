// src/components/auth/OTPInput.tsx
import { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function OTPInput({ length = 4, onComplete }: Props) {
  // first i want to create an array of empty strings with the length of the OTP
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  // useRef stores a direct reference to each physical input box
  // so i can call .focus() on them programmatically. It doesn't cause re-renders.
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp); 

    // Auto-advance to next box
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Fire onComplete when all filled
    if (newOtp.every((d) => d !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Go back on backspace if box is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={[styles.box, digit ? styles.boxFilled : null]}
          value={digit}
          onChangeText={(text) => handleChange(text.slice(-1), index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          selectionColor={Colors.secondary}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 33,
    marginTop: 40,
  },
  box: {
    width: 60,
    height: 54,
    backgroundColor: Colors.tabDark,
    borderRadius: 12,
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: "white",
    borderWidth: 0,
    borderColor: Colors.tabDark, // default border color
  },
  boxFilled: {
    borderColor: Colors.tabDark, 
  },
});
