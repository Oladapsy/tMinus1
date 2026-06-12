import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface WelcomeBackProps {
  savedName: string;
  passwordValue: string;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
}

export default function WelcomeBackState({
  savedName,
  passwordValue,
  onPasswordChange,
  onSubmit,
}: WelcomeBackProps) {
  return (
    <View style={styles.container}>
      {/* AVATAR HEADER */}
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarLetter}>{savedName.charAt(0).toUpperCase()}</Text>
      </View>

      <View style={styles.titleSection}>
        <TitleAndParagraph
          title="Welcome back"
          titleSize={32}
          paragraph={`Ada ${savedName}`}
          paragraphSize={16}
        />
        <Text style={styles.subParagraph}>
          Use password or Face ID approved on this device.
        </Text>
      </View>

      {/* INPUT FIELD */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••"
          placeholderTextColor={Colors.secondary}
          secureTextEntry
          value={passwordValue}
          onChangeText={onPasswordChange}
        />
      </View>

      {/* ACTIONS */}
      <View style={styles.actionSection}>
        <PrimaryButton
          text="Sign in"
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
          onPress={onSubmit}
        />
        <PrimaryButton
          text="Use Face ID"
          Bgcolor={Colors.newDark}
          textColor={Colors.newWhite}
          style={styles.faceIdBtn}
          onPress={() => console.log("Face ID triggered")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  avatarLetter: { color: Colors.newBlack, fontSize: 28, fontFamily: FontFamily.bold },
  titleSection: { alignItems: "center", marginTop: 24, width: "100%" },
  subParagraph: {
    color: Colors.secondary,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: "center",
    marginTop: 8,
  },
  inputWrapper: { width: "100%", marginTop: 40 },
  inputLabel: { color: Colors.secondary, fontSize: 12, marginBottom: 8, fontFamily: FontFamily.regular },
  passwordInput: {
    backgroundColor: Colors.newDark,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "white",
    fontSize: 16,
  },
  actionSection: { width: "100%", marginTop: 40, gap: 12 },
  faceIdBtn: { marginTop: 4 },
});