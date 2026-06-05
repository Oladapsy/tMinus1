import { ImageBackground, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycHeader from "@/src/components/kyc/KycHeader";

export default function Index() {
  // const [screenIndex, setScreenIndex] = useState<number>(0); 

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <MySafeAreaView style={styles.safeContainer}>
          <KycHeader />

          <ScrollView showsVerticalScrollIndicator={false}>
             {/* Content templates for the specific screens go down here */}
          </ScrollView>
        </MySafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  image: { width: "100%", height: "100%" },
  safeContainer: { flex: 1, backgroundColor: "transparent", paddingHorizontal: 18 }
});