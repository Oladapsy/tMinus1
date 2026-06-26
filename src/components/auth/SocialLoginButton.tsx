import { View, StyleSheet } from "react-native";
import React from "react";
import SocialButton from "@/src/components/auth/SocialButton";
import FacebookIcon from "@/assets/icons/auth/fb.svg";
import GoogleIcon from "@/assets/icons/auth/tMinusgoogle.svg";

export default function SocialLoginButton() {
  const handleFb = () => {
    console.log("Facebook button pressed");
  };

  const handleGoogle = () => {
    console.log("Google button pressed");
  };

  return (
    <View style={styles.container}>
      <SocialButton
        text="Facebook"
        icon={<FacebookIcon />}
        onPress={handleFb}
      />
      <SocialButton
        text="Google"
        icon={<GoogleIcon />}
        onPress={handleGoogle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
});
