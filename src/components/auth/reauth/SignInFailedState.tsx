import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface SignInFailedProps {
  savedEmail: string;
  errorMessage: string;
  onTryAgain: () => void;
}

export default function SignInFailedState({ 
  savedEmail, 
  errorMessage, 
  onTryAgain 
}: SignInFailedProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleLeftAlignment}>
        <TitleAndParagraph title="Sign in failed" titleSize={32} />
      </View>

      {/* ERROR ALERT BOX MATCHING FIGMA SPEC */}
      <View style={styles.errorAlertBox}>
        <Text style={styles.errorHeader}>Invalid login details</Text>
        <Text style={styles.errorDescription}>{errorMessage}</Text>
      </View>

      {/* IMMUTABLE FIELD PREVIEWS */}
      <View style={styles.disabledFieldsGroup}>
        <View style={styles.fieldContainer}>
          <Text style={styles.inputLabel}>Email or phone</Text>
          <TextInput 
            style={styles.disabledInput} 
            value={savedEmail} 
            editable={false} 
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            style={styles.disabledInput} 
            value="••••••••" 
            secureTextEntry 
            editable={false} 
          />
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          text="Try again" 
          Bgcolor={Colors.green} 
          textColor={Colors.newBlack || Colors.darkText} 
          onPress={onTryAgain} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  titleLeftAlignment: { alignSelf: "flex-start", marginTop: 40 },
  errorAlertBox: {
    backgroundColor: "rgba(38, 24, 24, 0.7)",
    borderColor: "rgba(255, 77, 77, 0.15)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginTop: 32,
  },
  errorHeader: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontFamily: FontFamily.bold, 
    marginBottom: 6 
  },
  errorDescription: { 
    color: "#A3A3A3", 
    fontSize: 14, 
    fontFamily: FontFamily.regular,
    lineHeight: 20 
  },
  disabledFieldsGroup: { 
    width: "100%", 
    gap: 20, 
    marginTop: 32 
  },
  fieldContainer: {
    width: "100%",
  },
  inputLabel: {
    color: Colors.secondary || "#A3A3A3",
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
    paddingLeft: 4,
  },
  disabledInput: {
    backgroundColor: Colors.newDark || "#1E1E1E",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#666666",
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  footer: { width: "100%", marginTop: 48 },
});