export interface WalletItem {
  id: string;
  icon: React.ReactNode;
  coin: string;
  coinCode: string;
  amount: string;
  usdValue: string;
}

// new screen

export type WalletWorkflowMode = "dashboard" | "deposit_selector" | "usdt_deposit";

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  network: string;
  value: number;
  balance: number;
  dotColor: string;
  recommended?: boolean;
}