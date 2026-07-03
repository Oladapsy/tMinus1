export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  network: string;
  priceUsd: number;
  change24h: number;
  isActive: boolean;
  minBuyUsd: number;
  minSellUsd: number;
  iconUrl: string;
  sparkline?: { time: string; priceUsd: number }[];
}

export interface MarketAssetListResponse {
  data: MarketAsset[];
  meta: {
    count: number;
  };
}

export interface TrendingResponse {
  data: MarketAsset[];
  meta: {
    count: number;
    include: string[];
    featured?: {
      type: string;
      symbol: string;
      name: string;
      priceUsd: number;
      change24h: number;
      reason: string;
    };
  };
}

export interface AssetDetails {
  id: string;
  symbol: string;
  name: string;
  network: string;
  priceUsd: number;
  change24h: number;
  isActive: boolean;
  minBuyUsd: number;
  minSellUsd: number;
  iconUrl: string;
  stats: {
    marketCapUsd: number;
    volume24hUsd: number;
    circulatingSupply: number;
    maxSupply: number;
    allTimeHighUsd: number;
    high24hUsd: number;
    low24hUsd: number;
    volumeToMarketCapRatio: number;
    about: string;
    websiteUrl: string;
    explorerUrl: string;
  };
  chart: { time: string; priceUsd: number }[];
}

export interface OrderLevel {
  priceUsd: number;
  amount: number;
  total: number;
}

export interface OrderBookData {
  midPriceUsd: number;
  spreadUsd: number;
  bids: OrderLevel[];
  asks: OrderLevel[];
}

export interface OrderBookMeta {
  symbol: string;
  levels: number;
}

export interface MarketOrderBookResponse {
  data: OrderBookData;
  meta: OrderBookMeta;
}

export interface TradeItemPayload {
  id: string;
  side: "buy" | "sell";
  priceUsd: number;
  amount: number;
  totalUsd: number;
  createdAt: string;
}

export interface RecentTradesResponse {
  data: TradeItemPayload[];
}