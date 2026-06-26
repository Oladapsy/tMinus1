import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/src/store/store";
import {
  ProfileResponse,
  UpdatePinRequest,
  UpdatePinResponse,
  UpdateProfileRequest,
} from "../types/profile";

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
  tagTypes: ["UserProfile"],
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
        body, // Pass { currentPin, newPin }
      }),
      // This automatically asks useGetProfileQuery to update if needed 🔄
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
