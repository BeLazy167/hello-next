import Link from "../node_modules/next/link";
import { Flex, Heading, Button, Text, HStack } from "@chakra-ui/react";
import client from "./react-query-client";
import { useQuery, dehydrate } from "@tanstack/react-query";
import { useSession, signIn } from "next-auth/react";
import BasicStatistics from "./stats";

const fetcher = async (u: string) => await fetch(u).then((res) => res.json());

export default function Home() {
    const { data: session } = useSession();
    const { data: allData, isLoading } = useQuery(
        ["allData"],
        async () => await fetcher("/api/allData")
    );

    if (!session) {
        return (
            <>
                <Flex
                    direction="column"
                    height="90vh"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Heading>Welcome to Snacks App</Heading>
                    <Text mt={3}>Click below to Sign In</Text>
                    <Button
                        onClick={() => signIn()}
                        variant="outline"
                        colorScheme="teal"
                        mt={4}
                    >
                        Sign in
                    </Button>
                    <BasicStatistics isLoading={isLoading} />
                </Flex>
            </>
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

export async function getStaticProps(context) {
    await client.prefetchQuery(
        ["allData"],
        async () => await fetcher("/api/allData")
    );
    return {
        revalidate: 30,
        props: {
            dehydratedState: dehydrate(client),
        },
    };
}
