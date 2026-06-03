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
import { useRegisterCustomerMutation } from "@/src/services/authApi";

export default function SetupProfileScreen() {
  const { email, phone } = useLocalSearchParams<{ email: string; phone: string }>();
  
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [registerUser, { isLoading }] = useRegisterCustomerMutation ();

  const handleRegister = async () => {
    setError(null);
    if (!fullName || !password) {
      setError("Please fill out your name and choose a secure password.");
      return;
    }

    try {
      const response = await registerUser({
        fullName: fullName.trim(),
        email: email,
        phone: phone,
        password: password,
      }).unwrap();

      // Backend returns nextStep: "verify_email" along with the paths to request/verify OTP
      if (response.data?.emailVerificationRequired) {
        router.push({
          pathname: "/(auth)/otp",
          params: { email: email },
        });
      }
    } catch (err: any) {
      setError(err?.data?.error?.message || "Registration failed. Please try again.");
    }
  };

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
        {isLoading ? (
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