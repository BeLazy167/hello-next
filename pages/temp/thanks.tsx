import {
    Badge,
    Box,
    Button,
    Center,
    Text as ChakraText,
    VStack,
} from "@chakra-ui/react";
import { FcHome } from "react-icons/fc";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Link from "next/link";
export default function Thanks({ snackData }) {
    const { width, height } = useWindowSize();
    const { createdAt, email, updatedAt, isFound, ...restSnackData } =
        snackData;
    //timer 20 sec
    const [counter, setCounter] = useState(5);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter === 0) {
            setFlag(true);
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            <Confetti
                numberOfPieces={flag ? 0 : 200}
                width={width}
                height={height}
            />
            <Box>
                <Center>
                    <VStack mt={20}>
                        <ChakraText fontSize="4xl">
                            Thanks for your order
                        </ChakraText>
                        <ChakraText>🥰😋🤩</ChakraText>
                        <TableContainer boxShadow="lg">
                            <Table variant="simple" borderRadius="md">
                                <Thead>
                                    <Tr border="none">
                                        <Th as="kbd">Summary</Th>
                                    </Tr>
                                </Thead>
                                <TableCaption>
                                    <ChakraText as="kbd">
                                        Your order details{" "}
                                    </ChakraText>
                                    <ChakraText as="kbd" size="sm">
                                        filled at
                                        {
                                            new Date(updatedAt)
                                                .toLocaleString()
                                                .split(",")[1]
                                        }
                                    </ChakraText>
                                </TableCaption>

                                <Tbody>
                                    {Object.keys(restSnackData).map(
                                        (key, idx) => {
                                            return (
                                                <Tr key={idx}>
                                                    <Td>
                                                        <Badge>
                                                            {key.toUpperCase()}
                                                        </Badge>
                                                    </Td>
                                                    <Td>
                                                        <ChakraText as="samp">
                                                            {restSnackData[key]}
                                                        </ChakraText>
                                                    </Td>
                                                </Tr>
                                            );
                                        }
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Link href="/">
                            <Button leftIcon={<FcHome />} variant="outline">
                                GoBack
                            </Button>
                        </Link>
                    </VStack>
                </Center>
            </Box>
        </>
    );
}
export async function getServerSideProps({ req, res }) {
    const cook = req.cookies.snackData;
    if (cook === undefined) {
        return {
            redirect: {
                destination: "/temp",
                permanent: false,
            },
        };
    }
    const snackData = JSON.parse(req.cookies.snackData);
    return {
        props: { snackData },
    };
}
