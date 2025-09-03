import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user.type";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   status: number;
//   avatar: string | null;
//   createdAt: string;
//   updatedAt: string;
// } đã chuyển qua type chia ra cho gọn

interface AuthState {
  user: User | null;
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUserProfile, setAuth } = authSlice.actions;
export default authSlice.reducer;
