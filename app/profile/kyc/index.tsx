import { ImageBackground, StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycHeader, {KycScreenIndex} from "@/src/components/kyc/KycHeader";
import KycScreen1 from "@/src/components/kyc/screen/KycScreen1";
import KycScreen2 from "@/src/components/kyc/screen/KycScreen2";
import KycScreen3 from "@/src/components/kyc/screen/KycScreen3";
import KycScreen4 from "@/src/components/kyc/screen/KycScreen4";
import KycScreen5 from "@/src/components/kyc/screen/KycScreen5";
import KycScreen6 from "@/src/components/kyc/screen/KycScreen6";
import KycScreen7 from "@/src/components/kyc/screen/KycScreen7";
import KycScreen8 from "@/src/components/kyc/screen/KycScreen8";

// Define the data structure matching your KycScreen3 Zod outputs
interface KycCollectedData {
  name: string;
  country: string;
  docType: string;
}

export default function Index() {
  const [screenIndex, setScreenIndex] = useState<KycScreenIndex>(0);

  // The central state bucket to hold data values safely across screen unmounts
  const [kycData, setKycData] = useState<KycCollectedData>({
    name: "",
    country: "",
    docType: "",
  });

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <MySafeAreaView style={styles.safeContainer}>
          <KycHeader screenIndex={screenIndex} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {screenIndex === 0 && <KycScreen1 onNext={() => setScreenIndex(1)} />}
            {screenIndex === 1 && <KycScreen2 onNext={() => setScreenIndex(2)} />}
            
            {/* SCREEN 3: Intercept form data here and store it, then advance index to 3 */}
            {screenIndex === 2 && (
              <KycScreen3 
                onNext={(formData) => {
                  setKycData(formData);
                  setScreenIndex(3);
                }} 
              />
            )}
            
            {screenIndex === 3 && <KycScreen4 onNext={() => setScreenIndex(4)} />}
            {screenIndex === 4 && <KycScreen5 onNext={() => setScreenIndex(5)} />}
            
            {/* SCREEN 6: Feed the stored kycData directly into your review component rows */}
            {screenIndex === 5 && (
              <KycScreen6 
                userData={kycData}
                onSubmit={() => setScreenIndex(6)} 
              />
            )}
            
            {screenIndex === 6 && <KycScreen7 onNext={() => setScreenIndex(7)} />}
            {screenIndex === 7 && <KycScreen8 onNext={() => setScreenIndex(8)} />}
          </ScrollView>
        </MySafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  image: { width: "100%", height: "100%" },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 18,
  },
});