import React from "react";
import { signIn } from "next-auth/react";
import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
export default function SignIn({ providers }) {
    return (
        <Container maxW="xl" centerContent>
            <Box alignContent="center" justifyContent="center">
                <Stack isInline marginTop={10} mb={10}>
                    {Object.values(providers).map((provider: any) => {
                        if (provider.name === "Email") {
                            return;
                        }
                        return (
                            <Box key={provider.name}>
                                <Button
                                    leftIcon={<FcGoogle />}
                                    variant="outline"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign in with {provider.name}
                                </Button>
                            </Box>
                        );
                    })}
                </Stack>
            </Box>
        </Container>
    );
}
