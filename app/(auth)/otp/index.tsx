import { View, StyleSheet } from "react-native";
import React from "react";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import NavigateIconText from "@/src/components/common/NavigateIconText";
import { router } from "expo-router";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import OTPInput from "@/src/components/auth/OTPInput";
import ResendTimer from "@/src/components/auth/ResendTimer";

export default function OtpScreen() {
  const phoneNumber = "+1 234 567 8900"; // This would come from route params later
  const onSubmit = () => {
    router.push("/(auth)/success");
  };
  return (
    <MySafeAreaView style={styles.container}>
      <View style={styles.topIcon}>
        <NavigateIconText title="Verification" onClickIcon={router.back} />
      </View>

      <View style={styles.title}>
        <Title
          text="Enter your code"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
        />
      </View>

      <View>
        <Paragraph
          text="Please type the code we sent to"
          textAlign="left"
          size={14}
        />
      </View>

      {/* The phone number for route parameter */}
      <View>
        <Paragraph
          text={phoneNumber}
          textAlign="left"
          size={14}
          color={Colors.green}
        />
      </View>

      <View style={styles.inputWrapper}>
        <OTPInput
          length={4}
          onComplete={(code) => console.log("OTP entered:", code)}
        />
      </View>

      {/* Countdown + resend */}

      <ResendTimer seconds={30} onResend={() => console.log("Resend tapped")} />

      <View style={styles.buttonWrapper}>
        <PrimaryButton
          text="Continue"
          onPress={onSubmit}
          Bgcolor={Colors.green}
          textColor={Colors.darkText}
        />
      </View>
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
    alignItems: "center",
    justifyContent: "center",
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
  buttonWrapper: {
    marginTop: 55,
  },
});
