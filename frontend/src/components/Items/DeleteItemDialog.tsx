import { Box, Button, Dialog, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useDeleteItemItemsDeleteMutation } from "src/clients/generatedGatewayClient";

import { addSnackbarMessage } from "src/store/components/snackbarSlice";

interface DeleteItemDialogProps {
    open: boolean;
    onClose: () => void;
    itemId: string;
}

const DeleteItemDialog = (props: DeleteItemDialogProps) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();

    const [deleteItem] = useDeleteItemItemsDeleteMutation();

    const handleSubmit = () => {
        deleteItem({ itemDeleteRequest: { id: props.itemId } });
        onClose();
        dispatch(
            addSnackbarMessage({
                message: "Deleted item!",
                severity: "success",
                duration: 5000,
            }),
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{ display: "flex", flexDirection: "column" }}
        >
            <Box
                sx={{
                    p: 4,
                    width: "500px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ width: "100%", my: 2, mb: 4 }}>
                    <Typography variant="h4">Delete Item</Typography>
                </Box>
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        sx={{ alignSelf: "flex-end", mt: 4 }}
                        variant="contained"
                        onClick={() => handleSubmit()}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};
export default DeleteItemDialog;
