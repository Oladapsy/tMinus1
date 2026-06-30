import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/src/store/store";
import { setSessionExpired, updateTokens } from "@/src/store/authSlice";
import {
  BackendResponse,
  ValidateSignupRequest,
  ValidateSignupResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginAndSessionResponse,
  LogoutResponse,
  TwoFaStatusResponse,
  TwoFaSetupResponse,
  EnableTwoFaRequest,
  EnableTwoFaResponse,
  DisableTwoFaRequest,
} from "@/src/types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://crypto-api-guwm.onrender.com/auth/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const currentRefreshToken = state.auth.refreshToken;
    const isAuthenticated = state.auth.isAuthenticated;

    if (isAuthenticated && currentRefreshToken) {
      console.log("Access token expired. Trying silent token refresh...");

      const refreshResult = await baseQuery(
        {
          url: "refresh",
          method: "POST",
          body: { refreshToken: currentRefreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const payload = (
          refreshResult.data as BackendResponse<LoginAndSessionResponse>
        ).data;

        console.log("Token refresh successful! Updating Redux store.");

        api.dispatch(
          updateTokens({
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          }),
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Refresh token invalid. Triggering lockscreen overlay.");
        api.dispatch(setSessionExpired(true));
      }
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  // 🌟 Added tag type here so caching invalidates automatically when toggling states
  tagTypes: ["UserSecurityStatus"],
  endpoints: (build) => ({
    validateSignup: build.mutation<
      BackendResponse<ValidateSignupResponse>,
      ValidateSignupRequest
    >({
      query: (body) => ({ url: "validate-signup", method: "POST", body }),
    }),

    registerCustomer: build.mutation<
      BackendResponse<RegisterResponse>,
      RegisterRequest
    >({
      query: (body) => ({ url: "register", method: "POST", body }),
    }),

    loginCustomer: build.mutation<
      BackendResponse<LoginAndSessionResponse>,
      LoginRequest
    >({
      query: (body) => ({ url: "login", method: "POST", body }),
    }),

    requestEmailOtp: build.mutation<any, { email: string }>({
      query: (body) => ({ url: "otp/request", method: "POST", body }),
    }),

    verifyEmailOtp: build.mutation<any, { email: string; code: string }>({
      query: (body) => ({ url: "otp/verify", method: "POST", body }),
    }),

    checkSession: build.query<BackendResponse<LoginAndSessionResponse>, void>({
      query: () => "session",
    }),

    logoutCustomer: build.mutation<BackendResponse<LogoutResponse>, void>({
      query: () => ({ url: "logout", method: "POST" }),
    }),

    refreshTokens: build.mutation<
      BackendResponse<LoginAndSessionResponse>,
      { refreshToken: string }
    >({
      query: (body) => ({ url: "refresh", method: "POST", body }),
    }),

    // 🌟 INJECTED 2FA ENDPOINTS DIRECTLY HERE 🌟
    // Note: Since baseUrl already includes "/auth/", we remove "/auth" from the endpoint urls!
    get2FaStatus: build.query<TwoFaStatusResponse, void>({
      query: () => "2fa/status",
      providesTags: ["UserSecurityStatus"],
    }),

    setup2Fa: build.mutation<TwoFaSetupResponse, void>({
      query: () => ({
        url: "2fa/setup",
        method: "POST",
      }),
    }),

    enable2Fa: build.mutation<EnableTwoFaResponse, EnableTwoFaRequest>({
      query: (body) => ({
        url: "2fa/enable",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSecurityStatus"],
    }),

    disable2Fa: build.mutation<
      { data: { enabled: boolean } },
      DisableTwoFaRequest
    >({
      query: (body) => ({
        url: "2fa/disable",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSecurityStatus"],
    }),
    

    regenerate2FaCodes: build.mutation<
      { data: { recoveryCodes: string[]; recoveryCodeCount: number } },
      { password?: string; code?: string }
    >({
      query: (body) => ({
        url: "2fa/recovery-codes/regenerate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSecurityStatus"],
    }),
  }),
  
});

// Export hooks safely out of our unified authApi module
export const {
  useValidateSignupMutation,
  useRegisterCustomerMutation,
  useLoginCustomerMutation,
  useRequestEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useCheckSessionQuery,
  useLogoutCustomerMutation,
  useRefreshTokensMutation,

  // 🌟 Exporting your new 2FA Hooks!
  useGet2FaStatusQuery,
  useSetup2FaMutation,
  useEnable2FaMutation,
  useDisable2FaMutation,
  useRegenerate2FaCodesMutation,
} = authApi;
