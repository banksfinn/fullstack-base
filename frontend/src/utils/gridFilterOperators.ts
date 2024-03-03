import { GridFilterOperator, getGridStringOperators } from "@mui/x-data-grid";

export const basicFullMatchOperator: GridFilterOperator[] =
    getGridStringOperators().filter((filter: GridFilterOperator) => {
        return filter.value === "equals";
    });
