import React, { useMemo } from "react";
import { useSession, getSession } from "next-auth/react";
import { Center, HStack, Stack, VStack } from "@chakra-ui/react";
import { LoaderThree } from "../../components/Loader";
import { QueryClient, useQuery } from "@tanstack/react-query";
import TableX from "../../components/Table";
import AccountCard from "../../components/AccountCard";
import HCard from "../../components/HCard";
import { useRouter } from "next/router";

export default function Account() {
    //get id from router
    const router = useRouter();
    const { id } = router.query as any;

    const getUserData = async () => {
        let bodyToSend = {
            email: id,
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
        ["user", id],
        getUserData
    );

    if (userDataLoading) {
        return (
            <Center mt={"20%"}>
                <LoaderThree />
            </Center>
        );
    }
    //id = dhruv.khara@wonderbiz.in
    if (id) {
        return (
            <Stack direction={["column", "row"]} h={"100vh"} mt={5}>
                <VStack width={"100vw"}>
                    <HCard
                        // genrate username from id

                        // userName={id}
                        userName={id.split("@")[0].split(".").join("")}
                        userData={userData}
                        disabled={userDataLoading}
                    />

                    <TableX userData={userData} />
                </VStack>
            </Stack>
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
