import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { baseGatewayClient } from "src/clients/baseGatewayClient";
import authSlice from "./components/authSlice";
import createItemSlice from "./components/createItemSlice";
import registerUserSlice from "./components/registerUserSlice";
import loginUserSlice from "./components/loginUserSlice";
import snackbarSlice from "./components/snackbarSlice";

export const store = configureStore({
    reducer: {
        [baseGatewayClient.reducerPath]: baseGatewayClient.reducer,
        authSlice: authSlice,
        createItemSlice: createItemSlice,
        registerUserSlice: registerUserSlice,
        loginUserSlice: loginUserSlice,
        snackbarSlice: snackbarSlice,
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
