import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import CalloutBox from "@/src/components/common/CalloutBox";

interface SignInFailedProps {
  savedEmail: string;
  errorMessage: string;
  onTryAgain: () => void;
}

export default function SignInFailedState({
  savedEmail,
  errorMessage,
  onTryAgain,
}: SignInFailedProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleLeftAlignment}>
        <TitleAndParagraph title="Sign in failed" titleSize={28} />
      </View>

      <CalloutBox
        title="Invalid login details"
        paragraph={errorMessage}
        titleSize={18}
        paddingTop={30}
        paddingBottom={30}
      />

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
          textColor={Colors.newBlack}
          onPress={onTryAgain}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  titleLeftAlignment: {
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 30,
  },
  disabledFieldsGroup: {
    width: "100%",
    gap: 20,
    marginTop: 32,
  },
  fieldContainer: {
    width: "100%",
  },
  inputLabel: {
    color: Colors.secondary,
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
    color: Colors.newWhite,
    fontFamily: FontFamily.regular,
    fontSize: 15,
  },
  footer: { width: "100%", marginTop: 48 },
});
