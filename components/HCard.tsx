import { Box, Center, Flex, Grid, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from "@chakra-ui/react";
import DownloadCsv from "./DownloadCsv";

export default function HCard({ userData, disabled, userName }) {
    //find fav snack and count using map
    let favSnack = userData.reduce((acc, curr) => {
        if (acc[curr.snack]) {
            acc[curr.snack] += 1;
        } else {
            acc[curr.snack] = 1;
        }
        return acc;
    }, {});

    const sortedUserData = Object.entries(favSnack)
        .sort(([, a]: any, [, b]: any) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    let favSnackCount = Object.values(sortedUserData)[0] as any;
    let favSnackName = Object.keys(sortedUserData)[0];
    return (
        <Stack direction={['column', 'row']} w={"100%"} alignItems={"center"} justify={"space-between"}>
            <SimpleGrid columns={[1, 3]} spacing={5} fontWeight="semibold" letterSpacing="wide" minW={"20%"} alignItems={"center"}>
                <Stat shadow="md" borderWidth="1px" p={5}>
                    <StatLabel>Favrouite Snack</StatLabel>
                    <StatNumber>{favSnackCount}</StatNumber>
                    <StatHelpText>{favSnackName}</StatHelpText>
                </Stat>
                <Stat shadow="md" borderWidth="1px" p={5}>
                    <StatLabel>Total Distinct Snacks</StatLabel>
                    <StatNumber>
                        {Object.keys(sortedUserData).length}
                    </StatNumber>
                    <StatHelpText>
                        {Object.keys(sortedUserData).join(", ").slice(0, 50) +
                            "..."}
                    </StatHelpText>
                </Stat>
                <Stat shadow="md" borderWidth="1px" p={5}>
                    <StatLabel>Total Count</StatLabel>
                    <StatNumber>{userData.length}</StatNumber>
                </Stat>
            </SimpleGrid>
            <DownloadCsv
                disabled={disabled}
                userData={userData}
                fileName={userName}
            />
        </Stack>
    );
}
