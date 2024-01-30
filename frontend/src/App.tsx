import { ThemeProvider, createTheme } from "@mui/material";
import Router from "./router/router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AccessProvider from "./store/AccessProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="us">
          <AccessProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </AccessProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
