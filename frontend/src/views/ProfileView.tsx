import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "src/store/components/authSlice";

const ProfileView = () => {
    const user = useCurrentUser();
    console.log(user);
    return (
        <Box
            sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ width: "100%", my: 2, mb: 4 }}>
                <Typography variant="h4">{user.user?.display_name}</Typography>
                <Typography variant="h4">{user.user?.user_email}</Typography>
            </Box>
        </Box>
    );
};
export default ProfileView;
