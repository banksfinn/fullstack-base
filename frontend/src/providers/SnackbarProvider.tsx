import { Alert, Snackbar } from "@mui/material";
import {
    clearSnackbarMessage,
    useActiveSnackbarMessage,
} from "src/store/components/snackbarSlice";
import { useAppDispatch } from "src/store/hooks";

interface SnackbarProviderProps {
    children: React.ReactNode;
}

const SnackbarProvider = (props: SnackbarProviderProps) => {
    const dispatch = useAppDispatch();
    const currentSnackbarMessage = useActiveSnackbarMessage();

    const handleCloseSnackbar = () => {
        dispatch(clearSnackbarMessage());
    };
    return (
        <div>
            {currentSnackbarMessage && (
                <Snackbar
                    open
                    onClose={handleCloseSnackbar}
                    autoHideDuration={currentSnackbarMessage.duration}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert severity={currentSnackbarMessage.severity}>
                        {currentSnackbarMessage.message}
                    </Alert>
                </Snackbar>
            )}
            {props.children}
        </div>
    );
};
export default SnackbarProvider;
