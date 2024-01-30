import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { CreateItemRequest } from "src/clients/generatedGatewayClient";

interface CreateItemState extends CreateItemRequest {}

const initialState: CreateItemState = {
  raw_label: ""
};

export const createItemSlice = createSlice({
  name: "createItemSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateLabel: (state, action: PayloadAction<string>) => {
      state.raw_label = action.payload;
      return state;
    },
  },
});

export const { updateLabel } =
  createItemSlice.actions;
export const getItemCreationState = (state: RootState) =>
  state.createItemSlice;
export const useItemCreationState = (): CreateItemRequest => {
  return useAppSelector(getItemCreationState);
};

export default createItemSlice.reducer;
