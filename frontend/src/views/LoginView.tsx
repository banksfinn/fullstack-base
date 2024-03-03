import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useHandleUserLoginLoginTokenPostMutation } from "src/clients/generatedGatewayClient";
import { updateUserState } from "src/store/components/authSlice";
import {
    updateLoginUserEmail,
    updateLoginUserPassword,
    useLoginState,
} from "src/store/components/loginUserSlice";
import { addSnackbarMessage } from "src/store/components/snackbarSlice";

const LoginView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginState = useLoginState();

    const [login] = useHandleUserLoginLoginTokenPostMutation();

    const handleSubmit = () => {
        login({ userLoginRequest: loginState })
            .unwrap()
            .then((response): void => {
                dispatch(
                    updateUserState({
                        accessToken: response.access_token,
                    }),
                );
                dispatch(
                    addSnackbarMessage({
                        message: "Login successful!",
                        severity: "success",
                        duration: 5000,
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
                    <Typography variant="h4">Log In</Typography>
                    <Typography>
                        or <Link to="/register">Register</Link>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        label="Email"
                        value={loginState.user_email}
                        onChange={(e) =>
                            dispatch(updateLoginUserEmail(e.target.value))
                        }
                        sx={{ my: 1 }}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        value={loginState.password}
                        onChange={(e) =>
                            dispatch(updateLoginUserPassword(e.target.value))
                        }
                        type="password"
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
export default LoginView;
