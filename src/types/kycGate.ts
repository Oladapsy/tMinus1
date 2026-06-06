export type GlobalKycStatus =
  | "NOT_STARTED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface UserKycProfile {
  status: GlobalKycStatus;
  currentTier: number;
  tradeLimit: number;
  withdrawalLimit: number;
}
