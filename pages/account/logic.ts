export function sorter(toSort: any) {
    if (toSort != null) {
        const Sorted = Object.entries(toSort)
            .sort(([, a]: any, [, b]: any) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        return Sorted;
    } else {
        return null;
    }
}

export async function filterData(allData: any, email: string) {
    const filteredData = allData
        ?.filter((d) => d.email === email)
        ?.map((d) => {
            const { name, __v, updatedAt, email, googleId, _id, ...rest } = d;
            return rest;
        });
    console.log("inlogic", filteredData);
    return filteredData;
}
