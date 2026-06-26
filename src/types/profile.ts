export interface ProfileLimits {
  depositPerTransactionUsd: number;
  tradePerTransactionUsd: number;
  withdrawalPerTransactionUsd: number;
  dailyWithdrawalUsd: number;
}

export interface ProfileVerification {
  status: string;
  tier: string;
  level: number;
  label: string;
  limits: ProfileLimits;
  canTrade: boolean;
  canWithdraw: boolean;
  canUseSandboxDeposits: boolean;
}

export interface ProfileSettings {
  language: string;
  fiatCurrency: string;
  theme: string;
  pushNotifications: boolean;
  biometricEnabled: boolean;
}

export interface ProfileData {
  id: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  twoFactorEnabled: boolean;
  kycStatus: "pending" | "approved" | "rejected";
  verification: ProfileVerification;
  avatarUrl: string | null;
  watchlist: string[];
  settings: ProfileSettings;
  createdAt: string;
}

// Global API response envelopes ✉️
export interface ProfileResponse {
  data: ProfileData;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdatePinRequest {
  currentPin: string;
  newPin: string;
}

export interface UpdatePinResponse {
  data: {
    updated: boolean;
  };
}