import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MarketAssetListResponse,
  TrendingResponse,
  AssetDetails,
  MarketOrderBookResponse,
  RecentTradesResponse,
} from "../types/market";

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
  tagTypes: ["Assets", "Trending", "OrderBook"],
  endpoints: (builder) => ({
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

    getTrendingAssets: builder.query<
      TrendingResponse,
      { include?: "sparkline" | "none" } | void
    >({
      query: (params) => `trending?include=${params?.include || "sparkline"}`,
      providesTags: ["Trending"],
    }),

    getAssetDetails: builder.query<{ data: AssetDetails }, string>({
      query: (symbol) => `assets/${symbol.toUpperCase()}`,
    }),

    // 📊 ADDED: Order book live feed query endpoint
    getMarketOrderBook: builder.query<
      MarketOrderBookResponse,
      { symbol: string }
    >({
      query: ({ symbol }) => `order-book?symbol=${symbol.toUpperCase()}`,
      providesTags: ["OrderBook"],
    }),
    getRecentTrades: builder.query<RecentTradesResponse, { symbol: string }>({
      query: ({ symbol }) => `trades?symbol=${symbol.toUpperCase()}`,
    }),
    getWatchlistAssets: builder.query<
      MarketAssetListResponse,
      { include?: string } | void
    >({
      query: (params) => `watchlist?include=${params?.include || "sparkline"}`,
      providesTags: ["Assets"],
    }),
  }),
});

export const {
  useGetMarketAssetsQuery,
  useGetTrendingAssetsQuery,
  useGetAssetDetailsQuery,
  useGetMarketOrderBookQuery,
  useGetRecentTradesQuery,
  useGetWatchlistAssetsQuery,
} = marketApi;
