import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Index() {
  return (
    <View>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.image}
      >
        <Text>index</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
