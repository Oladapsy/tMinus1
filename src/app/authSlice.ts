import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, LoginAndSessionResponse } from '@/src/types/auth';

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Call this action when a user successfully logs in or signs up
    setCredentials: (
      state, 
      action: PayloadAction<LoginAndSessionResponse>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    
    // Call this action when a user logs out
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    
    // Call this action specifically when the token rotates via /auth/refresh
    updateTokens: (
      state, 
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setCredentials, logOut, updateTokens } = authSlice.actions;
export default authSlice.reducer;