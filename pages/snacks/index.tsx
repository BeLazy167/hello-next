import {
    Button,
    Center,
    FormControl,
    Heading,
    Radio,
    RadioGroup,
    Stack,
    Text as ChakraText,
    VStack,
    useToast,
    Link,
    HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";
import cookie from "js-cookie";
import { LoaderTwo } from "../../components/Loader";
import { FcHome } from "react-icons/fc";
async function upsertData(data: any) {
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

async function getDaySnack() {
    const res = await fetch("/api/daySnack");
    if (!res.ok) {
        throw new Error("Failed to get data");
    }

    return await res.json();
}

export default function Page1() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [time, setTime] = useState<number>();

    let stopper = setInterval(() => {
        setTime(new Date().getUTCHours());

        setIsDisabled(!(time >= 4 && time < 8));
    }, 1000);

    setTimeout(() => {
        clearInterval(stopper);
    }, 5000);

    const toast = useToast();
    const { data: getDaySnackData, isLoading: getSnackDataLoading } = useQuery(
        ["daySnack"],
        getDaySnack
    );

    const { data: session } = useSession({ required: true });
    const [data, setData] = useState({
        name: "",
        email: "",
        snack: "",
    });

    useEffect(() => {
        setData((data) => {
            return {
                ...data,
                name: session?.user?.name,
                email: session?.user?.email,
            };
        });
    }, [session]);

    const handleSubmit = async (e: any) => {
        if (isDisabled || !data.snack) {
            if (isDisabled) {
                toast({
                    title: "Snacks are only available between 4:00 AM and 8:00 AM",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
            if (!data.snack) {
                toast({
                    title: "Please select a snack",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        } else {
            e.preventDefault();
            toast({
                title: "Submitting",
                description: "Submitting your snack choice",
                status: "info",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            mutate(data);
        }
    };
    const handleRadioChange = (e: any) => {
        setData({ ...data, snack: e });
    };

    const { mutate, isLoading } = useMutation(upsertData, {
        onSuccess: (data) => {
            if (data.isFound) {
                cookie.set("snackData", JSON.stringify(data), {
                    expires: 1 / (24 * 60),
                });
                toast({
                    title: "Snack updated successfully",
                    description: "Your id is " + data.id,
                    status: "success",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });

                Router.push("/snacks/thanks");
            } else {
                cookie.set("snackData", JSON.stringify(data), {
                    expires: 1 / (24 * 60),
                });
                toast({
                    title: "Snack submitted successfully",
                    status: "success",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });

                Router.push("/snacks/thanks");
            }
        },
    });
    const renderOptions = () => {
        return (
            <Stack direction="row">
                {getDaySnackData?.map((item: any, index: number) => (
                    <Radio key={index} value={item}>
                        {item}
                    </Radio>
                ))}
            </Stack>
        );
    };

    return (
        <Center w="50%" mx="auto" mt="10%">
            <FormControl>
                <Center mt={5}>
                    <VStack>
                        <Heading> Hey {session?.user?.name}</Heading>
                        <ChakraText>
                            What would you like to have today?
                        </ChakraText>
                        <RadioGroup
                            onChange={(e) => handleRadioChange(e)}
                            value={data.snack}
                        >
                            {getSnackDataLoading ? (
                                <LoaderTwo />
                            ) : (
                                renderOptions()
                            )}
                        </RadioGroup>
                        <HStack>
                            <Link href="/">
                                <Button leftIcon={<FcHome />} variant="outline">
                                    GoBack
                                </Button>
                            </Link>
                            <Button
                                disabled={isDisabled}
                                onClick={handleSubmit}
                                size={"lg"}
                            >
                                Submit
                            </Button>
                        </HStack>
                    </VStack>
                </Center>
            </FormControl>
        </Center>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (new Date().getUTCDay() === 6 || new Date().getUTCDay() === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
