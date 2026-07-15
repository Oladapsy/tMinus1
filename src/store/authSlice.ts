import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, LoginAndSessionResponse } from '@/src/features/auth/utils/types/auth';

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isSessionExpired: boolean; // 🌟 ADDED: Captures background 401 interception states
  registrationDraft: {
    email: string | null;
    phone: string | null;
  };
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isSessionExpired: false, // Default is secure and clean
  registrationDraft: {
    email: null,
    phone: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginAndSessionResponse>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isSessionExpired = false; // 🌟 FIXED: Closes overlay instantly upon login success
      state.registrationDraft = { email: null, phone: null };
    },
    saveDraftCredentials: (state, action: PayloadAction<{ email: string; phone: string }>) => {
      state.registrationDraft.email = action.payload.email;
      state.registrationDraft.phone = action.payload.phone;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isSessionExpired = false; // Ensure screen closes on complete abandonment
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    // 🌟 ADDED: Allows your API interceptor middleware to trigger the lock screen overlay
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.isSessionExpired = action.payload;
    }
  },
});

export const { setCredentials, saveDraftCredentials, logOut, updateTokens, setSessionExpired } = authSlice.actions;
export default authSlice.reducer;