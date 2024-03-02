import { AccountBox, DynamicFeed, Menu } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

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
    {
        name: "Users",
        route: "/users",
        icon: <AccountBox />,
    },
];

const AppFrameView = (props: AppFrameViewProps) => {
    const theme = useTheme();
    const location = useLocation();
    const [navigationBarOpen, setNavigationBarOpen] =
        React.useState<boolean>(true);

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
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setNavigationBarOpen(!navigationBarOpen)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography>Project Title</Typography>
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
