import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserView {
  viewMode: "desktop" | "mobile";
}

const initialState: UserView = {
  viewMode: "desktop",
};

export const userViewSlice = createSlice({
  name: "userViewSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeViewMode: (state, action: PayloadAction<"desktop" | "mobile">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { changeViewMode } = userViewSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getViewMode = (state: RootState) => state.userViewSlice.viewMode;

export default userViewSlice.reducer;
