import { DynamicFeed, Menu as MenuIcon } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "src/store/components/authSlice";
import { addSnackbarMessage } from "src/store/components/snackbarSlice";

interface AppFrameViewProps {
    children: React.ReactNode;
}

const drawerWidth = 240;

interface NavigationLocation {
    name: string;
    route: string;
    icon: React.ReactNode;
}

const navigationLocations: NavigationLocation[] = [
    {
        name: "Items",
        route: "/items",
        icon: <DynamicFeed />,
    },
];

const AppFrameView = (props: AppFrameViewProps) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [avatarAnchor, setAvatarAnchor] = React.useState<null | HTMLElement>(
        null,
    );
    const userMenuOpen = Boolean(avatarAnchor);

    const [navigationBarOpen, setNavigationBarOpen] =
        React.useState<boolean>(true);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAvatarAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setAvatarAnchor(null);
    };

    const handleProfileClick = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogoutClick = () => {
        handleClose();
        dispatch(logoutUser());
        dispatch(
            addSnackbarMessage({
                message: "Logged out successfully",
                severity: "info",
                duration: 5000,
            }),
        );
    };

    const selected = (nav: NavigationLocation) =>
        location.pathname === nav.route;

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <AppBar
                position="absolute"
                sx={{
                    height: "64px",
                    zindex: 5,
                    width: navigationBarOpen
                        ? `calc(100% - ${drawerWidth}px)`
                        : "100%",
                    transition: theme.transitions.create(["width", "margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() =>
                                setNavigationBarOpen(!navigationBarOpen)
                            }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography>Project Title</Typography>
                    </Box>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleAvatarClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={
                                userMenuOpen ? "account-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={userMenuOpen ? "true" : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={avatarAnchor}
                        id="account-menu"
                        open={userMenuOpen}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem onClick={handleProfileClick}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                open={navigationBarOpen}
                variant="permanent"
                sx={{
                    width: navigationBarOpen ? `${drawerWidth}px` : "0",
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: navigationBarOpen
                            ? theme.transitions.duration.leavingScreen
                            : theme.transitions.duration.enteringScreen,
                    }),
                }}
                PaperProps={{
                    sx: {
                        width: navigationBarOpen ? `${drawerWidth}px` : "0",
                        transition: theme.transitions.create("width", {
                            easing: theme.transitions.easing.sharp,
                            duration: navigationBarOpen
                                ? theme.transitions.duration.leavingScreen
                                : theme.transitions.duration.enteringScreen,
                        }),
                        borderRight: navigationBarOpen
                            ? "1px solid rgba(0, 0, 0, 0.12)"
                            : "0px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            py: 2,
                            height: "32px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}
                    >
                        Project
                    </Typography>
                    {navigationLocations.map((nav: NavigationLocation) => {
                        return (
                            <ListItem
                                style={{ cursor: "pointer" }}
                                key={nav.route}
                            >
                                {nav.icon}
                                <Link
                                    to={nav.route}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        marginLeft: 2,
                                    }}
                                >
                                    <ListItemText
                                        primary={nav.name}
                                        sx={{
                                            fontSize: "24px",
                                            ml: 2,
                                            color: selected(nav)
                                                ? "primary.main"
                                                : "text.main",
                                        }}
                                        color={
                                            selected(nav) ? "red" : "text.main"
                                        }
                                    />
                                </Link>
                            </ListItem>
                        );
                    })}
                </Box>
            </Drawer>
            <main
                style={{
                    flexGrow: 1,
                    marginTop: "64px",
                    height: "calc(100vh - 64px)",
                    overflow: "auto",
                }}
            >
                <Box>
                    <Box>{props.children}</Box>
                </Box>
            </main>
        </Box>
    );
};

export default AppFrameView;
