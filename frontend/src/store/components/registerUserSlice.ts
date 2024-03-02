import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { UserCreateRequest } from "src/clients/generatedGatewayClient";

interface RegistrationState extends UserCreateRequest {}

const initialState: RegistrationState = {
    display_name: "",
    user_email: "",
    password: "",
};

export const registerUserSlice = createSlice({
    name: "registerUserSlice",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateDiplayName: (state, action: PayloadAction<string>) => {
            state.display_name = action.payload;
            return state;
        },
        updateUserEmail: (state, action: PayloadAction<string>) => {
            state.user_email = action.payload;
            return state;
        },
        updatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            return state;
        },
    },
});

export const { updateDiplayName, updatePassword, updateUserEmail } =
    registerUserSlice.actions;
export const getUserRegistrationState = (state: RootState) =>
    state.registerUserSlice;
export const useRegistrationState = (): RegistrationState => {
    return useAppSelector(getUserRegistrationState);
};

export default registerUserSlice.reducer;
