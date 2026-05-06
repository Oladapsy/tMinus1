import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import NavigateIconText from "@/src/components/common/NavigateIconText";
import { router } from "expo-router";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";

export default function SignUpMobile() {
  const [phone, setPhone] = useState("");
  const onSubmit = () => {
    router.push("/(auth)/otp")
  };

  return (
    <MySafeAreaView style={styles.container}>
      <View style={styles.topIcon}>
        <NavigateIconText title="Sign Up" onClickIcon={router.back} />
      </View>

      <View style={styles.title}>
        <Title
          text="Register with mobile"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
        />
      </View>

      <View>
        <Paragraph
          text="Please type your number, then we'll send a verification code for authentication."
          textAlign="left"
          size={14}
        />
      </View>

      {/* Mobile Input and button */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputHeader}>
          <Paragraph
            text="Mobile Number"
            textAlign="left"
            color={Colors.lightGray}
            size={14}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your mobile"
          placeholderTextColor={Colors.secondary}
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

        <PrimaryButton
          text="Send OTP"
          onPress={onSubmit}
          Bgcolor={Colors.green}
          textColor={Colors.darkText}
        />
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 24,
  },
  topIcon: {
    marginTop: 5,
  },
  title: {
    marginTop: 26,
    marginBottom: 16,
  },
  inputWrapper: {
    marginTop: 47,
  },
  inputHeader: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 14,
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    marginBottom: 56,
    height: 54,
  },
});
