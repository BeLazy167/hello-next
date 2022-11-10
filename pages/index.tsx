import Link from "../node_modules/next/link";
import { Flex, Heading, Button, HStack } from "@chakra-ui/react";
import Loader from "../components/Loader";
import { useSession, getProviders, getSession } from "next-auth/react";
import BasicStatistics from "./stats";
import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("../components/SignIn"), {
    loading: () => <Loader />,
});

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
                            pathname: "./snacks",
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

export async function getStaticProps(context: any) {
    return {
        props: {
            providers: await getProviders(),
            session: await getSession(context),
        },
    };
}
