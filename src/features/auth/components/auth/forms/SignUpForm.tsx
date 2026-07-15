import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useState } from "react";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "../../common/Paragraph";
import { Colors } from "@/src/constants/colors";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { router } from "expo-router";
import { useValidateSignupMutation } from "@/src/services/authApi";
import SocialLoginButton from "../SocialLoginButton";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    global?: string;
  }>({});

  const [validateSignup, { isLoading }] = useValidateSignupMutation();

  const handleValidation = async () => {
    setErrors({});
    if (!email || !phone) {
      setErrors({
        global: "Please fill in both email and phone number fields.",
      });
      return;
    }

    try {
      const response = await validateSignup({
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      }).unwrap();

      const {
        email: emailStatus,
        phone: phoneStatus,
        canRegister,
      } = response.data;

      if (!canRegister) {
        setErrors({
          email:
            emailStatus && !emailStatus.available
              ? emailStatus.message
              : undefined,
          phone:
            phoneStatus && !phoneStatus.available
              ? phoneStatus.message
              : undefined,
        });
        return;
      }

      // Everything is available! Pass these verified values to the next setup step
      router.push({
        pathname: "/(auth)/signup/setup-profile",
        params: { email, phone },
      });
    } catch (err: any) {
      setErrors({
        global:
          err?.data?.error?.message || "Validation failed. Please try again.",
      });
    }
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <Title
          text="Sign up"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
        />
      </View>

      {errors.global && <Text style={styles.errorText}>{errors.global}</Text>}

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <Paragraph
          text="Email Address"
          textAlign="left"
          color={Colors.lightGray}
          size={14}
        />
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Enter your email"
          placeholderTextColor={Colors.secondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
      </View>

      {/* Phone Input */}
      <View style={styles.inputWrapper}>
        <Paragraph
          text="Mobile Number"
          textAlign="left"
          color={Colors.lightGray}
          size={14}
        />
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : null]}
          placeholder="+2348010000001"
          placeholderTextColor={Colors.secondary}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.fieldError}>{errors.phone}</Text>}
      </View>

      <View style={styles.btnSpacing}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.green} />
        ) : (
          <PrimaryButton
            text="Sign up"
            onPress={handleValidation}
            Bgcolor={Colors.green}
            textColor={Colors.darkText}
          />
        )}
      </View>

      <View style={styles.extraText}>
        <Paragraph text="Or login with" color={Colors.secondary} size={14} />
      </View>

      <SocialLoginButton />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  inputWrapper: { marginTop: 20 },
  input: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 14,
    color: "white",
    fontFamily: FontFamily.regular,
    fontSize: 14,
    height: 54,
    marginTop: 8,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  fieldError: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    fontFamily: FontFamily.regular,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 8,
    textAlign: "center",
  },
  btnSpacing: {
    marginTop: 40,
  },
  extraText: {
    marginTop: 20,
  },
});
