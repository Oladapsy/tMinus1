export const NOTIFICATION_FILTERS = [
  { label: "All", value: "all" },
  { label: "KYC", value: "kyc" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdrawal", value: "withdrawal" },
  { label: "Security", value: "security" },
  { label: "Unread", value: "unread" },
] as const;

export type NotificationFilterType =
  (typeof NOTIFICATION_FILTERS)[number]["value"];
