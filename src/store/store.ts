import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import authSlice, { logout } from "./authSlice";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";

const listenerMiddleware = createListenerMiddleware();
// lang nghe xem co phai action logout hay khong

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(baseApi.util.resetApiState());
    persistor.purge();
  },
});
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
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, PURGE, REHYDRATE, PAUSE, FLUSH],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
