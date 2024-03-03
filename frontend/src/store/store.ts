import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { baseGatewayClient } from "src/clients/baseGatewayClient";
import authSlice from "./components/authSlice";
import createItemSlice from "./components/createItemSlice";
import registerUserSlice from "./components/registerUserSlice";
import loginUserSlice from "./components/loginUserSlice";
import snackbarSlice from "./components/snackbarSlice";
import itemTableSlice from "./components/itemTableSlice";
import { apiErrorMiddleware } from "./errorMiddleware";

export const store = configureStore({
    reducer: {
        [baseGatewayClient.reducerPath]: baseGatewayClient.reducer,
        authSlice: authSlice,
        createItemSlice: createItemSlice,
        registerUserSlice: registerUserSlice,
        loginUserSlice: loginUserSlice,
        snackbarSlice: snackbarSlice,
        itemTableSlice: itemTableSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseGatewayClient.middleware,
            apiErrorMiddleware,
        ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
