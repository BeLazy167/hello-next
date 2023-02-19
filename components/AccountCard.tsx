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
import { signOut } from "next-auth/react";
import { FcHome } from "react-icons/fc";
export default function AccountCard({ userData, session }) {
    return (
        <Box
            minW={"300px"}
            minH={"450px"}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            ml={2}
            mt={10}
            mb={"auto"}
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
                    <Text color={"gray.500"}>{session.user.email}</Text>
                </Stack>

                <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                        <Text fontWeight={600}>{userData?.length}</Text>
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
    );
}
