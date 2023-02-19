import {
    Center,
    Heading,
    HStack,
    VStack,
    Text as Txt,
    Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DownloadCsv from "../../components/DownloadCsv";
export default function Custom() {
    const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState(
        new Date().setHours(23, 59, 59, 999)
    );

    useEffect(() => {
        refetch();
    }, [endDate && startDate]);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    // fecth post request
    const getUserData = async () => {
        let bodyToSend = {
            before: new Date(startDate).toDateString(),
            after: new Date(endDate).toDateString(),
        };

        const res = await fetch("/api/customDateData", {
            method: "POST",
            body: JSON.stringify(bodyToSend),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get data");
        }
        return await res.json();
    };
    const {
        data: userData,
        isLoading: userDataLoading,
        refetch,
        isFetching,
    } = useQuery(["customDateData"], getUserData);

    return (
        <Center>
            <HStack boxShadow={"lg"} px={3}>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    showYearDropdown
                    showMonthDropdown
                    inline
                />
                <h1>{isFetching ? "Fetching" : "No"}</h1>
                {/* show start and end date */}
                <VStack>
                    <Heading>Download CSV</Heading>
                    <VStack>
                        <Txt>Start Date</Txt>
                        <Txt>{new Date(startDate).toDateString()}</Txt>
                    </VStack>
                    <VStack>
                        <Txt>End Date</Txt>
                        <Txt>{new Date(endDate).toDateString()}</Txt>
                    </VStack>
                    <DownloadCsv userData={userData} disabled={isFetching} />
                </VStack>
            </HStack>
        </Center>
    );
}
