import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function DateRangePicker() {
    const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState(new Date().setHours(0, 0, 0, 0));
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    // console.log({
    //     before: new Date(startDate),
    //     after: new Date(endDate),
    // });
    return (
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
    );
}
