import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, LoginAndSessionResponse } from '@/src/types/auth';

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  // Temporary storage context for step-by-step registration tracking
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
      // Wipe trace info upon successful entry sequence
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
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setCredentials, saveDraftCredentials, logOut, updateTokens } = authSlice.actions;
export default authSlice.reducer;