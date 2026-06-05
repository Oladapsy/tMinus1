import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import KycCheckItem from "@/src/components/kyc/KycCheckItem";
import PrimaryButton from "../../common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export default function KycScreen5({ onNext }: { onNext: () => void }) {
  // Simple fake system states: 'analyzing' -> 'success'
  const [matchStatus, setMatchStatus] = useState<"analyzing" | "success">("analyzing");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatchStatus("success");
    }, 2200); // Fakes checking processing lag for 2.2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      
      {/* 1. CENTRAL FACE MATCH SCANNER */}
      <View style={styles.centerScannerContainer}>
        <View style={styles.outerRadarRing}>
          <View style={[
            styles.innerMatchCircle,
            matchStatus === "success" && styles.innerMatchCircleSuccess
          ]}>
            {matchStatus === "analyzing" ? (
              <View style={styles.loadingColumn}>
                <ActivityIndicator size="small" color={Colors.green} />
                <Text style={styles.matchText}>Analyzing...</Text>
              </View>
            ) : (
              <View style={styles.loadingColumn}>
                <Ionicons name="shield-checkmark" size={28} color={Colors.green} style={{ marginBottom: 4 }} />
                <Text style={styles.matchText}>Face match</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 2. COMPLIANCE CHECKLIST ITEMS */}
      <View style={styles.checklistWrapper}>
        <KycCheckItem label="Good lighting" />
        <KycCheckItem label="No sunglasses or masks" />
        <KycCheckItem label="Use your own document" />
      </View>

      {/* 3. FOOTER CONTROL ACTION ACTION BUTTON */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={matchStatus === "analyzing" ? "Verifying match..." : "Upload selfie"}
          onPress={onNext}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
          fontSize={13}
          style={{ fontFamily: FontFamily.bold }}
          disabled={matchStatus === "analyzing"} // Disables interactions until process finishes cleanly
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  centerScannerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  outerRadarRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(34, 197, 94, 0.1)", // Soft green outer aura tint
    justifyContent: "center",
    alignItems: "center",
  },
  innerMatchCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.newDark,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  innerMatchCircleSuccess: {
    borderColor: Colors.green, // Highlights fully solid once matched successfully
    backgroundColor: "rgba(20, 34, 28, 0.9)",
  },
  loadingColumn: {
    alignItems: "center",
    gap: 8,
  },
  matchText: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    textAlign: "center",
  },
  checklistWrapper: {
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    paddingBottom: 24,
    marginTop: 40,
  },
});