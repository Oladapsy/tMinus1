import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PortfolioHistoryResponse,
  SimulateDepositRequest,
  SimulateDepositResponse,
  Transaction,
  TransactionListResponse,
  WalletResponse,
  WithdrawalRequest,
  WithdrawalResponse,
} from "../utils/types/wallet";

import { updateTokens, logOut } from "../../../store/authSlice";

export interface TransferRequest {
  assetSymbol: string;
  amount: number;
  recipient: string;
  pin: string;
}

export interface TransferResponse {
  data: {
    transfer: {
      reference: string;
      assetSymbol: string;
      amount: number;
      recipient: {
        id: string;
        fullName: string;
        email: string;
        phone: string;
      };
    };
    transaction: Transaction;
    recipientTransaction: Transaction;
    wallet: any;
  };
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// 1️⃣ Base query engine setup
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/wallet`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// 2️⃣ Interceptor logic to catch expired sessions and refresh automatically
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const errorData = result.error.data as any;

    if (errorData?.error?.code === "ACCESS_TOKEN_EXPIRED") {
      console.log(
        "🔄 Access token expired. Attempting automated refresh routine...",
      );

      const refreshToken = (api.getState() as any).auth.refreshToken;

      if (refreshToken) {
        try {
          // Perform a direct token swap request relative to the auth domain
          const refreshResult = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          const refreshData = await refreshResult.json();

          if (refreshResult.ok && refreshData?.data?.accessToken) {
            console.log(
              "✅ Token successfully renewed! Re-trying context transaction branch...",
            );

            const newAccessToken = refreshData.data.accessToken;
            const newRefreshToken =
              refreshData.data.refreshToken || refreshToken;

            // 🟢 FIXED: Dispatches updateTokens with the correct structural parameters
            api.dispatch(
              updateTokens({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              }),
            );

            // 🟢 Safe header alteration matching RTK's query header transformations
            if (typeof args === "string") {
              args = {
                url: args,
                headers: { authorization: `Bearer ${newAccessToken}` },
              };
            } else {
              if (!args.headers) {
                args.headers = {};
              }

              // Checks if the headers collection matches Web API Header class instances
              if (
                args.headers instanceof Headers ||
                typeof (args.headers as any).set === "function"
              ) {
                (args.headers as any).set(
                  "authorization",
                  `Bearer ${newAccessToken}`,
                );
              } else if (Array.isArray(args.headers)) {
                const authIdx = (args.headers as [string, any][]).findIndex(
                  ([k]) => k.toLowerCase() === "authorization",
                );
                if (authIdx !== -1) {
                  args.headers[authIdx] = [
                    "authorization",
                    `Bearer ${newAccessToken}`,
                  ];
                } else {
                  args.headers.push([
                    "authorization",
                    `Bearer ${newAccessToken}`,
                  ]);
                }
              } else {
                // Standard fallback literal key value block injection assignment mapping
                args.headers = {
                  ...args.headers,
                  authorization: `Bearer ${newAccessToken}`,
                };
              }
            }

            // Retry the original query payload with the fresh authorization parameters
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log(
              "❌ Refresh token verification failed. Forcing session termination...",
            );
            // 🟢 FIXED: Calls logOut matching your exact reducer declaration
            api.dispatch(logOut());
          }
        } catch (error) {
          console.log("🚨 Interceptor network refresh error caught:", error);
          // 🟢 FIXED: Safe logout fallback execution
          api.dispatch(logOut());
        }
      } else {
        console.log(
          "⚠️ No refresh token located inside localized Redux storage state.",
        );
      }
    }
  }

  return result;
};

// 3️⃣ Main API Definition
export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["Wallet", "Transactions", "History"],
  endpoints: (builder) => ({
    getWallet: builder.query<WalletResponse, void>({
      query: () => "",
      providesTags: ["Wallet"],
    }),

    getPortfolioHistory: builder.query<
      PortfolioHistoryResponse,
      { range: "1D" | "1W" | "1M" | "1Y" }
    >({
      query: ({ range }) => `/portfolio/history?range=${range}`,
      providesTags: ["History"],
    }),

    getTransactions: builder.query<
      TransactionListResponse,
      { status?: string; type?: string; page?: number; limit?: number } | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.append("status", params.status);
        if (params?.type) searchParams.append("type", params.type);
        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        searchParams.append("order", "desc");
        return `/transactions?${searchParams.toString()}`;
      },
      providesTags: ["Transactions"],
    }),

    getTransactionDetails: builder.query<{ data: Transaction }, string>({
      query: (id) => `/transactions/${id}`,
    }),

    simulateDeposit: builder.mutation<
      SimulateDepositResponse,
      SimulateDepositRequest
    >({
      query: (body) => ({
        url: "/deposit/simulate",
        method: "POST",
        body,
        headers: { "Idempotency-Key": `dep-sim-${Date.now()}` },
      }),
      invalidatesTags: ["Wallet", "Transactions", "History"],
    }),

    requestWithdrawal: builder.mutation<WithdrawalResponse, WithdrawalRequest>({
      query: (body) => ({
        url: "/withdrawals",
        method: "POST",
        body,
        headers: { "Idempotency-Key": `wd-req-${Date.now()}` },
      }),
      invalidatesTags: ["Wallet", "Transactions", "History"],
    }),

    executeInternalTransfer: builder.mutation<
      TransferResponse,
      TransferRequest
    >({
      query: (body) => ({
        url: "/transfers",
        method: "POST",
        body,
        headers: { "Idempotency-Key": `int-trf-${Date.now()}` },
      }),
      invalidatesTags: ["Wallet", "Transactions", "History"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetPortfolioHistoryQuery,
  useGetTransactionsQuery,
  useGetTransactionDetailsQuery,
  useSimulateDepositMutation,
  useRequestWithdrawalMutation,
  useExecuteInternalTransferMutation,
} = walletApi;
