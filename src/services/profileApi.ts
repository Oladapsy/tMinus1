import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/src/store/store";
import {
  ProfileResponse,
  UpdatePinRequest,
  UpdatePinResponse,
  UpdateProfileRequest,
} from "../types/profile";

// 🌟 Import structural device schema definitions inline or via types folder
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

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://crypto-api-guwm.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // 🌟 Added "UserDevices" to monitor local state mutations dynamically
  tagTypes: ["UserProfile", "UserDevices"],
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

    // 🔑 NEW: Read active device array list
    getRegisteredDevices: builder.query<DevicesResponse, void>({
      query: () => "/me/devices",
      providesTags: ["UserDevices"],
    }),

    // 🔑 NEW: Delete structural session device item
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
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePinMutation,
  // 🌟 Export the freshly minted live session hooks
  useGetRegisteredDevicesQuery,
  useRemoveDeviceMutation,
} = profileApi;
