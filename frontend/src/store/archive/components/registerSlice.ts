import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { VisibilityType } from "src/clients/generatedGatewayClient";

interface RegisterState {
  email: string;
  password: string;
  displayName: string;
  profileType: VisibilityType;
}

const initialState: RegisterState = {
  email: "",
  password: "",
  displayName: "",
  profileType: "public",
};

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    updateProfileType: (state, action: PayloadAction<VisibilityType>) => {
      state.profileType = action.payload;
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  updateDisplayName,
  updateProfileType,
} = registerSlice.actions;
export const getRegistrationState = (state: RootState) => state.registerSlice;

export const getRegistrationIsValid = (state: RootState): boolean => {
  // Email
  const email = state.registerSlice.email;
  const password = state.registerSlice.password;
  const displayName = state.registerSlice.displayName;
  const profileType = state.registerSlice.profileType;
  if (!email || email.length < 5) {
    return false;
  }
  if (!email.includes("@")) {
    return false;
  }

  // Password
  if (!password || password.length < 6) {
    return false;
  }

  // Display Name
  if (!displayName || displayName.length < 4) {
    return false;
  }

  // eslint-disable-next-line no-useless-escape
  if (displayName.match(/([&$\+,:;=\?@#\s<>\[\]\{\}[\/]|\\\^%])+/)) {
    return false;
  }

  // Profile Type
  if (!profileType) {
    return false;
  }

  return true;
};

export default registerSlice.reducer;
