import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    prepareHeaders: (headers) => {
      // this should be state tokens injection
      return headers;
    },
  }),
  endpoints: (build) => ({
    // Live inline form check as user types
    validateSignup: build.mutation<
      BackendResponse<ValidateSignupResponse>,
      ValidateSignupRequest
    >({
      query: (body) => ({
        url: "validate-signup",
        method: "POST",
        body,
      }),
    }),

    // Submit user form registration
    registerCustomer: build.mutation<
      BackendResponse<RegisterResponse>,
      RegisterRequest
    >({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),

    // Login process
    loginCustomer: build.mutation<
      BackendResponse<LoginAndSessionResponse>,
      LoginRequest
    >({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),

    // Get active user state data profile and session details / token
    checkSession: build.query<BackendResponse<LoginAndSessionResponse>, void>(
      {
        query: () => "session",
      },
    ),

    // De-authenticate device session
    logoutCustomer: build.mutation<BackendResponse<LogoutResponse>, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

// Generated custom hooks exported for your screens
export const {
  useValidateSignupMutation,
  useRegisterCustomerMutation,
  useLoginCustomerMutation,
  useCheckSessionQuery,
  useLogoutCustomerMutation,
} = authApi;
