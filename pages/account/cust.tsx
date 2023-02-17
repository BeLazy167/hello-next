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
} from "@chakra-ui/react";

import { QueryClient } from "@tanstack/react-query";
const client = new QueryClient();

export default function NewIndex() {

    const { data: session } = useSession({ required: true });

    if (session) {
        return (
            <div className="full-width">
                <div className="profile-card">
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
                                    <Text fontWeight={600}>23k</Text>
                                    <Text fontSize={"sm"} color={"gray.500"}>
                                        Followers
                                    </Text>
                                </Stack>
                                <Stack spacing={0} align={"center"}>
                                    <Text fontWeight={600}>23k</Text>
                                    <Text fontSize={"sm"} color={"gray.500"}>
                                        Followers
                                    </Text>
                                </Stack>
                            </Stack>

                            <Button
                                onClick={() => signOut()}
                                w={"full"}
                                mt={8}
                                color={"white"}
                                rounded={"md"}
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                }}
                            >
                                Sign out
                            </Button>
                        </Box>
                    </Box>
                </div>
                <div className="center-div">

                </div>
            </div>
        )
    }
}