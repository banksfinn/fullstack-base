import { Box, Button } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridRowModel,
    GridRowSelectionModel,
    GridSortModel,
    GridValueFormatterParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorResponse } from "react-router-dom";
import {
    OutputItem,
    ItemType,
    useGetItemsQuery,
    useUpdateItemMutation,
} from "src/clients/generatedGatewayClient";
import CreateItemDialog from "src/components/Items/CreateItemDialog";
import DeleteItemDialog from "src/components/Items/DeleteItemDialog";
import {
    updateFilterModel,
    updatePaginationModel,
    updateSortModel,
    useItemTableQuery,
    useItemTableState,
} from "src/store/components/itemTableSlice";
import { addSnackbarMessage } from "src/store/components/snackbarSlice";
import { basicFullMatchOperator } from "src/utils/gridFilterOperators";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 350, filterable: false },
    {
        field: "created_at",
        headerName: "Created",
        width: 350,
        filterable: false,
        type: "datetime",
        valueGetter: (date: GridValueGetterParams): Date | null => {
            if (!date.value) {
                return null;
            }
            return dayjs(date.value).toDate();
        },
        valueFormatter: (
            date: GridValueFormatterParams<Date | null>,
        ): string | null => {
            if (!date) {
                return null;
            }
            return dayjs(date.value).format("lll");
        },
    },
    {
        field: "label",
        headerName: "Label",
        editable: true,
        filterOperators: basicFullMatchOperator,
        width: 200,
    },
    {
        field: "item_type",
        headerName: "Type",
        filterable: true,
        editable: true,
        type: "singleSelect",
        valueOptions: Object.values(ItemType),
        width: 200,
    },
    {
        field: "raw_label",
        headerName: "Raw Label",
        filterable: false,
        width: 200,
    },
];

const ItemView = () => {
    const [createItemDialog, setCreateItemDialog] = useState<boolean>(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState<boolean>(false);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const dispatch = useDispatch();
    const itemTableState = useItemTableState();

    const query = useItemTableQuery();
    const { data } = useGetItemsQuery(query);
    const [updateItem] = useUpdateItemMutation();

    const items: OutputItem[] = data?.items ?? [];

    const processRowUpdate = useCallback(
        async (newRow: GridRowModel) => {
            return updateItem({
                itemUpdateRequest: {
                    id: newRow.id,
                    ...newRow,
                },
            })
                .unwrap()
                .then((data: OutputItem) => {
                    dispatch(
                        addSnackbarMessage({
                            message: "Edited item",
                            severity: "success",
                            duration: 5000,
                        }),
                    );
                    return data;
                });
        },
        [updateItem, dispatch],
    );

    const handleCreateSnackbar = () => {
        dispatch(
            addSnackbarMessage({
                message: "Refreshing...",
                severity: "info",
                duration: 2000,
            }),
        );
    };

    const handleProcessRowUpdateError = useCallback(
        (error: ErrorResponse) => {
            dispatch(
                addSnackbarMessage({
                    message: "Failed to update item - " + error.data.detail,
                    severity: "error",
                    duration: 5000,
                }),
            );
        },
        [dispatch],
    );

    const handleRowSelectionChange = useCallback(
        (rowSelectionModel: GridRowSelectionModel) => {
            if (!rowSelectionModel.length) {
                setSelectedRowId(null);
            } else {
                setSelectedRowId(rowSelectionModel[0].toString());
            }
        },
        [],
    );

    const handlePaginationModelChange = useCallback(
        (newModel: GridPaginationModel) => {
            dispatch(updatePaginationModel(newModel));
        },
        [dispatch],
    );

    const handleSortModelChange = useCallback(
        (newModel: GridSortModel) => {
            dispatch(updateSortModel(newModel));
        },
        [dispatch],
    );

    const handleFilterModelChange = useCallback(
        (newModel: GridFilterModel) => {
            console.log(newModel);
            dispatch(updateFilterModel(newModel));
        },
        [dispatch],
    );

    return (
        <Box
            sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ justifyContent: "flex-end", display: "flex", py: 2 }}>
                <CreateItemDialog
                    open={createItemDialog}
                    onClose={() => setCreateItemDialog(false)}
                />
                <DeleteItemDialog
                    open={deleteItemDialog}
                    onClose={() => setDeleteItemDialog(false)}
                    itemId={selectedRowId ?? ""}
                />
                <Button
                    sx={{ mr: 1 }}
                    onClick={() => handleCreateSnackbar()}
                    variant="outlined"
                >
                    Refresh
                </Button>
                <Button
                    sx={{ mr: 1 }}
                    onClick={() => setCreateItemDialog(true)}
                    variant="outlined"
                >
                    Create Item
                </Button>
                <Button
                    onClick={() => setDeleteItemDialog(true)}
                    variant="outlined"
                    disabled={!selectedRowId}
                >
                    Delete Item
                </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    onRowSelectionModelChange={handleRowSelectionChange}
                    sortingMode="server"
                    // TODO: Set up server filter
                    filterMode="server"
                    filterModel={itemTableState.filterModel}
                    onFilterModelChange={handleFilterModelChange}
                    paginationModel={itemTableState.paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    sortModel={itemTableState.sortModel}
                    onSortModelChange={handleSortModelChange}
                />
            </Box>
        </Box>
    );
};
export default ItemView;
