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
} from "../types/wallet";

// 🟢 IMPORTANT: Import your auth slice actions here to update tokens or handle sessions
// import { setCredentials, logout } from "../store/slices/authSlice";

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

            // 🟢 Action Dispatch: Updates token credentials inside Redux memory structures
            // Uncomment this once your slices are connected!
            // api.dispatch(setCredentials({
            //   accessToken: newAccessToken,
            //   refreshToken: refreshData.data.refreshToken || refreshToken,
            // }));

            // 🟢 FORCE HEADERS INJECTION FOR RETRY
            // This bypasses the old state lookup for the replayed request execution
            if (typeof args === "string") {
              args = { 
                url: args, 
                headers: { "authorization": `Bearer ${newAccessToken}` } 
              };
            } else {
              args.headers = {
                ...args.headers,
                "authorization": `Bearer ${newAccessToken}`,
              };
            }

            // Retry the original query payload with the fresh authorization parameters
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log(
              "❌ Refresh token verification failed. Forcing session termination...",
            );
            // api.dispatch(logout());
          }
        } catch (error) {
          console.error("🚨 Interceptor network refresh error caught:", error);
          // api.dispatch(logout());
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
  baseQuery: baseQueryWithReauth, // 👈 Hooked up the token auto-recovery layer here!

  tagTypes: ["Wallet", "Transactions", "History"],
  endpoints: (builder) => ({
    // 🏢 Wallet home interface metrics engine
    getWallet: builder.query<WalletResponse, void>({
      query: () => "",
      providesTags: ["Wallet"],
    }),

    // 📈 Portfolio tracking chart lines engine
    getPortfolioHistory: builder.query<
      PortfolioHistoryResponse,
      { range: "1D" | "1W" | "1M" | "1Y" }
    >({
      query: ({ range }) => `/portfolio/history?range=${range}`,
      providesTags: ["History"],
    }),

    // 🧾 Transact monitoring log stream
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
        searchParams.append("order", "desc"); // Default layout view sorting
        return `/transactions?${searchParams.toString()}`;
      },
      providesTags: ["Transactions"],
    }),

    // 🔍 Individual validation record lookup
    getTransactionDetails: builder.query<{ data: Transaction }, string>({
      query: (id) => `/transactions/${id}`,
    }),

    // 🧪 Sandbox testing mock deposit stream execution
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

    // 💸 Liquid asset external extraction ledger dispatch
    requestWithdrawal: builder.mutation<WithdrawalResponse, WithdrawalRequest>({
      query: (body) => ({
        url: "/withdrawals",
        method: "POST",
        body,
        headers: { "Idempotency-Key": `wd-req-${Date.now()}` },
      }),
      invalidatesTags: ["Wallet", "Transactions", "History"],
    }),

    // 🟢 3. Internal Transfer endpoint engine connecting to /wallet/transfers
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
      invalidatesTags: ["Wallet", "Transactions", "History"], // Instantly triggers balance & history recalculation redraws!
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
