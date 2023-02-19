import {
    Center,
    Heading,
    HStack,
    VStack,
    Text as Txt,
    Button,
} from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DownloadCsv from "../../components/DownloadCsv";

import TableX from "../../components/Table";
export default function Custom() {
    const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState(
        new Date().setHours(23, 59, 59, 999)
    );
    const [userData, setUserData] = useState<any>();
    const [userDataLoading, setUserDataLoading] = useState(false);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const getData = () => {
        getUserData();
    };
    // fecth post request
    const getUserData = async () => {
        let bodyToSend = {
            before: new Date(startDate).toDateString(),
            after: new Date(endDate).toDateString(),
        };
        setUserDataLoading(true);

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
        const data = await res.json();
        setUserData(data);
        setUserDataLoading(false);
    };
    let startDateObj = new Date(startDate);
    let startDateChanged = `${startDateObj.getDate()}-${String(startDateObj.getMonth() + 1)}-${String(startDateObj.getFullYear() - 1)}`;
    let endDateObj = new Date(endDate);
    let endDateChanged = `${endDateObj.getDate()}-${String(endDateObj.getMonth() + 1)}-${String(endDateObj.getFullYear() - 1)}`;

    const final = useMemo(() => <TableX userData={userData} />, [userData]);

    return (
        <Center mt={10} px={20}>
            <VStack>
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
                        <Button disabled={userDataLoading} onClick={getData}>
                            Get Data
                        </Button>

                        <DownloadCsv
                            userData={userData}
                            disabled={userDataLoading}
                            // set file name based on start and end date 19/02/2023-20/02/2023
                            fileName={`${startDateChanged}_${endDateChanged}`}
                        />
                    </VStack>
                </HStack>

                {userData && final}
            </VStack>
        </Center>
    );
}
