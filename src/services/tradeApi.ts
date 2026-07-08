import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { logOut, updateTokens } from "../store/authSlice"; // 🟢 Import your exact slice actions
import {
  CreateQuoteRequest,
  CreateQuoteResponse,
  TradeQuote,
  ExecuteTradeRequest,
  ExecuteTradeResponse,
} from "../types/trade";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// 1. Create standard base query instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// 2. 🛡️ Automatic Token-Refresh Interceptor using your exact Auth Slice actions
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // If a call fails with 401 Unauthorized, intercept and refresh token
  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      try {
        // Request token renewal from your API backend refresh route
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        // Check if the backend returned the updated token object payload
        if (refreshResult.data) {
          const newTokens = refreshResult.data as {
            accessToken: string;
            refreshToken: string;
          };

          // 🟢 Dispatch your exact updateTokens reducer to update state
          api.dispatch(
            updateTokens({
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            }),
          );

          // 🔄 Instantly retry the initial failed quote payload with the fresh token!
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Renewal failed or invalid; break token access and force user out
          api.dispatch(logOut());
        }
      } catch (err) {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

// 3. Export API configuration utilizing the new re-auth interceptor
export const tradeApi = createApi({
  reducerPath: "tradeApi",
  baseQuery: baseQueryWithReauth, // 🟢 Robust automated re-auth wrapper
  tagTypes: ["TradeQuote", "WalletBalances"],
  endpoints: (builder) => ({
    // 💸 Request Quote
    createQuote: builder.mutation<CreateQuoteResponse, CreateQuoteRequest>({
      query: (body) => ({
        url: "/trade/quotes",
        method: "POST",
        body,
      }),
    }),

    // ⏱️ Fetching details for active quote reference structures
    getQuoteDetails: builder.query<{ data: TradeQuote }, string>({
      query: (quoteId) => `/trade/quotes/${quoteId}`,
      providesTags: (_result, _error, quoteId) => [
        { type: "TradeQuote", id: quoteId },
      ],
    }),

    // 🔒 Finalize trade execution
    executeTrade: builder.mutation<
      ExecuteTradeResponse,
      { body: ExecuteTradeRequest; idempotencyKey?: string }
    >({
      query: ({ body, idempotencyKey }) => {
        const headers: Record<string, string> = {};
        if (idempotencyKey) {
          headers["Idempotency-Key"] = idempotencyKey;
        }
        return {
          url: "/trade/execute",
          method: "POST",
          headers,
          body,
        };
      },
      invalidatesTags: ["WalletBalances"],
    }),
  }),
});

export const {
  useCreateQuoteMutation,
  useGetQuoteDetailsQuery,
  useLazyGetQuoteDetailsQuery,
  useExecuteTradeMutation,
} = tradeApi;
