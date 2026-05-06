import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import EyeIcon from "@/assets/icons/wallet/eye-slash.svg";
import EyeOpenIcon from "@/assets/icons/wallet/eye-open.svg";
import { useState } from "react";
import PrimaryButton from "../../common/PrimaryButton";
import Paragraph from "../../common/Paragraph";

interface AuthFormProps {
  // Field config
  fieldLabel: string; // "Email" | "Mobile Number"
  fieldPlaceholder: string; // "Enter your email" | "Enter your mobile"
  fieldKeyboardType?: "email-address" | "phone-pad" | "default";

  // Toggle link (top right)
  toggleLinkText: string; // "Sign in with mobile" | "Register with mobile"
  onToggleLink: () => void;

  // Options
  showForgotPassword?: boolean;

  // CTA button
  buttonText: string; // "Sign in" | "Sign up"
  onSubmit: () => void;
}

export default function AuthForm({
  fieldLabel,
  fieldPlaceholder,
  fieldKeyboardType = "default",
  toggleLinkText,
  onToggleLink,
  showForgotPassword = false,
  buttonText,
  onSubmit,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Email / Mobile row */}
      <View style={styles.labelRow}>
        <Paragraph text={fieldLabel} textAlign="left" />

        <TouchableOpacity onPress={onToggleLink}>
          <Text style={styles.toggleLink}>{toggleLinkText}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder={fieldPlaceholder}
        placeholderTextColor={Colors.secondary}
        keyboardType={fieldKeyboardType}
        autoCapitalize="none"
        value={fieldValue}
        onChangeText={setFieldValue}
      />

      {/* Password */}

      {/* Text */}
      <Paragraph text="Password" textAlign="left" />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputFlex}
          placeholder="Enter your password"
          placeholderTextColor={Colors.secondary}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOpenIcon color={Colors.secondary} width={20} height={20} />
          ) : (
            <EyeIcon color={Colors.secondary} width={20} height={20} />
          )}
        </TouchableOpacity>
      </View>

      {/* Forgot password — only on sign in */}
      {showForgotPassword && (
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      )}

      <PrimaryButton
        text={buttonText}
        onPress={onSubmit}
        Bgcolor={Colors.green}
        textColor={Colors.darkText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, gap: 8 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  toggleLink: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  input: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 14,
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    marginBottom: 16,
    height: 54,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 8,
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 14,
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  forgot: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    marginVertical: 8,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  primaryBtnText: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
});
