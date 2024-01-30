import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessTokenFromCookie } from "src/store/components/authSlice";

export const baseGatewayClient = createApi({
  // TODO: Change this to environment variable or proxied
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/gateway",
    prepareHeaders: (headers) => {
      const token = getAccessTokenFromCookie();
      if (token) {
        headers.set("Authorization", "Bearer " + token);
        return headers;
      }
    },
  }),
  endpoints: () => ({}),
});
