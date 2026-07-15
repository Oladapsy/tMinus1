import { StyleSheet, View, TextInput, ActivityIndicator, Text } from "react-native";
import React, { useState } from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import NavigateIconText from "@/src/components/common/NavigateIconText";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useLocalSearchParams, router } from "expo-router";
// 🌟 Import your brand new OTP request mutation hook
import { useRegisterCustomerMutation, useRequestEmailOtpMutation } from "@/src/features/auth/api/authApi";

export default function SetupProfileScreen() {
  const { email, phone } = useLocalSearchParams<{ email: string; phone: string }>();
  
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [registerUser, { isLoading: isRegistering }] = useRegisterCustomerMutation();
  // 🌟 Initialize the OTP mutation hook
  const [requestOtp, { isLoading: isSendingOtp }] = useRequestEmailOtpMutation();

  const handleRegister = async () => {
    setError(null);
    if (!fullName || !password) {
      setError("Please fill out your name and choose a secure password.");
      return;
    }

    try {
      // 1. Submit form values to register the account profile record
      const response = await registerUser({
        fullName: fullName.trim(),
        email: email,
        phone: phone,
        password: password,
      }).unwrap();

      // 2. If backend confirms registration profile created but needs a verification token:
      if (response.data?.emailVerificationRequired) {
        
        // 🌟 CRITICAL FIX: Trigger the backend to actually generate and send the OTP to this email!
        await requestOtp({ email: email }).unwrap();

        // 3. Cleanly transition user forward with the contextual parameters preserved
        router.push({
          pathname: "/(auth)/otp",
          params: { email: email },
        });
      }
    } catch (err: any) {
      setError(
        err?.data?.error?.message || 
        err?.data?.message || 
        "Registration failed. Please try again."
      );
    }
  };

  // Combine both mutation loading states to prevent button spamming
  const isGlobalLoading = isRegistering || isSendingOtp;

  return (
    <MySafeAreaView style={styles.container}>
      <NavigateIconText title="Back" onClickIcon={router.back} />

      <View style={styles.titleContainer}>
        <Title text="Complete Profile" color="white" size={32} fontFamily={FontFamily.bold} />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Full Name Input */}
      <View style={styles.inputWrapper}>
        <Paragraph text="Full Name" textAlign="left" color={Colors.lightGray} size={14} />
        <TextInput
          style={styles.input}
          placeholder="e.g. Ada Student"
          placeholderTextColor={Colors.secondary}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <Paragraph text="Password" textAlign="left" color={Colors.lightGray} size={14} />
        <TextInput
          style={styles.input}
          placeholder="Choose a strong password"
          placeholderTextColor={Colors.secondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.btnSpacing}>
        {isGlobalLoading ? (
          <ActivityIndicator size="large" color={Colors.green} />
        ) : (
          <PrimaryButton
            text="Complete Registration"
            onPress={handleRegister}
            Bgcolor={Colors.green}
            textColor={Colors.darkText}
          />
        )}
      </View>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.primary, flex: 1, paddingHorizontal: 24 },
  titleContainer: { marginTop: 26, marginBottom: 16 },
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
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginTop: 10 },
  btnSpacing: { marginTop: 40 },
});