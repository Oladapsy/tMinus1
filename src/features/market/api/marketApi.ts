import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MarketAssetListResponse,
  TrendingResponse,
  AssetDetails,
  MarketCandlesResponse,
  MarketOrderBookResponse,
  RecentTradesResponse,
  LivePriceFeedResponse,
} from "../../../types/market";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/market`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Assets", "Trending", "OrderBook", "Candles", "Trades", "Prices"],
  endpoints: (builder) => ({
    // 🔍 GET /market/assets
    getMarketAssets: builder.query<
      MarketAssetListResponse,
      {
        q?: string;
        page?: number;
        limit?: number;
        sort?: string;
        order?: string;
        include?: string;
      } | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.q) {
          searchParams.append("q", params.q);
          searchParams.append("search", params.q);
        }
        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.sort) searchParams.append("sort", params.sort);
        if (params?.order) searchParams.append("order", params.order);
        if (params?.include) searchParams.append("include", params.include);

        return `assets?${searchParams.toString()}`;
      },
      providesTags: ["Assets"],
    }),

    // 🔥 GET /market/trending
    getTrendingAssets: builder.query<
      TrendingResponse,
      { include?: "sparkline" | "none" } | void
    >({
      query: (params) => `trending?include=${params?.include || "sparkline"}`,
      providesTags: ["Trending"],
    }),

    // 🪙 GET /market/assets/{symbol}
    getAssetDetails: builder.query<{ data: AssetDetails }, string>({
      query: (symbol) => `assets/${symbol.toUpperCase()}`,
    }),

    // 🕯️ GET /market/assets/{symbol}/candles
    getAssetCandles: builder.query<
      MarketCandlesResponse,
      {
        symbol: string;
        interval?: "1m" | "5m" | "15m" | "1h" | "1d";
        limit?: number;
      }
    >({
      query: ({ symbol, interval = "1m", limit = 50 }) =>
        `assets/${symbol.toUpperCase()}/candles?interval=${interval}&limit=${limit}`,
      providesTags: ["Candles"],
    }),

    // 📊 GET /market/assets/{symbol}/order-book
    getMarketOrderBook: builder.query<
      MarketOrderBookResponse,
      { symbol: string; levels?: number }
    >({
      query: ({ symbol, levels = 12 }) =>
        `assets/${symbol.toUpperCase()}/order-book?levels=${levels}`,
      providesTags: ["OrderBook"],
    }),

    // 🤝 GET /market/assets/{symbol}/trades
    getRecentTrades: builder.query<
      RecentTradesResponse,
      { symbol: string; limit?: number }
    >({
      query: ({ symbol, limit = 30 }) =>
        `assets/${symbol.toUpperCase()}/trades?limit=${limit}`,
      providesTags: ["Trades"],
    }),

    // 💵 GET /market/prices
    getLivePrices: builder.query<LivePriceFeedResponse, void>({
      query: () => "prices",
      providesTags: ["Prices"],
    }),
  }),
});

export const {
  useGetMarketAssetsQuery,
  useGetTrendingAssetsQuery,
  useGetAssetDetailsQuery,
  useGetAssetCandlesQuery,
  useGetMarketOrderBookQuery,
  useGetRecentTradesQuery,
  useGetLivePricesQuery,
} = marketApi;
