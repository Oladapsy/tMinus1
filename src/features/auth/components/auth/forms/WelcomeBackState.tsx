import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import TitleAndParagraph from "@/src/features/shared/components/TitleAndParagraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import EyeIcon from "@/assets/icons/wallet/eye-slash.svg";
import EyeOpenIcon from "@/assets/icons/wallet/eye-open.svg";
import Title from "@/src/features/shared/components/Title";
import Paragraph from "@/src/features/shared/components/Paragraph";
import PrimaryButton from "@/src/features/shared/components/PrimaryButton";

interface WelcomeBackProps {
  savedName: string;
  hasSavedEmail: boolean;
  emailValue: string;
  onEmailChange: (text: string) => void;
  passwordValue: string;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
}

export default function WelcomeBackState({
  savedName,
  hasSavedEmail,
  emailValue,
  onEmailChange,
  passwordValue,
  onPasswordChange,
  onSubmit,
}: WelcomeBackProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <TitleAndParagraph
          title="Welcome back"
          titleSize={32}
          paragraphSize={18}
        />
      </View>

      {/* Avatar Head */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>
            {savedName && hasSavedEmail
              ? savedName.charAt(0).toUpperCase()
              : "A"}
          </Text>
        </View>
      </View>

      <View style={styles.titleSection}>
        <Title
          text={hasSavedEmail ? savedName : "Sign in to your session"}
          size={20}
        />
        <Paragraph
          text="Use password or Face ID approved on this device."
          size={12}
        />
      </View>

      {/* 🌟 FALLBACK EMAIL INPUT: Shows up dynamically if Redux user storage is empty */}
      {!hasSavedEmail && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email or phone</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Enter your email address"
              placeholderTextColor={Colors.secondary}
              value={emailValue}
              onChangeText={onEmailChange}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>
      )}

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputFlex}
            placeholder="••••••••"
            placeholderTextColor={Colors.secondary}
            secureTextEntry={!showPassword}
            value={passwordValue}
            onChangeText={onPasswordChange}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOpenIcon color={Colors.secondary} width={20} height={20} />
            ) : (
              <EyeIcon color={Colors.secondary} width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          text="Sign in"
          Bgcolor={Colors.green}
          textColor={Colors.darkText}
          onPress={onSubmit}
          disabled={!passwordValue || (!hasSavedEmail && !emailValue)}
        />

        <PrimaryButton
          text="Use Face ID"
          Bgcolor={Colors.tertiary}
          textColor={Colors.newWhite}
          onPress={() => console.log("FaceID pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    marginTop: 40,
  },
  avatarContainer: {
    marginTop: 40,
    marginBottom: 16,
    alignItems: "center",
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: {
    color: Colors.primary,
    fontSize: 36,
    fontFamily: FontFamily.bold,
  },
  sessionName: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    color: Colors.secondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
  },
  inputFlex: {
    flex: 1,
    color: "white",
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  footer: {
    width: "100%",
    gap: 12,
    marginTop: 16,
  },
  faceIdText: {
    color: "white",
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
});
