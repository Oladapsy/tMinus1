export interface WalletItem {
  id: string;
  icon: React.ReactNode;
  coin: string;
  coinCode: string;
  amount: string;
  usdValue: string;
}

// new screen

export type WalletWorkflowMode =
  | "dashboard"
  | "deposit_selector"
  | "usdt_deposit";

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

export interface Balance {
  assetSymbol: string;
  available: number;
  locked: number;
}

export interface DepositAddress {
  assetSymbol: string;
  network: string;
  address: string;
  qrPayload: string;
}

export interface WalletData {
  id: string;
  userId: string;
  fiatCurrency: string;
  depositAddresses: DepositAddress[];
  balances: Balance[];
}

export interface WalletResponse {
  data: {
    wallet: WalletData;
    portfolioValueUsd: number;
    portfolioValue: number;
    portfolioCurrency: string;
    verification: {
      status: string;
      tier: string;
      level: number;
      label: string;
      limits: {
        depositPerTransactionUsd: number;
        tradePerTransactionUsd: number;
        withdrawalPerTransactionUsd: number;
        dailyWithdrawalUsd: number;
      };
      canTrade: boolean;
      canWithdraw: boolean;
      canUseSandboxDeposits: boolean;
    };
  };
}

export interface PortfolioHistoryItem {
  time: string;
  valueUsd: number;
  value: number;
  currency: string;
}

export interface PortfolioHistoryResponse {
  data: PortfolioHistoryItem[];
  meta: {
    count: number;
    range: "1D" | "1W" | "1M" | "1Y";
    latestValueUsd: number;
    latestValue: number;
    currency: string;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  type: "buy" | "sell" | "swap" | "deposit" | "withdrawal" | "transfer";
  status: "pending" | "completed" | "failed" | "cancelled";
  fromAsset?: string;
  toAsset?: string;
  fromAmount?: number;
  toAmount?: number;
  assetSymbol?: string; // fallback fields for native transactions
  amount?: number;
  feeAmount?: number;
  rate?: number;
  reference: string;
  note?: string;
  createdAt: string;
  completedAt?: string | null;
}

export interface TransactionListResponse {
  data: Transaction[];
  meta: { count: number };
}

export interface SimulateDepositRequest {
  amount: number;
  settlementDelaySeconds: number;
}

export interface SimulateDepositResponse {
  data: {
    transaction: Transaction;
    wallet: WalletData;
    estimatedCompletionAt: string;
    pollingUrl: string;
  };
}

export interface WithdrawalRequest {
  assetSymbol: string;
  amount: number;
  address: string;
  network: string;
}

export interface WithdrawalResponse {
  data: {
    id: string;
    userId: string;
    assetSymbol: string;
    amount: number;
    feeAssetAmount: number;
    address: string;
    network: string;
    status: "pending" | "completed" | "failed";
    createdAt: string;
  };
}
