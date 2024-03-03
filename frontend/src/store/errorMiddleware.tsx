import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { logoutUser } from "./components/authSlice";

export const apiErrorMiddleware: Middleware =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api: MiddlewareAPI) => (next) => (action: any) => {
        if (isRejectedWithValue(action)) {
            // Handle rejected requests
            if (action.payload.status === 401) {
                api.dispatch(logoutUser());
            }
        } else {
            if (action.type.includes("executeMutation")) {
                if (action.meta) {
                    console.log(action.meta);
                }
            }
        }
        return next(action);
    };
