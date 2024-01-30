import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "src/store/components/userSlice";

const UserIcon = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handlePersonalPage = () => {
    navigate("/me");
  };

  if (!currentUser.user) {
    return <Button onClick={() => handleLoginButton()}>Login</Button>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Button sx={{ minWidth: 0, p: 0 }} onClick={handlePersonalPage}>
        <Avatar
          sx={{ height: "32px", width: "32px", bgcolor: green[500] }}
          variant="rounded"
        >
          <AccountCircleOutlined />
        </Avatar>
      </Button>
    </Box>
  );
};
export default UserIcon;
