import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { ArticleCreationRequest } from "src/clients/generatedGatewayClient";
import { RootState } from "../store";

interface CreateArticleState extends ArticleCreationRequest {}

const initialState: CreateArticleState = {
  brand: "",
  label: "",
  classifier_id: "",
  image_ids: [],
};

export const createArticleSlice = createSlice({
  name: "createArticleSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
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
  createArticleSlice.actions;
export const getArticleCreationState = (state: RootState) =>
  state.createArticleSlice;
export const useArticleCreationState = (): ArticleCreationRequest => {
  return useAppSelector(getArticleCreationState);
};

export default createArticleSlice.reducer;
