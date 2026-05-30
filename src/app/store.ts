import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/app/authSlice";
import { authApi } from "@/src/services/authApi";

export const store = configureStore({
  reducer: {
    // 1. Hook up our local UI/Client state slice drawer
    auth: authReducer,

    // 2. Hook up our server API service slice drawer automatically
    [authApi.reducerPath]: authApi.reducer,
  },

  // 3. Adding the api middleware enables caching, invalidation, polling,
  // and other useful automatic features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// --- TypeScript Setup Types ---
// RootState represents the exact type/shape of our entire Redux Store filing cabinet
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch is the typed version of our store's dispatch function
export type AppDispatch = typeof store.dispatch;
