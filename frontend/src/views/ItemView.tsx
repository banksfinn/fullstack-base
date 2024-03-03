import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorResponse } from "react-router-dom";
import {
    OutputItem,
    useGetItemsItemsGetQuery,
    useUpdateItemItemsPatchMutation,
} from "src/clients/generatedGatewayClient";
import CreateItemDialog from "src/components/Items/CreateItemDialog";
import { addSnackbarMessage } from "src/store/components/snackbarSlice";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 350 },
    {
        field: "label",
        headerName: "Label",
        editable: true,
        width: 200,
    },
    {
        field: "raw_label",
        headerName: "Raw Label",
        width: 200,
    },
];

const ItemView = () => {
    const [createItemDialog, setCreateItemDialog] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { data } = useGetItemsItemsGetQuery({});
    const [updateItem] = useUpdateItemItemsPatchMutation();

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
                    onClick={() => setCreateItemDialog(true)}
                    variant="outlined"
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
                />
            </Box>
        </Box>
    );
};
export default ItemView;
