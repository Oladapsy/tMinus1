import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Arrowback from "@/assets/icons/profile/kyc/kycBack.svg";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import { useRouter } from "expo-router";
import IconAndText from "@/src/components/common/tab/IconAndText";

export type KycScreenIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 1. Uncomment and activate your TypeScript props interface
interface KycHeaderProps {
  screenIndex: KycScreenIndex;
  onBack?: () => void;
}

const STEPS_CONFIG = {
  0: {
    stepTracker: 0,
    title: "Verify to unlock limits",
    desc: "Complete identity verification from inside the app before high-value trading or withdrawals.",
  },
  1: {
    stepTracker: 0,
    title: "Account limits",
    desc: "Your verification level controls trade, withdrawal, and sandbox deposit access.",
  },
  2: {
    stepTracker: 1,
    title: "Identity details",
    desc: "Enter details exactly as they appear on your document.",
  },
  3: {
    stepTracker: 2,
    title: "Upload document",
    desc: "Use a clear photo. All corners should be visible and text readable.",
  },
  4: {
    stepTracker: 2,
    title: "Selfie check",
    desc: "Take a clear selfie so compliance can compare your face with your document.",
  },
  5: {
    stepTracker: 3,
    title: "Review submission",
    desc: "Check the details and files before sending them for admin review.",
  },
  6: {
    stepTracker: 3,
    title: "Review in progress",
    desc: "Your identity submission has been sent for manual review.",
  },
  7: {
    stepTracker: 3,
    title: "Verification approved",
    desc: "Your account limits have been upgraded.",
  },
  8: {
    stepTracker: 1,
    title: "Review needs attention",
    desc: "Compliance could not approve your submission yet.",
  },
};

// 2. Accept the screenIndex prop here
export default function KycHeader({ screenIndex, onBack }: KycHeaderProps) {
  const router = useRouter();

  // Look up the active configuration details based on the passed index
  const currentConfig = STEPS_CONFIG[screenIndex] || STEPS_CONFIG[0];
  const currentStep = currentConfig.stepTracker;

  // Visual tracking configuration for the steps
  const trackBubbles = [
    { id: 1, label: "Identity" },
    { id: 2, label: "Document" },
    { id: 3, label: "Review" },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header Region */}
      <View style={styles.header}>
        <View style={styles.icon}>
          <IconAndText icon={<Arrowback />} onPress={onBack ? onBack : () => router.back()} />
        </View>

        <View>
          {/* 3. Dynamically read the config title */}
          <Title
            text={currentConfig.title}
            color={Colors.newWhite}
            size={18}
            fontFamily={FontFamily.bold}
          />

          <View style={styles.paragraph}>
            {/* 4. Dynamically read the config description */}
            <Paragraph
              text={currentConfig.desc}
              textAlign="left"
              color={Colors.newSecondary}
              size={11}
              lineHeight={16}
            />
          </View>
        </View>
      </View>

      {/* 5. Conditional Stepper: Only displays when the wizard has officially begun (stepTracker > 0) */}
      {currentStep >= 0 && (
        <View style={styles.stepperContainer}>
          {trackBubbles.map((bubble, index) => {
            // 6. Use the dynamic step tracker state instead of a hardcoded value
            const isCompleted = currentStep > bubble.id || currentStep === 3;
            const isActive = currentStep === bubble.id && currentStep !== 3;

            const isLineCompleted = currentStep > bubble.id || (currentStep === 3);

            return (
              <React.Fragment key={bubble.id}>
                {/* Individual Step Circle + Label */}
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
                        isActive && styles.circleTextActive,
                        isCompleted && styles.circleTextCompleted,
                      ]}
                    >
                      {bubble.id}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.label,
                      (isActive || isCompleted) && styles.labelActive,
                    ]}
                  >
                    {bubble.label}
                  </Text>
                </View>

                {/* Line Bridge connecting to the next bubble */}
                {index < trackBubbles.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      isLineCompleted && styles.lineCompleted,
                    ]}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      )}
    </View>
  );
}

// ... styles stay exactly the same as your modified version!
const styles = StyleSheet.create({
  container: { marginTop: 20 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 15,
  },
  icon: {
    backgroundColor: Colors.newGrey,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
  },
  paragraph: { maxWidth: 250, marginTop: 4 },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  stepWrapper: { alignItems: "center", zIndex: 2 },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.newGrey,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  circleActive: {
    backgroundColor: "transparent",
    borderColor: Colors.green,
    borderWidth: 2,
  },
  circleCompleted: { backgroundColor: Colors.green, borderColor: Colors.green },
  circleText: {
    fontSize: 11,
    fontFamily: FontFamily.bold,
    color: Colors.newSecondary,
  },
  circleTextActive: { color: Colors.newWhite },
  circleTextCompleted: { color: "#080C11" },
  label: {
    fontSize: 10,
    fontFamily: FontFamily.regular,
    color: Colors.newSecondary,
    marginTop: 6,
  },
  labelActive: { color: Colors.newWhite, fontFamily: FontFamily.bold },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.newTertiary,
    marginTop: -16,
    marginHorizontal: -10,
    zIndex: 1,
  },
  lineCompleted: { backgroundColor: Colors.green },
});
