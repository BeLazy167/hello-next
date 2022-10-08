import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Input,
    Select,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, useMutation, useQueries } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

async function upsertData(data: any, url: string) {
    const res = await fetch(url, {
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
const fetcher = async (u: string) =>
    await fetch(u).then(async (res) => await res.json());
export default function Admin() {
    const Toast = useToast();

    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const [data, setData] = useState({
        day: "",
        snack: "",
    });
    const client = new QueryClient();
    const renderOptions = () => {
        return Days.map((day, idx) => {
            return (
                <option key={idx} value={day.toUpperCase()}>
                    {day}
                </option>
            );
        });
    };

    const dex = [
        {
            key: "allSnackData",
            url: "/api/allSnackData",
        },
        {
            key: "allNotificationData",
            url: "/api/allNotificationData",
        },
    ];

    const userQueries = useQueries({
        queries: dex.map((item) => {
            return {
                queryKey: [item.key],
                queryFn: () => fetcher(item.url),
            };
        }),
    });
    const { mutate: notiDataUpdate } = useMutation(
        (dataToSend: any) => upsertData(dataToSend, "/api/notificationUpdate"),
        {
            onSuccess: (data) => {
                alert("Notification data updated");
                client.removeQueries(["allNotificationData"]);
            },
        }
    );
    const { mutate, isLoading } = useMutation(
        (dataToSend: any) => upsertData(dataToSend, "/api/upsertSnackData"),
        {
            onSuccess: (data) => {
                alert("Success");
                client.resetQueries(["allSnackData"]);
                Toast({
                    title: `Successfully updated ${data.day} `,
                    description: "Data has been updated",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    );
    const handleSwitchChange = (e: any) => {
        const { id, checked } = e.target;
        let datax = {
            id: id,
            toSend: checked,
        };

        notiDataUpdate(datax);
    };
    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleClick = () => {
        if (data.day === "" || data.snack === "") {
            Toast({
                title: "Error",
                description: "Please fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        } else {
            let dataToSend = {
                day: data.day,
                snack: data.snack.split(",").map((item) => item.trim()),
            };
            mutate(dataToSend);
        }
    };

    const renderSnackTable = () => {
        return userQueries[0]?.data?.map((ele, idx) => {
            return (
                <Tr key={idx}>
                    <Td>{ele.day}</Td>
                    <Td>{ele.snack.join(", ")}</Td>
                    <Td>
                        {new Date(ele.updatedAt).getDate() +
                            "-" +
                            (new Date(ele.updatedAt).getMonth() + 1) +
                            "-" +
                            new Date(ele.updatedAt).getFullYear() +
                            " at" +
                            new Date(ele.updatedAt)
                                .toLocaleString()
                                .split(",")[1]}
                    </Td>
                </Tr>
            );
        });
    };
    const renderNotiTable = () => {
        return userQueries[1]?.data?.map((ele: any, idx) => {
            return (
                <HStack key={idx}>
                    <h1>{ele.task}</h1>
                    <Switch
                        onChange={handleSwitchChange}
                        id={ele.id}
                        defaultChecked={ele.toSend}
                        ml={2}
                    ></Switch>
                </HStack>
            );
        });
    };
    return (
        <div>
            <Center mb={10}>
                <Heading>Admin</Heading>
            </Center>
            <Center mb={5}>
                <HStack width="80%" ml="20%">
                    <Select
                        colorScheme="teal"
                        borderColor="teal.500"
                        name="day"
                        width="20%"
                        variant="outline"
                        isRequired
                        value={data.day}
                        onChange={handleChange}
                        placeholder="Select Day"
                    >
                        {renderOptions()}
                    </Select>
                    <Input
                        width="50%"
                        name="snack"
                        value={data.snack}
                        onChange={handleChange}
                        placeholder="Enter Snack Here"
                    />
                    <Button
                        colorScheme="teal"
                        onClick={handleClick}
                        variant="outline"
                        size="md"
                    >
                        Set
                    </Button>
                </HStack>
            </Center>
            <Center mb={5}>
                <VStack>{renderNotiTable()}</VStack>
            </Center>

            <Center>
                {userQueries[0].isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Accordion allowToggle>
                        <AccordionItem>
                            <AccordionButton _expanded={{ color: "teal" }}>
                                <Box flex="1" textAlign="center">
                                    Current Snacks options
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4}>
                                <TableContainer
                                    border="1px solid #e2e8f0"
                                    borderRadius="5px"
                                >
                                    <Table size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>Day</Th>
                                                <Th>Snack</Th>
                                                <Th>Updated On</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>{renderSnackTable()}</Tbody>
                                    </Table>
                                </TableContainer>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                )}
            </Center>
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const AdminUsers = ["Roshan Maur", "Dhruv Khara"];
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    if (!AdminUsers.includes(session.user.name)) {
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
