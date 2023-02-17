import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Link,
} from "@chakra-ui/react";
import { LoaderThree } from "../../components/Loader";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { FcHome } from "react-icons/fc";
const client = new QueryClient();

const Account = () => {
    const { data: session } = useSession({ required: true });
    const getUserData = async () => {
        let bodyToSend = {
            email: session.user.email,
        };
        const res = await fetch("/api/getUserData", {
            method: "POST",
            body: JSON.stringify(bodyToSend),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get data");
        }
        return await res.json();
    };
    const { data: userData, isLoading: userDataLoading } = useQuery(
        ["user", session?.user?.email],
        getUserData
    );
    if (userDataLoading) {
        return (
            <Center mt={"20%"}>
                <LoaderThree />
            </Center>
        );
    }
    if (session) {
        return (
            <div>
                <Center py={6}>
                    <Box
                        maxW={"270px"}
                        w={"full"}
                        boxShadow={"2xl"}
                        rounded={"md"}
                        overflow={"hidden"}
                    >
                        <Image
                            h={"120px"}
                            w={"full"}
                            src={
                                "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                            }
                            objectFit={"cover"}
                        />
                        <Flex justify={"center"} mt={-12}>
                            <Avatar
                                size={"xl"}
                                src={session.user.image}
                                css={{
                                    border: "2px solid white",
                                }}
                            />
                        </Flex>

                        <Box p={6}>
                            <Stack spacing={0} align={"center"} mb={5}>
                                <Heading
                                    fontSize={"2xl"}
                                    fontWeight={500}
                                    fontFamily={"body"}
                                >
                                    {session.user.name}
                                </Heading>
                                <Text color={"gray.500"}>
                                    {session.user.email}
                                </Text>
                            </Stack>

                            <Stack
                                direction={"row"}
                                justify={"center"}
                                spacing={6}
                            >
                                <Stack spacing={0} align={"center"}>
                                    <Text fontWeight={600}>
                                        {userData?.length}
                                    </Text>
                                    <Text fontSize={"sm"} color={"gray.500"}>
                                        Total Snack
                                    </Text>
                                </Stack>
                                {/* <Stack spacing={0} align={"center"}>
                                    <Text fontWeight={600}>23k</Text>
                                    <Text fontSize={"sm"} color={"gray.500"}>
                                        Followers
                                    </Text>
                                </Stack> */}
                            </Stack>

                            <Button
                                onClick={() => signOut()}
                                w={"full"}
                                mt={8}
                                rounded={"md"}
                                variant="ghost"
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                }}
                            >
                                Sign out
                            </Button>
                            <Link href="/">
                                <Button
                                    leftIcon={<FcHome />}
                                    variant="solid"
                                    w={"full"}
                                    mt={1}
                                    rounded={"md"}
                                >
                                    GoBack
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Center>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not in </p>
            </div>
        );
    }
};
const fetcher = async (u) => await fetch(u).then((res) => res.json());

export default Account;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
};
