import { Box, Button } from "@mui/material";
import { logoutUser } from "src/store/components/userSlice";
import { useAppDispatch } from "src/store/hooks";

const PersonalView = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
      <Button onClick={() => handleLogout()}>Logout</Button>
    </Box>
  );
};
export default PersonalView;
