import {
    Box,
    Button,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Toast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useSession, signOut, getSession } from "next-auth/react";

async function upsertData(data) {
    const res = await fetch("/api/upsertData", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to upsert data");
    }
    return await res.json();
}
async function getallData() {
    const res = await fetch("/api/allData");
    if (!res.ok) {
        throw new Error("Failed to get data");
    }

    return await res.json();
}
async function todayData() {
    const res = await fetch("/api/todayData");
    if (!res.ok) {
        throw new Error("Failed to get data");
    }

    return await res.json();
}

export default function Page1() {
    const { data: allData } = useQuery(["allDataAnother"], getallData);
    const { data: todayDataRes } = useQuery(["todayData"], todayData);
    const { data: session, status } = useSession({ required: true });
    const [data, setData] = useState({
        name: "",
        email: "",
        snack: "",
    });
    const [resData, setresData] = useState();

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        mutate(data);
    };

    const { mutate } = useMutation(upsertData, {
        onSuccess: (data) => {
            Toast({
                title: "Data added",
                description: "Data added successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        },
    });

    return (
        <Center w="50%" mx="auto" mt={10}>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" onChange={handleChange} />
                <FormHelperText>We'll never share your email.</FormHelperText>
                <FormLabel>Name</FormLabel>
                <Input name="name" onChange={handleChange} />
                <FormLabel>Snack</FormLabel>
                <Input name="snack" onChange={handleChange} />

                <Center mt={5}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Center>
                <h1>Todays Data Count : {todayDataRes?.length}</h1>
            </FormControl>
        </Center>
    );
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
