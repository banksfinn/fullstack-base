import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="us">
            <Provider store={store}>
                <App />
            </Provider>
        </LocalizationProvider>
    </React.StrictMode>,
);
