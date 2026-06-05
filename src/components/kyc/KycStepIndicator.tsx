import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface KycStepIndicatorProps {
  currentStep: 0 | 1 | 2 | 3; // the kyc steps
}

export default function KycStepIndicator({ currentStep }: KycStepIndicatorProps) {
  // If we are on Step 0 (Intro / Status landing screens), hide the step indicators completely
  if (currentStep === 0) return null;

  const steps = [
    { id: 1, label: "Identity" },
    { id: 2, label: "Document" },
    { id: 3, label: "Review" },
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <React.Fragment key={step.id}>
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.circle,
                  isActive && styles.circleActive,
                  isCompleted && styles.circleCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    (isActive || isCompleted) && styles.circleTextActive,
                  ]}
                >
                  {step.id}
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  (isActive || isCompleted) && styles.labelActive,
                ]}
              >
                {step.label}
              </Text>
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  currentStep > step.id && styles.lineCompleted,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  stepWrapper: { alignItems: "center", zIndex: 2 },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  circleActive: { backgroundColor: "transparent", borderColor: Colors.green, borderWidth: 2 },
  circleCompleted: { backgroundColor: Colors.green, borderColor: Colors.green },
  circleText: { fontSize: 12, fontFamily: FontFamily.bold, color: Colors.secondary },
  circleTextActive: { color: "white" },
  label: { fontSize: 11, fontFamily: FontFamily.regular, color: Colors.secondary, marginTop: 6 },
  labelActive: { color: "white", fontFamily: FontFamily.medium },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.tertiary,
    marginTop: -18,
    marginHorizontal: -10,
    zIndex: 1,
  },
  lineCompleted: { backgroundColor: Colors.green },
});