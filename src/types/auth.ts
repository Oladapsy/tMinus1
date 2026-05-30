// --- 1. Request Payloads ---

export interface ValidateSignupRequest {
  email?: string;
  phone?: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  loginType: "email" | "phone";
  identifier: string; // The email or phone string
  password: string;
}

// --- 2. Inner Nested Data Models ---

export interface ValidationField {
  value: string;
  normalized: string;
  valid: boolean;
  available: boolean;
  code: string;
  message: string;
}

export interface UserLimits {
  depositPerTransactionUsd: number;
  tradePerTransactionUsd: number;
  withdrawalPerTransactionUsd: number;
  dailyWithdrawalUsd: number;
}

export interface UserVerification {
  status: "not_started" | "pending" | "approved" | "rejected";
  tier: string;
  level: number;
  label: string;
  limits: UserLimits;
  canTrade: boolean;
  canWithdraw: boolean;
  canUseSandboxDeposits: boolean;
}

export interface UserSettings {
  language: string;
  fiatCurrency: string;
  theme: "system" | "light" | "dark";
  pushNotifications: boolean;
  biometricEnabled: boolean;
}

export interface UserData {
  id: string;
  role: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  twoFactorEnabled: boolean;
  kycStatus: "not_started" | "pending" | "approved" | "rejected";
  verification: UserVerification;
  avatarUrl: string | null;
  watchlist: string[];
  settings: UserSettings;
  createdAt: string;
}

// --- 3. Complete Server Responses ---

export interface ValidateSignupResponse {
  email?: ValidationField;
  phone?: ValidationField;
  canRegister: boolean;
}

export interface RegisterResponse {
  user: UserData;
  emailVerificationRequired: boolean;
  nextStep: "verify_email" | "dashboard" | string;
  otp: {
    requestPath: string;
    verifyPath: string;
    expiresInSeconds: number;
  };
}

export interface LoginAndSessionResponse {
  user: UserData;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string;
  expiresInSeconds: number;
  refreshTokenExpiresAt: string;
}

export interface LogoutResponse {
  loggedOut: boolean;
}

// --- 4. The Standard Top-Level Core Response Wrapper ---
export interface BackendResponse<T> {
  data: T;
}
