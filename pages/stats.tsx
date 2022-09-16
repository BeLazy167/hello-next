import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Spinner,
} from "@chakra-ui/react";
import CountUp from "react-countup";

import client from "./react-query-client";
interface StatsCardProps {
    title: string;
    stat: number;
    isLoading: boolean;
    secondTitle: string;
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, isLoading, secondTitle } = props;
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            rounded={"lg"}
        >
            <StatLabel fontWeight={"medium"}>{title}</StatLabel>

            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                {isLoading ? <Spinner /> : <CountUp end={stat} />}
            </StatNumber>
            <StatLabel fontWeight={"medium"}>{secondTitle}</StatLabel>
        </Stat>
    );
}

export default function BasicStatistics({ isLoading }) {
    const allData: any = client.getQueryData(["allData"]);
    const sorter = (toSort: any) => {
        const Sorted = Object.entries(toSort)
            .sort(([, a]: any, [, b]: any) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        return Sorted;
    };
    const getAllUniqueName = () => {
        const nameDataAll = {};
        allData?.map((ele: any) => {
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
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={{ base: 5, lg: 8 }}
            >
                <StatsCard
                    title={"We served"}
                    isLoading={isLoading}
                    stat={allData?.length}
                    secondTitle={"times"}
                />
                <StatsCard
                    isLoading={isLoading}
                    title={"To"}
                    stat={uniqueUsers}
                    secondTitle={"distinct users"}
                />
                <StatsCard
                    isLoading={isLoading}
                    title={"With over"}
                    stat={uniqueSnack}
                    secondTitle={"unique snacks"}
                />
            </SimpleGrid>
        </Box>
    );
}
