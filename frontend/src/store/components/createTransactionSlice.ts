import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { CreateTransactionRequest } from "src/clients/generatedGatewayClient";

interface CreateTransactionState extends CreateTransactionRequest {}

const initialState: CreateTransactionState = {
  raw_label: ""
};

export const createTransactionSlice = createSlice({
  name: "createTransactionSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateLabel: (state, action: PayloadAction<string>) => {
      state.raw_label = action.payload;
      return state;
    },
    updateLabel: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
      return state;
    },
    updateClassifier: (state, action: PayloadAction<string>) => {
      state.classifier_id = action.payload;
      return state;
    },
    updateImages: (state, action: PayloadAction<string[]>) => {
      state.image_ids = action.payload;
      return state;
    },
  },
});

export const { updateBrand, updateLabel, updateClassifier, updateImages } =
  createTransactionSlice.actions;
export const getTransactionCreationState = (state: RootState) =>
  state.createTransactionSlice;
export const useTransactionCreationState = (): CreateTransactionRequest => {
  return useAppSelector(getTransactionCreationState);
};

export default createTransactionSlice.reducer;
