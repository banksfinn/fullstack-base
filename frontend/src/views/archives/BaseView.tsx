import {
  AddAPhotoSharp,
  AddBoxRounded,
  ConfirmationNumberSharp,
  Dns,
  Home,
} from "@mui/icons-material";
import { Box, Card, IconButton, useTheme } from "@mui/material";
import React from "react";
// // import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import UserIcon from "src/components/User/UserIcon";
// import { getCurrentUser } from "src/store/components/userSlice"
// import { RootState } from "src/store/store"

interface BaseViewProps {
  children: React.ReactElement[] | React.ReactElement;
}

const BaseView = (props: BaseViewProps) => {
  const { children } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  // const location = useLocation()

  // const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  // const [drawerOpen, setDrawerOpen] = useState<boolean>()

  // const userInfo = useSelector((state: RootState) => getCurrentUser(state))

  // if (!userInfo.accessToken || !userInfo.user) {
  //     navigate("/login")
  // }

  // This is the mobile view
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        flexDirection: "column",
      }}
    >
      <Card sx={{ height: "50px", position: "fixed", width: "100%" }}>
        <Box
          sx={{
            height: "32px",
            display: "flex",
            flexDirection: "row",
            width: "calc(100% - 16px)",
            p: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <UserIcon />
        </Box>
      </Card>
      {/* <SwipeableDrawer
            anchor={"right"}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={drawerOpen}
            onClose={() => setDrawerOpen(true)}
            onOpen={() => setDrawerOpen(false)}
            >
            drawer
            </SwipeableDrawer>
            <Card sx={{ height: "64px", display: "flex", flexDirection: 'row', width: 'calc(100% - 16px)', p: 1, position: 'absolute'}}>
            <Button variant="outlined" sx={{ mb: 1}} onClick={() => navigate('/wardrobe')} disabled={location.pathname === "/wardrobe"}>Wardrobe</Button>
                <Button variant="outlined" sx={{ mb: 1, ml: 1}} onClick={() => navigate('/home')} disabled={location.pathname === "/home"}>Fits</Button>
                <Button variant="outlined" sx={{ mb: 1, ml: 1}} onClick={() => navigate('/create/fit')}  disabled={location.pathname === "/create/fit"}>Create Fit</Button>
                <Button variant="outlined" sx={{ mb: 1, ml: 1}} onClick={() => navigate('/create/article')}  disabled={location.pathname === "/create/article"}>Create Article</Button>
                <Box sx={{ flexGrow: 1}}/>
                <UserIcon/>
            </Card> */}
      {/* <Card sx={{ py: 2, width: "100%", flexDirection: 'row', position: 'absolute', height: '100px', display: 'flex'}}>

                <Alert severity="info" variant="outlined" sx={{ mx: 2 }}>The navigation system will (obviously) be redesigned</Alert>
            </Card> */}
      <Box sx={{ width: "100%", overflow: "scroll", my: "80px" }}>
        {children}
      </Box>
      <Box
        sx={{
          height: "80px",
          position: "fixed",
          top: "calc(100% - 80px)",
          width: "100%",
        }}
      >
        <Card
          sx={{
            height: "64px",
            display: "flex",
            flexDirection: "row",
            width: "calc(100% - 16px)",
            p: 1,
            borderTop: "2px solid grey",
            justifyContent: "space-between",
          }}
        >
          <IconButton size="large" onClick={() => navigate("/home")}>
            <Home fontSize="large" />
          </IconButton>
          <IconButton size="large" onClick={() => navigate("/fits")}>
            <ConfirmationNumberSharp fontSize="large" />
          </IconButton>
          <IconButton size="large" onClick={() => navigate("/create/fit")}>
            <AddAPhotoSharp fontSize="large" />
          </IconButton>
          <IconButton size="large" onClick={() => navigate("/create/article")}>
            <AddBoxRounded fontSize="large" />
          </IconButton>
          <IconButton size="large" onClick={() => navigate("/wardrobe")}>
            <Dns fontSize="large" />
          </IconButton>
        </Card>
      </Box>
    </Box>
  );
};
export default BaseView;
