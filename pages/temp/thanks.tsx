import {
    Badge,
    Box,
    Center,
    Text as ChakraText,
    VStack,
} from "@chakra-ui/react";
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
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
export default function Thanks() {
    const snackData = JSON.parse(localStorage.getItem("snackData") || "{}");
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
    console.log("counter", counter);
    return (
        <>
            <Confetti
                numberOfPieces={flag ? 0 : 200}
                width={width}
                height={height}
            />
            <Box>
                <Center>
                    <VStack>
                        <ChakraText fontSize="4xl">
                            Thanks for your order!
                        </ChakraText>
                        <TableContainer boxShadow="lg">
                            <Table variant="simple" borderRadius="md">
                                <Thead>
                                    <Tr>
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
                                    {Object.keys(restSnackData).map((key) => {
                                        return (
                                            <Tr>
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
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </Center>
            </Box>
        </>
    );
}
