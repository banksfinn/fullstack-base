import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  VisibilityType,
  useRegisterUserRegisterPostMutation,
} from "src/clients/generatedGatewayClient";
import {
  getRegistrationIsValid,
  getRegistrationState,
  updateDisplayName,
  updateEmail,
  updatePassword,
  updateProfileType,
} from "src/store/components/registerSlice";
import { updateUserState } from "src/store/components/userSlice";
import { RootState } from "src/store/store";

const RegisterView = () => {
  const registerState = useSelector((state: RootState) =>
    getRegistrationState(state),
  );
  const validRegistration = useSelector((state: RootState) =>
    getRegistrationIsValid(state),
  );
  const dispatch = useDispatch();
  const [submitRegistration] = useRegisterUserRegisterPostMutation();

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateEmail(e.target.value));
  };
  const handleUpdatePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(updatePassword(e.target.value));
  };

  const handleUpdateProfileType = (event: SelectChangeEvent): void => {
    dispatch(updateProfileType(event.target.value as VisibilityType));
  };

  const handleUpdateDisplayName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(updateDisplayName(e.target.value));
  };

  const handleSubmitRegistration = useCallback(() => {
    submitRegistration({
      userCreationRequest: {
        user_email: registerState.email,
        password: registerState.password,
        visibility: registerState.profileType,
        display_name: registerState.displayName,
      },
    }).then((response): void => {
      if (response && "data" in response) {
        dispatch(
          updateUserState({
            user: response.data.user,
            accessToken: response.data.access_token,
          }),
        );
        // Update the current user
      } else {
        console.error("Failed to log in");
      }
    });
  }, [registerState, submitRegistration, dispatch]);

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
          Register
        </Typography>
        <Link href="/login">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Log In
          </Typography>
        </Link>
        <TextField
          type="text"
          label="Display Name"
          sx={{ my: 1 }}
          value={registerState.displayName}
          onChange={handleUpdateDisplayName}
        />
        <TextField
          type="email"
          label="Email"
          sx={{ my: 1 }}
          value={registerState.email}
          onChange={handleUpdateEmail}
        />
        <TextField
          autoComplete="new-password"
          type="password"
          label="Password"
          sx={{ my: 1 }}
          value={registerState.password}
          onChange={handleUpdatePassword}
        />
        <Box sx={{ width: "100%" }}>
          <FormControl sx={{ my: 1, width: "100%" }}>
            <InputLabel id="profile-type-selector">Profile Type</InputLabel>
            <Select
              labelId="profile-type-selector"
              label="Profile Type"
              disabled
              value={registerState.profileType}
              onChange={handleUpdateProfileType}
              fullWidth
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Public</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Alert severity="info">
          Planning on adding private accounts, but where's the fun in that right
          now?
        </Alert>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 4 }}
          disabled={!validRegistration}
          onClick={handleSubmitRegistration}
        >
          Submit
        </Button>
      </Card>
    </Box>
  );
};
export default RegisterView;
