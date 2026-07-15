import { GlobalKycStatus } from "@/src/features/kyc/utils/types/kycGate";
import React from "react";
import TradeNoKyc from "../trades/lite/TradeNoKyc";
import WalletPendingKyc from "../wallet/lite/WalletPendingKyc";

interface KycGateGuardProps {
  status: GlobalKycStatus;
  gateType: "trades" | "wallets";
  children: React.ReactNode;
}

export default function KycGateGuard({
  status,
  gateType,
  children,
}: KycGateGuardProps) {
  // 🟢 CASE 1: Completely verified and clear to go
  if (status === "APPROVED") {
    return <>{children}</>;
  }

  // 🟡 CASE 2: Pending review state (Locks both or specific views)
  if (status === "PENDING") {
    if (gateType === "wallets") {
      return <WalletPendingKyc />;
    }
    // Optional: return the TradePendingKyc view
    // Otherwise, it falls through to blocking them.
    return <TradeNoKyc />;
  }

  // 🔴 CASE 3: Not started, rejected, or needs attention
  if (
    status === "NOT_STARTED" ||
    status === "REJECTED" ||
    status === "NEEDS_ATTENTION"
  ) {
    if (gateType === "wallets") {
      // 🌟 FIXED: Blocks unauthorized wallet access instead of slipping through to children
      return <WalletPendingKyc />;
    }
    return <TradeNoKyc />;
  }

  // 🔒 Safety Lock: If any unexpected status comes down, default block them out.
  return <WalletPendingKyc />;
}
