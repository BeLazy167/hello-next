import { ChakraProvider } from "@chakra-ui/react";
import {
    QueryClientProvider,
    Hydrate,
    QueryClient,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export default function MyApp({ Component, pageProps, session }) {
    const [client] = React.useState(() => new QueryClient());
    return (
        <ChakraProvider>
            <QueryClientProvider client={client}>
                <Hydrate state={pageProps.dehydratedState}>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />
                        <ReactQueryDevtools />
                    </SessionProvider>
                </Hydrate>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
