import React, { useMemo } from "react";
import { useSession, getSession } from "next-auth/react";
import { Center, HStack, Stack, VStack } from "@chakra-ui/react";
import { LoaderThree } from "../../components/Loader";
import { QueryClient, useQuery } from "@tanstack/react-query";
import TableX from "../../components/Table";
import AccountCard from "../../components/AccountCard";
import HCard from "../../components/HCard";
import DownloadCsv from "../../components/DownloadCsv";
const client = new QueryClient();

export default function Account() {
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
            <Stack direction={['column', 'row']} h={"100vh"} mt={5}>
                <AccountCard userData={userData} session={session} />
                <VStack width={"100vw"}>
                    <HCard userData={userData} disabled={userDataLoading} />

                    <TableX userData={userData} />
                </VStack>
            </Stack>
        );
    } else {
        return (
            <div>
                <p>You are not in </p>
            </div>
        );
    }
}

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
