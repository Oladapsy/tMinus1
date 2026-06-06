import { ImageBackground, StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import KycHeader, { KycScreenIndex } from "@/src/components/kyc/KycHeader";
import KycScreen1 from "@/src/components/kyc/screen/KycScreen1";
import KycScreen2 from "@/src/components/kyc/screen/KycScreen2";
import KycScreen3 from "@/src/components/kyc/screen/KycScreen3";
import KycScreen4 from "@/src/components/kyc/screen/KycScreen4";
import KycScreen5 from "@/src/components/kyc/screen/KycScreen5";
import KycScreen6 from "@/src/components/kyc/screen/KycScreen6";
import KycStatusScreen from "@/src/components/kyc/screen/KycStatusScreen";

interface KycCollectedData {
  name: string;
  country: string;
  docType: string;
}

export default function Index() {
  const router = useRouter();
  const [screenIndex, setScreenIndex] = useState<KycScreenIndex>(0);

  // The central state bucket to hold data values safely across screen unmounts
  const [kycData, setKycData] = useState<KycCollectedData>({
    name: "",
    country: "",
    docType: "",
  });

  const handleBackNavigation = () => {
    if (screenIndex === 0) {
      // If we are at the very first step, exit the KYC section completely
      router.back();
    } else if (screenIndex === 6 || screenIndex === 7 || screenIndex === 8) {
      // If they are viewing status results, back button takes them safely back to the review state
      setScreenIndex(5);
    } else {
      // Standard backward step decrement
      setScreenIndex((prev) => (prev - 1) as KycScreenIndex);
    }
  };

  // Calculates what step index layout value to visually feed the header dots
  const getHeaderIndex = (): KycScreenIndex => {
    if (screenIndex === 5) {
      // FORCE Step 3 to show as ACTIVE (open ring), not completed yet!
      // In STEPS_CONFIG, index 5 currently has stepTracker: 3. Let's keep it that way,
      // but we will make KycHeader interpret it cleanly.
      return 5;
    }
    if (screenIndex === 6 || screenIndex === 7) {
      // Force step 3 to stay fully lit green for pending (6) and success (7) statuses!
      return 6; // We'll point this to 6 so it handles completion clearly
    }
    if (screenIndex === 8) {
      // Force step 2 and 3 down to grey inactive state for rejected (8) status view
      return 8;
    }
    return screenIndex;
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <MySafeAreaView style={styles.safeContainer}>
          <KycHeader
            screenIndex={getHeaderIndex()}
            onBack={handleBackNavigation}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            {screenIndex === 0 && (
              <KycScreen1 onNext={() => setScreenIndex(1)} />
            )}
            {screenIndex === 1 && (
              <KycScreen2 onNext={() => setScreenIndex(2)} />
            )}

            {/* SCREEN 3: Intercept form data here and i stored it, then advance index to 3 */}
            {screenIndex === 2 && (
              <KycScreen3
                onNext={(formData) => {
                  setKycData(formData);
                  setScreenIndex(3);
                }}
              />
            )}

            {screenIndex === 3 && (
              <KycScreen4 onNext={() => setScreenIndex(4)} />
            )}
            {screenIndex === 4 && (
              <KycScreen5 onNext={() => setScreenIndex(5)} />
            )}

            {/* SCREEN 6: Feed the stored kycData directly into your review component rows */}
            {screenIndex === 5 && (
              <KycScreen6
                userData={kycData}
                onSubmit={() => setScreenIndex(6)}
              />
            )}

            {screenIndex === 6 && (
              <KycStatusScreen
                status="pending"
                onAction={() => setScreenIndex(7)} // Routes to SUCCESS screen status for testing
              />
            )}
            {screenIndex === 7 && (
              <KycStatusScreen
                status="success"
                onAction={() => setScreenIndex(8)} // Routes to REJECTED screen status for testing
              />
            )}
            {screenIndex === 8 && (
              <KycStatusScreen
                status="rejected"
                onAction={() => setScreenIndex(2)} // Loops back to Screen 3 form so they can resubmit!
              />
            )}
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
