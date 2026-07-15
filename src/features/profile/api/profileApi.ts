import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/src/store/store";
import {
  ProfileResponse,
  UpdatePinRequest,
  UpdatePinResponse,
  UpdateProfileRequest,
} from "../utils/types/profile";
import {
  PriceAlertsResponse,
  PriceAlertItem,
  CreatePriceAlertRequest,
  UpdatePriceAlertRequest,
  NotificationsResponse,
  NotificationItem,
  MarketAssetsResponse,
} from "../../../types/alert";
// 🌟 Import your Market Asset List types to cleanly type the list response
import { MarketAssetListResponse } from "../../../types/market";

export interface DeviceItem {
  id: string;
  userId: string;
  expoPushToken: string;
  platform: "ios" | "android" | "web" | string;
  createdAt: string;
  lastSeenAt: string;
}

export interface DevicesResponse {
  data: DeviceItem[];
  meta: {
    count: number;
    pushNotificationsEnabled: boolean;
  };
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // 🏷️ Added "Watchlist" to tagTypes to handle responsive live data cache updates
  tagTypes: [
    "UserProfile",
    "UserDevices",
    "PriceAlerts",
    "Notifications",
    "Watchlist",
  ],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/me",
      providesTags: ["UserProfile"],
    }),
    updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updatePin: builder.mutation<UpdatePinResponse, UpdatePinRequest>({
      query: (body) => ({
        url: "/me/pin",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),

    getRegisteredDevices: builder.query<DevicesResponse, void>({
      query: () => "/me/devices",
      providesTags: ["UserDevices"],
    }),

    removeDevice: builder.mutation<
      { data: { deleted: boolean; deviceId: string } },
      string
    >({
      query: (deviceId) => ({
        url: `/me/devices/${deviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserDevices"],
    }),

    // 🏷️ PRICE ALERTS ENDPOINTS
    getPriceAlerts: builder.query<PriceAlertsResponse, void>({
      query: () => "/me/price-alerts",
      providesTags: ["PriceAlerts"],
    }),

    createPriceAlert: builder.mutation<
      { data: PriceAlertItem },
      CreatePriceAlertRequest
    >({
      query: (body) => ({
        url: "/me/price-alerts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PriceAlerts"],
    }),

    updatePriceAlert: builder.mutation<
      { data: PriceAlertItem },
      UpdatePriceAlertRequest
    >({
      query: ({ alertId, ...body }) => ({
        url: `/me/price-alerts/${alertId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PriceAlerts"],
    }),

    deletePriceAlert: builder.mutation<{ data: { deleted: boolean } }, string>({
      query: (alertId) => ({
        url: `/me/price-alerts/${alertId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PriceAlerts"],
    }),

    // 📨 NOTIFICATIONS ENDPOINTS
    getNotifications: builder.query<NotificationsResponse, void>({
      query: () => "/me/notifications",
      providesTags: ["Notifications"],
    }),
    markNotificationRead: builder.mutation<{ data: NotificationItem }, string>({
      query: (notificationId) => ({
        url: `/me/notifications/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markAllNotificationsRead: builder.mutation<
      { data: { updated: boolean } },
      void
    >({
      query: () => ({
        url: "/me/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // 🌟 ADDED: WATCHLIST PIPELINE SYSTEM
    getWatchlistAssets: builder.query<
      MarketAssetListResponse,
      { include?: string } | void
    >({
      query: (params) => ({
        url: "/me/watchlist",
        params: { include: params?.include || "sparkline" },
      }),
      providesTags: ["Watchlist"],
    }),

    addToWatchlist: builder.mutation<{ data: string[] }, string>({
      query: (symbol) => ({
        url: `/me/watchlist/${symbol.toUpperCase()}`,
        method: "POST",
      }),
      invalidatesTags: ["Watchlist"],
    }),

    removeFromWatchlist: builder.mutation<{ data: string[] }, string>({
      query: (symbol) => ({
        url: `/me/watchlist/${symbol.toUpperCase()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Watchlist"],
    }),

    // 📊 MARKET ENDPOINT
    getMarketAssets: builder.query<MarketAssetsResponse, void>({
      query: () => "/market/assets",
    }),

    getMarketPrices: builder.query<{ data: any[] }, void>({
      query: () => "/market/prices",
    }),

    // 📤 KYC FILE UPLOAD PIPELINE
    uploadKycFile: builder.mutation<{ data: { publicUrl: string } }, FormData>({
      query: (formData) => ({
        url: "/auth/kyc/uploads",
        method: "POST",
        body: formData,
      }),
    }),

    // 📝 KYC COMPLIANCE DISPATCH SHEET
    submitKycPayload: builder.mutation<
      any,
      {
        legalName: string;
        country: string;
        documentType: string;
        documentNumber: string;
        selfieImageUrl: string;
        documentImageUrl: string;
        documentBackImageUrl?: string | null;
      }
    >({
      query: (body) => ({
        url: "/auth/kyc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePinMutation,
  useGetRegisteredDevicesQuery,
  useRemoveDeviceMutation,
  useGetPriceAlertsQuery,
  useCreatePriceAlertMutation,
  useUpdatePriceAlertMutation,
  useDeletePriceAlertMutation,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  // 🌟 EXPORTED: New Watchlist query and mutation hooks
  useGetWatchlistAssetsQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useGetMarketAssetsQuery,
  useGetMarketPricesQuery,
  useUploadKycFileMutation,
  useSubmitKycPayloadMutation,
} = profileApi;
