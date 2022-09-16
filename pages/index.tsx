import Link from "../node_modules/next/link";
import { Flex, Heading, Button, HStack } from "@chakra-ui/react";
import client from "./react-query-client";
import { useQuery, dehydrate } from "@tanstack/react-query";
import { useSession, getProviders } from "next-auth/react";
import BasicStatistics from "./stats";
import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("./auth"));
const fetcher = async (u: string) => await fetch(u).then((res) => res.json());

export default function Home({ providers }) {
    const { data: session } = useSession();
    const { data: allData, isLoading } = useQuery(
        ["allData"],
        async () => await fetcher("/api/allData")
    );

    if (!session) {
        return (
            <Flex
                direction="column"
                height="90vh"
                alignItems="center"
                justifyContent="center"
            >
                <Heading>Welcome to Snacks App</Heading>

                <SignIn providers={providers} />
                <BasicStatistics isLoading={isLoading} />
            </Flex>
        );
    } else {
        return (
            <Flex
                direction="column"
                height="90vh"
                alignItems="center"
                justifyContent="center"
            >
                <Heading>Welcome {`${session.user.name}!`}</Heading>
                <HStack mt={4}>
                    <Link
                        href={{
                            pathname: "./temp",
                        }}
                    >
                        <Button colorScheme="teal">Get Snacks!</Button>
                    </Link>

                    <Link
                        href={{
                            pathname: "./account",
                        }}
                    >
                        <Button
                            variant="outline"
                            colorScheme="teal"
                            disabled={isLoading}
                        >
                            My Account
                        </Button>
                    </Link>
                </HStack>
                <BasicStatistics isLoading={isLoading} />
            </Flex>
        );
    }
}

export async function getStaticProps() {
    await client.prefetchQuery(
        ["allData"],
        async () => await fetcher("/api/allData")
    );
    return {
        revalidate: 30,

        props: {
            dehydratedState: dehydrate(client),
            providers: await getProviders(),
        },
    };
}
