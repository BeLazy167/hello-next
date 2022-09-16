import Link from "../node_modules/next/link";
import { Flex, Heading, Button, HStack } from "@chakra-ui/react";

import { useSession, getProviders } from "next-auth/react";
import BasicStatistics from "./stats";
import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("./auth"));

export default function Home({ providers }) {
    const { data: session } = useSession();

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
                <BasicStatistics />
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
                        <Button variant="outline" colorScheme="teal">
                            My Account
                        </Button>
                    </Link>
                </HStack>
                <BasicStatistics />
            </Flex>
        );
    }
}

export async function getStaticProps() {
    return {
        revalidate: 30,

        props: {
            providers: await getProviders(),
        },
    };
}
