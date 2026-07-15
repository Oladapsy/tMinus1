import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/store/authSlice";
import { authApi } from "@/src/features/auth/api/authApi";
import { profileApi } from "@/src/features/profile/api/profileApi";
import { walletApi } from "@/src/features/wallets/api/walletApi";
import { marketApi } from "@/src/features/market/api/marketApi";
import { tradeApi } from "@/src/features/trades/api/tradeApi";

export const store = configureStore({
  reducer: {
    // 1. Hook up my local UI/Client state slice drawer
    auth: authReducer,

    // 2. Hook up my server API service slice drawer automatically
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [marketApi.reducerPath]: marketApi.reducer,
    [tradeApi.reducerPath]: tradeApi.reducer,

  },

  // 3. Adding the api middleware enables caching, invalidation, polling,
  // and other useful automatic features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(walletApi.middleware)
      .concat(marketApi.middleware)
      .concat(tradeApi.middleware),
});

// --- TypeScript Setup Types ---
// RootState represents the exact type/shape of our entire Redux Store filing cabinet
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch is the typed version of our store's dispatch function
export type AppDispatch = typeof store.dispatch;
