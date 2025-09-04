import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./authSlice";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
const persistCofig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistCofig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
