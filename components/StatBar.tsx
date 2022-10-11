import { Badge, Box, HStack, Spacer, VStack } from "@chakra-ui/react";

export default function StatBar() {
    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4,
    };
    const dx = [
        {
            snack: "chips",
            count: 10,
        },
        {
            snack: "chips",
            count: 10,
        },
    ];
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
                            300
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
