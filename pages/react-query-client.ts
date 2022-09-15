import { QueryClient } from "@tanstack/react-query";
import React from "react";
const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
export default client;
