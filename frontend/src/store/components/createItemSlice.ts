import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import {
    ItemCreateRequest,
    ItemType,
} from "src/clients/generatedGatewayClient";

interface CreateItemState extends ItemCreateRequest {}

const initialState: CreateItemState = {
    raw_label: "",
    item_type: ItemType.TypeA,
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

export const { updateLabel } = createItemSlice.actions;
export const getItemCreationState = (state: RootState) => state.createItemSlice;
export const useItemCreationState = (): CreateItemState => {
    return useAppSelector(getItemCreationState);
};

export default createItemSlice.reducer;
