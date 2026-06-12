import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/src/store/store"; 
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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://crypto-api-guwm.onrender.com/auth/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    validateSignup: build.mutation<BackendResponse<ValidateSignupResponse>, ValidateSignupRequest>({
      query: (body) => ({ url: "validate-signup", method: "POST", body }),
    }),

    registerCustomer: build.mutation<BackendResponse<RegisterResponse>, RegisterRequest>({
      query: (body) => ({ url: "register", method: "POST", body }),
    }),

    loginCustomer: build.mutation<BackendResponse<LoginAndSessionResponse>, LoginRequest>({
      query: (body) => ({ url: "login", method: "POST", body }),
    }),

    // 🌟 FIXED PATH: Appends to base to create /auth/otp/request
    requestEmailOtp: build.mutation<any, { email: string }>({
      query: (body) => ({
        url: "otp/request", 
        method: "POST",
        body,
      }),
    }),

    // 🌟 FIXED PATH: Appends to base to create /auth/otp/verify
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
} = authApi;