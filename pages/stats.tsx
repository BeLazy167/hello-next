import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    Highlight,
    StatLabel,
    StatNumber,
    Spinner,
    useColorModeValue,
} from "@chakra-ui/react";

import client from "./react-query-client";
interface StatsCardProps {
    title: string;
    stat: string;
}
function StatsCard(props: any) {
    const { title, stat, isLoading } = props;
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
        >
            <StatLabel fontWeight={"medium"}>{title}</StatLabel>

            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                {isLoading ? <Spinner /> : stat}
            </StatNumber>
        </Stat>
    );
}

export default function BasicStatistics({ isLoading }) {
    const allData: any = client.getQueryData(["allData"]);
    const sorter = (toSort) => {
        const Sorted = Object.entries(toSort)
            .sort(([, a]: any, [, b]: any) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        return Sorted;
    };
    const getAllUniqueName = () => {
        const nameDataAll = {};
        allData?.map((ele) => {
            if (nameDataAll[ele.name]) {
                nameDataAll[ele.name] += 1;
            } else {
                nameDataAll[ele.name] = 1;
            }
        });
        return sorter(nameDataAll);
    };
    const getAllUniqueSnack = () => {
        const snackDataAll = {};
        allData?.map((ele: any) => {
            if (snackDataAll[ele.snack] === undefined) {
                snackDataAll[ele.snack] = 1;
            } else {
                snackDataAll[ele.snack] = snackDataAll[ele.snack] + 1;
            }
        });
        return sorter(snackDataAll);
    };
    const uniqueSnacksData = getAllUniqueSnack();
    const uniqueNameData = getAllUniqueName();
    const uniqueUsers = Object.keys(uniqueNameData).length;
    const uniqueSnack = Object.keys(uniqueSnacksData).length;
    return (
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
                textAlign={"center"}
                fontSize={"4xl"}
                py={10}
                fontWeight={"bold"}
            >
                What is this app doing?
            </chakra.h1>
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={{ base: 5, lg: 8 }}
            >
                <StatsCard
                    title={"We served"}
                    isLoading={isLoading}
                    stat={`${allData?.length || 0} times`}
                />
                <StatsCard
                    isLoading={isLoading}
                    title={"To"}
                    stat={`${uniqueUsers} distinct users`}
                />
                <StatsCard
                    isLoading={isLoading}
                    title={"With over"}
                    stat={`  ${uniqueSnack} unique snacks`}
                />
            </SimpleGrid>
        </Box>
    );
}
