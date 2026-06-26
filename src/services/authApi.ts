import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/src/store/store";
import { setSessionExpired, updateTokens } from "@/src/store/authSlice"; // Imported actions
import {
  BackendResponse,
  ValidateSignupRequest,
  ValidateSignupResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginAndSessionResponse,
  LogoutResponse,
} from "@/src/types/auth";

// 1. Moved original base configuration to a standalone variable
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

// 2. Created the protective wrapper that manages token rotations
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  // Fire off the regular request first
  let result = await baseQuery(args, api, extraOptions);

  // If the server blocks it with a 401 Unauthorized status code
  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const currentRefreshToken = state.auth.refreshToken;
    const isAuthenticated = state.auth.isAuthenticated;

    // Only try to fix it if the user is actively logged into the app
    if (isAuthenticated && currentRefreshToken) {
      console.log("Access token expired. Trying silent token refresh...");

      // Hit the POST /auth/refresh endpoint secretly behind the scenes
      const refreshResult = await baseQuery(
        {
          url: "refresh",
          method: "POST",
          body: { refreshToken: currentRefreshToken },
        },
        api,
        extraOptions
      );

      // If the backend hands us brand new tokens successfully!
      if (refreshResult.data) {
        const payload = (refreshResult.data as BackendResponse<LoginAndSessionResponse>).data;
        
        console.log("Token refresh successful! Updating Redux store.");
        
        // Save the shiny new tokens in memory
        api.dispatch(updateTokens({ 
          accessToken: payload.accessToken, 
          refreshToken: payload.refreshToken 
        }));

        // Retry the exact user request that failed a second ago, now with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If the refresh token is also dead, they must re-authenticate
        console.log("Refresh token invalid. Triggering lockscreen overlay.");
        api.dispatch(setSessionExpired(true));
      }
    }
  }
  
  return result;
};

// 3. Created main api wrapper utilizing the protective check
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth, // 🌟 Swapped for our new protective logic wrapper
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
      query: (body) => ({
        url: "otp/request",
        method: "POST",
        body,
      }),
    }),

    verifyEmailOtp: build.mutation<any, { email: string; code: string }>({
      query: (body) => ({
        url: "otp/verify",
        method: "POST",
        body,
      }),
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
      query: (body) => ({
        url: "refresh",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useValidateSignupMutation,
  useRegisterCustomerMutation,
  useLoginCustomerMutation,
  useRequestEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useCheckSessionQuery,
  useLogoutCustomerMutation,
  useRefreshTokensMutation,
} = authApi;