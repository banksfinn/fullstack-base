import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import {
    OutputItem,
    useGetItemsItemsGetQuery,
} from "src/clients/generatedGatewayClient";
import CreateItemDialog from "src/components/Items/CreateItemDialog";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
        field: "label",
        headerName: "Label",
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

    const { data } = useGetItemsItemsGetQuery({});

    const items: OutputItem[] = data?.items ?? [];

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
                <DataGrid rows={items} columns={columns} />
            </Box>
        </Box>
    );
};
export default ItemView;
