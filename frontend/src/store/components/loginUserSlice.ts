import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { UserLoginRequest } from "src/clients/generatedGatewayClient";

interface LoginState extends UserLoginRequest {}

const initialState: LoginState = {
    user_email: "",
    password: "",
};

export const loginUserSlice = createSlice({
    name: "loginUserSlice",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateLoginUserEmail: (state, action: PayloadAction<string>) => {
            state.user_email = action.payload;
            return state;
        },
        updateLoginUserPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            return state;
        },
    },
});

export const { updateLoginUserEmail, updateLoginUserPassword } =
    loginUserSlice.actions;
export const getUserLoginState = (state: RootState) => state.loginUserSlice;
export const useLoginState = (): LoginState => {
    return useAppSelector(getUserLoginState);
};

export default loginUserSlice.reducer;
