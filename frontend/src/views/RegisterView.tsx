import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHandleRegisterUserRegisterPostMutation } from "src/clients/generatedGatewayClient";
import { updateUserState } from "src/store/components/authSlice";
import {
    updateDiplayName,
    updatePassword,
    updateUserEmail,
    useRegistrationState,
} from "src/store/components/registerUserSlice";

const RegisterView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registrationState = useRegistrationState();

    const [registerUser] = useHandleRegisterUserRegisterPostMutation();

    const handleSubmit = () => {
        registerUser({ userCreateRequest: registrationState })
            .unwrap()
            .then((response): void => {
                dispatch(
                    updateUserState({
                        accessToken: response.access_token,
                    }),
                );
                navigate("/items");
            });
    };

    return (
        <Dialog open={true} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
                sx={{
                    p: 4,
                    width: "500px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ width: "100%", my: 2, mb: 4 }}>
                    <Typography variant="h4">Register</Typography>
                </Box>
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        label="Display Name"
                        value={registrationState.display_name}
                        onChange={(e) =>
                            dispatch(updateDiplayName(e.target.value))
                        }
                        sx={{ my: 1 }}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={registrationState.user_email}
                        onChange={(e) =>
                            dispatch(updateUserEmail(e.target.value))
                        }
                        sx={{ my: 1 }}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        value={registrationState.password}
                        onChange={(e) =>
                            dispatch(updatePassword(e.target.value))
                        }
                        sx={{ my: 1 }}
                        fullWidth
                    />
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
export default RegisterView;
