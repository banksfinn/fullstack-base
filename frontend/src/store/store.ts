import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { baseGatewayClient } from "src/clients/baseGatewayClient";
import authSlice from "./components/authSlice";
import createItemSlice from "./components/createItemSlice";
import registerUserSlice from "./components/registerUserSlice";

export const store = configureStore({
    reducer: {
        [baseGatewayClient.reducerPath]: baseGatewayClient.reducer,
        authSlice: authSlice,
        createItemSlice: createItemSlice,
        registerUserSlice: registerUserSlice,
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
