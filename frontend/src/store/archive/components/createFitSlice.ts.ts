import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { FitCreationRequest } from "src/clients/generatedGatewayClient";
import { RootState } from "../store";

interface CreateFitState extends FitCreationRequest {}

const initialState: CreateFitState = {
  title: "",
  summary: "",
  article_ids: [],
  image_ids: [],
};

export const createFitSlice = createSlice({
  name: "createFitSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      return state;
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
      return state;
    },
    updateArticles: (state, action: PayloadAction<string[]>) => {
      state.article_ids = action.payload;
      return state;
    },
    updateImages: (state, action: PayloadAction<string[]>) => {
      state.image_ids = action.payload;
      return state;
    },
  },
});

export const { updateTitle, updateSummary, updateArticles } =
  createFitSlice.actions;
export const getFitCreationState = (state: RootState) => state.createFitSlice;
export const useFitCreationState = (): FitCreationRequest => {
  return useAppSelector(getFitCreationState);
};

export default createFitSlice.reducer;
