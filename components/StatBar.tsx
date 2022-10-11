import { Badge, Box, HStack, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function StatBar({ stats }) {
    const [data, setData] = useState({});
    const [dx, setDx] = useState([]);
    useEffect(() => {
        let objf = {};
        stats?.map((each) => {
            if (objf[each.snack] === undefined) {
                objf[each.snack] = [each.name];
            } else {
                objf[each.snack].push(each.name);
            }
        });
        console.log("xyz", objf);
        let df = [];
        Object.keys(objf).map((key) => {
            setDx([...df, { snack: key, people: objf[key] }]);
        });
        setData(objf);
        console.log("data", dx);
    }, [stats]);

    const renderX = () => {
        return dx.map((x: any, idx: any) => {
            return (
                <Box key={idx} mt="1" lineHeight="tight">
                    {x.snack}:{" "}
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {x.count}
                    </Badge>
                </Box>
            );
        });
    };
    console.log("in statsbar", stats);
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
                <HStack mt={2} w="80%" mx="auto">
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
                            {stats?.length}
                        </Badge>
                    </VStack>
                    <Spacer />
                    <VStack borderWidth="1px" borderRadius="lg" p={4}>
                        {renderX()}
                    </VStack>
                    <Spacer />
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
                            300
                        </Badge>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
}
