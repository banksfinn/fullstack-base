import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserStateFromCookie } from "src/store/components/authSlice";

export const baseGatewayClient = createApi({
    // TODO: Change this to environment variable or proxied
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/gateway",
        prepareHeaders: (headers) => {
            const user = getUserStateFromCookie();
            if (user?.accessToken) {
                headers.set("Authorization", "Bearer " + user?.accessToken);
                return headers;
            }
        },
    }),
    endpoints: () => ({}),
});
