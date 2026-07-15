// =============================================================================
// 🔔 PRICE ALERTS TYPES
// =============================================================================

export interface PriceAlertAsset {
  symbol: string;
  name: string;
}

export interface PriceAlertItem {
  id: string;
  userId: string;
  assetSymbol: string;
  direction: "above" | "below" | string;
  targetPriceUsd: number;
  isActive: boolean;
  triggeredAt: string | null;
  createdAt: string;
  asset?: PriceAlertAsset;
}

export interface PriceAlertsMeta {
  count: number;
  active: number;
}

export interface PriceAlertsResponse {
  data: PriceAlertItem[];
  meta: PriceAlertsMeta;
}

export interface CreatePriceAlertRequest {
  assetSymbol: string;
  direction: "above" | "below";
  targetPriceUsd: number;
}

export interface UpdatePriceAlertRequest {
  alertId: string;
  direction?: "above" | "below";
  targetPriceUsd?: number;
  isActive?: boolean;
}


// =============================================================================
// 📨 NOTIFICATIONS TYPES
// =============================================================================

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: "kyc" | "price_alert" | string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsMeta {
  count: number;
  unread: number;
}

export interface NotificationsResponse {
  data: NotificationItem[];
  meta: NotificationsMeta;
}

// market assets
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
  iconUrl: string; // 🖼️ Your image pointer string!
}

export interface MarketAssetsResponse {
  data: MarketAsset[];
  meta: {
    count: number;
  };
}