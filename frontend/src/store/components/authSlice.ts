import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { UserFromGateway } from "src/clients/generatedGatewayClient";
import { useAppSelector } from "../hooks";
import { getCookie, removeCookie, setCookie } from "tiny-cookie";

interface UserState {
  // user: UserFromGateway | null;
  accessToken: string | null;
}


export const getAccessTokenFromCookie = (): string | null => {
  return getCookie("accessToken");
};

export const setAccessTokenInCookie = (token: string | null) => {
  if (!token) {
    removeCookie("accessToken");
  } else {
    setCookie("accessToken", token);
  }
};


const loadUserState = (): UserState => {
  const data: string | null = localStorage.getItem("userState");
  if (data === null) {
    return {
      // user: null,
      accessToken: null,
    };
  }
  return JSON.parse(data);
};

const saveUserState = (state: UserState) => {
  localStorage.setItem("userState", JSON.stringify(state));
};

export const loadAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const saveUserAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
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
      setAccessTokenInCookie(state.accessToken);
      return state;
    },
    logoutUser: (state) => {
      // state.user = null;
      state.accessToken = null;
      saveUserState(state);
      setAccessTokenInCookie(null);
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
