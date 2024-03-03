import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { logoutUser } from "./components/authSlice";
import { addSnackbarMessage } from "./components/snackbarSlice";

export const apiErrorMiddleware: Middleware =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api: MiddlewareAPI) => (next) => (action: any) => {
        if (isRejectedWithValue(action)) {
            // Handle rejected requests
            if (action.payload.status === 401) {
                api.dispatch(logoutUser());
            } else {
                api.dispatch(
                    addSnackbarMessage({
                        message: action.payload.data,
                        severity: "error",
                        duration: 5000,
                    }),
                );
            }
            console.error(action);
        } else {
            if (
                action.type.includes("executeMutation") &&
                action.meta &&
                action.meta.requestStatus === "fulfilled"
            ) {
                if (action.meta) {
                    const endpoint: string = action.meta.arg.endpointName;
                    if (endpoint.includes("create")) {
                        api.dispatch(
                            addSnackbarMessage({
                                message: "Created",
                                severity: "success",
                                duration: 5000,
                            }),
                        );
                    } else if (endpoint.includes("delete")) {
                        api.dispatch(
                            addSnackbarMessage({
                                message: "Deleted",
                                severity: "success",
                                duration: 5000,
                            }),
                        );
                    } else if (endpoint.includes("update")) {
                        api.dispatch(
                            addSnackbarMessage({
                                message: "Updated",
                                severity: "success",
                                duration: 5000,
                            }),
                        );
                    } else {
                        console.log(
                            "Uncaught fulfillment at endpoint: " + endpoint,
                        );
                    }
                }
            }
        }
        return next(action);
    };
