import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { router } from "expo-router";
import Title from "@/src/components/common/Title";
import { FontFamily } from "@/src/constants/fonts";
import SuccessIcon from "@/assets/icons/auth/success.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function SuccessScreen() {
  const onSubmit = () => {
    router.push("/");
  };
  return (
    <MySafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/auth/SuccessfulReg.png")}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />

      {/* Linear gradient at center */}
      <LinearGradient
        colors={["rgba(27,35,42,0)", "rgba(27,35,42,1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.centerGradient}
      />
      <View style={styles.topIcon}>
        <SuccessIcon width={106.05} height={249} />
      </View>

      <View style={styles.title}>
        <Title
          text="Your account has been successfully created!"
          color="white"
          size={32}
          fontFamily={FontFamily.bold}
          textAlign="center"
        />
      </View>

      <PrimaryButton
        text="Get Started"
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
    alignItems: "center",
    gap: 32,
  },
  topIcon: {
    marginTop: 65,
  },
  title: {
    marginBottom: 10,
  },
  centerGradient: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    height: 144,
    zIndex: 10,
  },
});
