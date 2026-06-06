import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Paragraph from "@/src/components/common/Paragraph";
import { useRouter } from "expo-router";
import { GlobalKycStatus } from "@/src/types/kycGate";
import TradeNoKyc from "../trades/lite/TradeNoKyc";

interface KycGateGuardProps {
  status: GlobalKycStatus;
  gateType: "trades" | "wallets";
  children: React.ReactNode; // The actual screen content if unlocked
}

export default function KycGateGuard({
  status,
  gateType,
  children,
}: KycGateGuardProps) {
  const router = useRouter();

  // If user is completely verified and approved, show the actual underlying screen!
  if (status === "APPROVED") {
    return <>{children}</>;
  }

  const handleGateAction = () => {
    // Navigates to kyc
    router.push("/profile/kyc");
  };

  // --- CASE A: HANDLES THE TRADES/BUY LOCKOUT 
  if (
    gateType === "trades" &&
    (status === "NOT_STARTED" || status === "REJECTED")
  ) {
    return (
      <TradeNoKyc/>
    );
  }

  // --- CASE B: HANDLES THE WALLETS PENDING REVIEW STATE 
  if (gateType === "wallets" && status === "PENDING") {
    return (
      <View style={styles.lockContainer}>
        {/* Placeholder rendering for whatever standard underlying UI values sit behind */}
        <View style={styles.disabledPreviewPlaceholder}>
          <Text style={styles.placeholderText}>Withdraw USDT</Text>
          <Text style={styles.placeholderSub}>920.00 USDT</Text>
        </View>

        <View style={styles.lockBox}>
          <Text style={styles.warningBadgeText}>Withdrawal unavailable</Text>
          <View style={styles.descMargin}>
            <Paragraph
              text="Your KYC is under review. Withdrawals unlock after approval."
              color={Colors.newSecondary}
              size={13}
              textAlign="left"
              lineHeight={18}
            />
          </View>
          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>Current withdrawal limit</Text>
            <Text style={styles.limitValue}>$0</Text>
          </View>
        </View>

        <PrimaryButton
          text="View verification status"
          onPress={handleGateAction}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
        />
      </View>
    );
  }

  // Fallback default state handler container if conditions slip through
  return <>{children}</>;
}

const styles = StyleSheet.create({
  lockContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
    paddingBottom: 24,
  },
  lockBox: {
    backgroundColor: Colors.newDark || "#0F141C",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  lockBadgeText: {
    color: Colors.newRed || "#FF4D4D",
    fontSize: 16,
    fontFamily: FontFamily.bold,
    marginBottom: 12,
  },
  warningBadgeText: {
    color: Colors.newRed || "#FF4D4D",
    fontSize: 14,
    fontFamily: FontFamily.bold,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  descMargin: { marginBottom: 24 },
  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    paddingTop: 16,
  },
  limitLabel: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  limitValue: {
    color: Colors.newRed || "#FF4D4D",
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  disabledPreviewPlaceholder: {
    opacity: 0.3,
    marginBottom: "auto",
    marginTop: 40,
  },
  placeholderText: { color: "#FFF", fontSize: 24, fontFamily: FontFamily.bold },
  placeholderSub: { color: Colors.newSecondary, fontSize: 14, marginTop: 4 },
});
