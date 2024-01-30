import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { baseGatewayClient } from "src/clients/baseGatewayClient";
import authSlice from "./components/authSlice";
import createTransactionSlice from "./components/createTransactionSlice";

export const store = configureStore({
  reducer: {
    [baseGatewayClient.reducerPath]: baseGatewayClient.reducer,
    authSlice: authSlice,
    createTransactionSlice: createTransactionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseGatewayClient.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
