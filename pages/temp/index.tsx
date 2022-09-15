import {
    Box,
    Button,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Toast,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
async function getDaySnack() {
    const res = await fetch("/api/dauSnack");
    if (!res.ok) {
        throw new Error("Failed to get data");
    }

    return await res.json();
}

export default function Page1() {
    const { data: getDaySnackData } = useQuery(["daySnack"], getDaySnack);
    const { data: allData } = useQuery(["allDataAnother"], getallData);
    const { data: todayDataRes } = useQuery(["todayData"], todayData);
    const { data: session, status } = useSession({ required: true });

    const [data, setData] = useState({
        name: session?.user?.name,
        email: session?.user?.email,
        snack: "",
    });

    useEffect(() => {
        setData({
            ...data,
            name: session?.user?.name,
            email: session?.user?.email,
        });
    }, [session]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (data.snack === "") {
            alert("Please select a snack");
            return;
        } else {
            mutate(data);
        }
    };
    const handleRadioChange = (e: any) => {
        setData({ ...data, snack: e });
    };

    const { mutate, isLoading } = useMutation(upsertData, {
        onSuccess: (data) => {
            console.log(data);
        },
    });
    const renderOptions = () => {
        return (
            <Stack direction="row">
                {getDaySnackData?.map((item: any, index: number) => (
                    <Radio name="snack" key={index} value={item}>
                        {item}
                    </Radio>
                ))}
            </Stack>
        );
    };
    console.log(data);
    return (
        <Center w="50%" mx="auto" mt={10}>
            <FormControl>
                <Center mt={5}>
                    <VStack>
                        <RadioGroup
                            onChange={(e) => handleRadioChange(e)}
                            value={data.snack}
                        >
                            {getDaySnackData && renderOptions()}
                        </RadioGroup>
                        <Button disabled={isLoading} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </VStack>
                </Center>
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
