export type TradeType = "buy" | "sell" | "swap";

export type AssetSymbol =
  | "BTC" | "ETH" | "USDC" | "USDT" | "BNB" | "SOL" | "XRP" | "ADA"
  | "DOGE" | "AVAX" | "DOT" | "LTC" | "TRX" | "MATIC" | "LINK";

// 📝 Request body for creating a quote
export interface CreateQuoteRequest {
  type: TradeType;
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
}

// ⏱️ Response shape for quotes (POST /trade/quotes & GET /trade/quotes/{id})
export interface TradeQuote {
  id: string;
  type: TradeType;
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  feeAmount: number;
  expiresAt: string;
  expiresInSeconds: number;
  isExpired: boolean;
}

export interface CreateQuoteResponse {
  data: TradeQuote;
}

// 🔒 Request body for processing execution
export interface ExecuteTradeRequest {
  quoteId: string;
  pin: string;
}

// 🎉 Response shapes for completed transactions
export interface TransactionDetails {
  id: string;
  userId: string;
  type: TradeType;
  status: "completed" | "failed" | "pending";
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
  toAmount: number;
  feeAmount: number;
  rate: number;
  reference: string;
  note: string;
  createdAt: string;
  completedAt: string;
}

export interface WalletBalanceItem {
  assetSymbol: string;
  available: number;
  locked: number;
}

export interface WalletDepositAddress {
  assetSymbol: string;
  network: string;
  address: string;
  qrPayload: string;
}

export interface WalletSnapshot {
  id: string;
  userId: string;
  fiatCurrency: string;
  depositAddresses: WalletDepositAddress[];
  balances: WalletBalanceItem[];
}

export interface ExecuteTradeResponse {
  data: {
    transaction: TransactionDetails;
    wallet: WalletSnapshot;
  };
}