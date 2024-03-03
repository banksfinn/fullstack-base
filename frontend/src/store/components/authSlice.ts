import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { OutputUser } from "src/clients/generatedGatewayClient";
import { useAppSelector } from "../hooks";
import { getCookie, removeCookie, setCookie } from "tiny-cookie";
import { OutputUser } from "src/clients/generatedGatewayClient";

interface UserState {
    user: OutputUser | null;
    accessToken: string | null;
}

export const getUserStateFromCookie = (): UserState | null => {
    const storedData = getCookie("userState");
    if (!storedData) {
        return null;
    }
    return JSON.parse(storedData);
};

export const setUserStateInCookie = (state: UserState | null) => {
    console.log(state);
    if (!state) {
        removeCookie("userState");
    } else {
        setCookie("userState", JSON.stringify(state));
    }
};

const loadUserState = (): UserState => {
    const data: string | null = localStorage.getItem("userState");
    if (data === null) {
        return {
            user: null,
            accessToken: null,
        };
    }
    return JSON.parse(data);
};

const saveUserState = (state: UserState) => {
    localStorage.setItem("userState", JSON.stringify(state));
};

const initialState: UserState = loadUserState();

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateUserState: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
            saveUserState(state);
            setUserStateInCookie(state);
            return state;
        },
        logoutUser: (state) => {
            // state.user = null;
            state.accessToken = null;
            saveUserState(state);
            setUserStateInCookie(null);
            return state;
        },
    },
});

export const { updateUserState, logoutUser } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.authSlice;
export const useCurrentUser = (): UserState => {
    return useAppSelector(getCurrentUser);
};
export default authSlice.reducer;
