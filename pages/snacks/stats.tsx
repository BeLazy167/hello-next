import { useQuery } from "@tanstack/react-query";

async function todayData() {
    const res = await fetch("/api/todayData");
    if (!res.ok) {
        throw new Error("Failed to get data");
    }

    return await res.json();
}
export default function Page1() {
    const { data: todayDataRes } = useQuery(["todayData"], todayData);
}
