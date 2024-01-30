import { Box, Button, Card, Link, TextField, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginAccessTokenLoginTokenPostMutation } from "src/clients/generatedGatewayClient";
import { getLoginState } from "src/store/components/loginSlice";
import { updateEmail, updatePassword } from "src/store/components/loginSlice";
import { updateUserState } from "src/store/components/userSlice";
import { RootState } from "src/store/store";

const LoginView = () => {
  const loginState = useSelector((state: RootState) => getLoginState(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitLogin] = useLoginAccessTokenLoginTokenPostMutation();

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateEmail(e.target.value));
  };
  const handleUpdatePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(updatePassword(e.target.value));
  };

  const handleSubmitRegistration = useCallback(() => {
    submitLogin({
      userLoginRequest: {
        user_email: loginState.email,
        password: loginState.password,
      },
    }).then((response): void => {
      if (response && "data" in response) {
        dispatch(
          updateUserState({
            user: response.data.user,
            accessToken: response.data.access_token,
          }),
        );
        navigate("/home");
        // Set active user
      } else {
        console.error("Failed to log in");
      }
    });
    // N
  }, [loginState, submitLogin, dispatch, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Dressr
      </Typography>
      <Card sx={{ p: 4, display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <Link href="/register">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Register
          </Typography>
        </Link>

        <TextField
          type="email"
          label="Email"
          sx={{ my: 1 }}
          value={loginState.email}
          onChange={handleUpdateEmail}
        />
        <TextField
          autoComplete="new-password"
          type="password"
          label="Password"
          sx={{ my: 1 }}
          value={loginState.password}
          onChange={handleUpdatePassword}
        />

        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleSubmitRegistration}
        >
          Submit
        </Button>
      </Card>
    </Box>
  );
};
export default LoginView;
