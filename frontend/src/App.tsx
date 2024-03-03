import { ThemeProvider, createTheme } from "@mui/material";
import Router from "./router/router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppFrameView from "./views/AppFrameView";
import AuthProvider from "./providers/AuthProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
// import { updateUser } from './store/components/userSlice';
// import { useGetCurrentUserMeGetQuery } from './clients/generatedGatewayClient';

function App() {
    const theme = createTheme({
        palette: {
            mode: "light",
        },
    });
    // const { data: userData } = useGetCurrentUserMeGetQuery()

    // // If we don't have access token, redirect them to sign up
    // if (userData) {
    //   dispatch(updateUser(userData))
    // }

    // TODO: ToastProvider
    // TODO: AuthProvider

    return (
        <div className="App">
            <SnackbarProvider>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <AppFrameView>
                                <Router />
                            </AppFrameView>
                        </BrowserRouter>
                    </ThemeProvider>
                </AuthProvider>
            </SnackbarProvider>
        </div>
    );
}

export default App;
