import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useAppSelector } from "../hooks";
import {
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { GetItemsItemsGetApiArg } from "src/clients/generatedGatewayClient";

interface ItemTableState {
    paginationModel: GridPaginationModel;
    sortModel: GridSortModel;
    filterModel: GridFilterModel;
}

const initialState: ItemTableState = {
    paginationModel: {
        pageSize: 50,
        page: 0,
    },
    sortModel: [],
    filterModel: {
        items: [],
    },
};

export const itemTableSlice = createSlice({
    name: "itemTableSlice",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updatePaginationModel: (
            state,
            action: PayloadAction<GridPaginationModel>,
        ) => {
            state.paginationModel = action.payload;
            return state;
        },
        updateSortModel: (state, action: PayloadAction<GridSortModel>) => {
            state.sortModel = action.payload;
            return state;
        },
        updateFilterModel: (state, action: PayloadAction<GridFilterModel>) => {
            state.filterModel = action.payload;
            return state;
        },
    },
});

export const { updatePaginationModel, updateSortModel, updateFilterModel } =
    itemTableSlice.actions;

export const getItemTableState = (state: RootState) => state.itemTableSlice;
export const useItemTableState = (): ItemTableState => {
    return useAppSelector(getItemTableState);
};

interface ItemTableSort {
    orderBy: string | null;
    direction: "desc" | "asc" | null;
}

const getItemTableSortParsed = (state: ItemTableState): ItemTableSort => {
    if (!state.sortModel.length) {
        return {
            orderBy: null,
            direction: null,
        };
    } else {
        return {
            orderBy: state.sortModel[0].field ?? null,
            direction: state.sortModel[0].sort ?? null,
        };
    }
};

export const useItemTableQuery = (): GetItemsItemsGetApiArg => {
    const curState = useAppSelector(getItemTableState);
    const sortState = getItemTableSortParsed(curState);

    const query = {
        limit: curState.paginationModel.pageSize,
        offset:
            curState.paginationModel.page * curState.paginationModel.pageSize,
        ...(sortState.orderBy && { orderBy: sortState.orderBy }),
        ...(sortState.direction && { orderBy: sortState.direction }),
    };

    for (const filter of curState.filterModel.items) {
        // @ts-expect-error Unable to map the raw filter model to our query
        query[filter.field] = filter.value;
    }

    console.log(query);

    return query;
};
export default itemTableSlice.reducer;
