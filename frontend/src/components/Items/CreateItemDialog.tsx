import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useCreateItemMutation } from "src/clients/generatedGatewayClient";
import {
    clearCreateForm,
    updateLabel,
    useItemCreationState,
} from "src/store/components/createItemSlice";
import { addSnackbarMessage } from "src/store/components/snackbarSlice";

interface CreateItemDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateItemDialog = (props: CreateItemDialogProps) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const itemState = useItemCreationState();

    const handleRawLabelChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(updateLabel(event.target.value));
    };

    const [createItem] = useCreateItemMutation();

    const handleSubmit = () => {
        createItem({ itemCreateRequest: itemState });
        dispatch(clearCreateForm());
        onClose();
        dispatch(
            addSnackbarMessage({
                message: "Created item!",
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
                    <Typography variant="h4">Create Item</Typography>
                </Box>
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        label="Raw Label"
                        value={itemState.raw_label}
                        onChange={handleRawLabelChange}
                        fullWidth
                    ></TextField>
                    <Button
                        sx={{ alignSelf: "flex-end", mt: 4 }}
                        variant="contained"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};
export default CreateItemDialog;
