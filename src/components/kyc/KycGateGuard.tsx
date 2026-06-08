import { GlobalKycStatus } from "@/src/types/kycGate";
import React from "react";
import TradeNoKyc from "../trades/lite/TradeNoKyc";
import WalletPendingKyc from "../wallet/lite/WalletPendingKyc";

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
  // If user is completely verified and approved, show the actual underlying screen!
  if (status === "APPROVED") {
    return <>{children}</>;
  }

  // --- CASE A: HANDLES THE TRADES/BUY LOCKOUT
  if (
    gateType === "trades" &&
    (status === "NOT_STARTED" || status === "REJECTED")
  ) {
    return <TradeNoKyc />;
  }

  // --- CASE B: HANDLES THE WALLETS PENDING REVIEW STATE
  if (gateType === "wallets" && status === "PENDING") {
    return <WalletPendingKyc />;
  }

  // Fallback default state handler container if conditions slip through
  return <>{children}</>;
}
