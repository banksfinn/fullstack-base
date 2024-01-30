import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginState {
  email: string;
  password: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { updateEmail, updatePassword } = loginSlice.actions;
export const getLoginState = (state: RootState) => state.loginSlice;

export default loginSlice.reducer;
