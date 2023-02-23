import {
    Badge,
    Box,
    HStack,
    Spacer,
    VStack,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    ModalCloseButton,
    useDisclosure,
    Center,
    UnorderedList,
    ListItem,
    Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
// {
//     "todayData": {
//       "Missal Pav": {
//         "count": 1,
//         "names": [
//           "Dhruv Khara"
//         ]
//       }
//     },
//     "length": 1
//   }

const nameRender = (stats: any) => {
    let snackKeys = Object.keys(stats.todayData);

    return snackKeys.map((snack, idx) => {
        return (
            <VStack key={idx} mt="1" lineHeight="tight">
                <Badge>{snack}: </Badge>

                <UnorderedList borderRadius="full" px="2" colorScheme="teal">
                    {stats?.todayData[snack]?.names.map((item, idx) => (
                        <ListItem key={idx}>{item}</ListItem>
                    ))}
                </UnorderedList>
            </VStack>
        );
    });
};

function ModalNames({ stats }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>open</Button>

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{nameRender(stats)}</ModalBody>

                    <ModalFooter>
                        <Center>
                            <Button onClick={onClose}>Close</Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default function StatBar({ stats, isLoading }) {
    const [data, setData] = useState({});
    const [dx, setDx] = useState([]);
    useEffect(() => {
        if (stats !== undefined) {
            setData(stats);
            setDx(Object.keys(stats?.["todayData"]));
        }
    }, [stats]);

    const renderX = () => {
        return dx.map((x: any, idx: any) => {
            return (
                <Box key={idx} mt="1" lineHeight="tight">
                    {x}:{" "}
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {data?.["todayData"][x]["count"]}
                    </Badge>
                </Box>
            );
        });
    };

    if (isLoading) {
        return (
            <Box w="55%" borderWidth="1px" borderRadius="lg" overflow="hidden">
                {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

                <Box p="6">
                    <Box mb={2} display="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                            Live
                        </Badge>
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {"Today's Data"}
                        </Box>
                    </Box>
                    <hr></hr>
                    <Stack
                        direction={["column", "row"]}
                        mt={2}
                        w="80%"
                        mx="auto"
                    >
                        <Spacer />
                        <VStack p={4}>
                            <Spinner />
                        </VStack>
                        <Spacer />
                    </Stack>
                </Box>
            </Box>
        );
    }

    return (
        <Box w="55%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

            <Box p="6">
                <Box mb={2} display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        Live
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {"Today's Data"}
                    </Box>
                </Box>
                <hr></hr>
                <Stack direction={["column", "row"]} mt={2} w="80%" mx="auto">
                    <VStack borderWidth="1px" borderRadius="lg" p={5}>
                        <Box fontWeight="semibold" as="h4" lineHeight="tight">
                            Total Count
                        </Box>
                        <Badge
                            variant="outline"
                            borderRadius="full"
                            px="2"
                            colorScheme="teal"
                        >
                            {stats?.["length"]}
                        </Badge>
                    </VStack>
                    <Spacer />
                    <VStack borderWidth="1px" borderRadius="lg" p={4}>
                        {renderX()}
                    </VStack>
                    <Spacer />
                    <VStack borderWidth="1px" borderRadius="lg" p={5}>
                        <Box fontWeight="semibold" as="h4" lineHeight="tight">
                            {"Today's Names"}
                        </Box>

                        <ModalNames stats={stats} />
                    </VStack>
                </Stack>
            </Box>
        </Box>
    );
}
