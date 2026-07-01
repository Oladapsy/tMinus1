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

// Types matching your OpenAPI specification

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/wallet" }), // Replace with system base config wrapper
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
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // 💸 Liquid asset external extraction ledger dispatch
    requestWithdrawal: builder.mutation<WithdrawalResponse, WithdrawalRequest>({
      query: (body) => ({
        url: "/withdrawals",
        method: "POST",
        body,
        headers: { "Idempotency-Key": `wd-req-${Date.now()}` },
      }),
      invalidatesTags: ["Wallet", "Transactions"],
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
} = walletApi;
