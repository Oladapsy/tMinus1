import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";

interface SignInFailedProps {
  savedEmail: string;
  errorMessage: string;
  onTryAgain: () => void;
}

export default function SignInFailedState({ savedEmail, errorMessage, onTryAgain }: SignInFailedProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleLeftAlignment}>
        <TitleAndParagraph title="Sign in failed" titleSize={32} />
      </View>

      {/* ERROR CARD CONTAINER */}
      <View style={styles.errorAlertBox}>
        <Text style={styles.errorHeader}>Invalid login details</Text>
        <Text style={styles.errorDescription}>{errorMessage}</Text>
      </View>

      {/* READ-ONLY INPUTS LOCKOUT PRESENTATION */}
      <View style={styles.disabledFieldsGroup}>
        <TextInput style={styles.disabledInput} value={savedEmail} editable={false} />
        <TextInput style={styles.disabledInput} value="••••••••" secureTextEntry editable={false} />
      </View>

      <View style={styles.footer}>
        <PrimaryButton text="Try again" Bgcolor={Colors.green} textColor={Colors.newBlack} onPress={onTryAgain} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  titleLeftAlignment: { alignSelf: "flex-start", marginTop: 40 },
  errorAlertBox: {
    backgroundColor: "rgba(255, 77, 77, 0.08)",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginTop: 32,
  },
  errorHeader: { color: "#FF4D4D", fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  errorDescription: { color: Colors.secondary, fontSize: 14, lineHeight: 20 },
  disabledFieldsGroup: { width: "100%", gap: 16, marginTop: 24, opacity: 0.4 },
  disabledInput: {
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "white",
  },
  footer: { width: "100%", marginTop: 40 },
});