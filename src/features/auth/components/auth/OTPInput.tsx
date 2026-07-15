import { useRef, useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface Props {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function OTPInput({ length = 6, onComplete }: Props) {
  // Synchronize base configuration sizing maps when length changes down from parent routes
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  
  useEffect(() => {
    setOtp(Array(length).fill(""));
  }, [length]);

  // useRef stores a direct reference to each physical input box
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Sanitize entries cleanly to numerical inputs only
    const cleanText = text.replace(/[^0-9]/g, "");
    
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp); 

    // Auto-advance to next box if string possesses actual numerical values
    if (cleanText && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Fire onComplete when all slots are explicitly allocated 
    const combinedString = newOtp.join("");
    if (combinedString.length === length) {
      onComplete?.(combinedString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Go back on backspace if box is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = ""; // Clear out preceding cell context value instantly
      setOtp(newOtp);
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
          style={[
            styles.box, 
            digit ? styles.boxFilled : null,
            // Dynamically scale down text size if rendering 6 character formats to prevent text clippings
            length > 4 ? { fontSize: 24 } : { fontSize: 32 }
          ]}
          value={digit}
          onChangeText={(text) => handleChange(text.slice(-1), index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          selectionColor={Colors.secondary}
          cursorColor={Colors.green}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // Use an absolute safe gap threshold to allow flex spacing rules to handle sizing grids fluidly
    gap: 10,
    marginTop: 40,
    width: "100%",
    justifyContent: "space-between",
  },
  box: {
    // flex: 1 tells layout to divide space proportionally without pushing components off screen edges
    flex: 1,
    height: 54,
    backgroundColor: Colors.tabDark || "#1F2C37", 
    borderRadius: 12,
    fontFamily: FontFamily.bold,
    color: "white",
    borderWidth: 1.5,
    borderColor: "transparent", 
  },
  boxFilled: {
    borderColor: Colors.green || "#00E676", // Highlights neatly whenever active values exist
  },
});