import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import client from "./react-query-client";
export default function MyApp({ Component, pageProps, session }) {
    return (
        <ChakraProvider>
            <QueryClientProvider client={client}>
                <Hydrate state={pageProps.dehydratedState}>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />;
                        <ReactQueryDevtools />
                    </SessionProvider>
                </Hydrate>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
