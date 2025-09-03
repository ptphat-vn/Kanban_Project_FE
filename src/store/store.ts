import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { baseApi } from "./api/baseApi";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
