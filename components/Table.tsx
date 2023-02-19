import { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Button,
    Divider,
    Input,
    Text as Txt,
    Select,
    TableContainer,
} from "@chakra-ui/react";
export default function TableX({ userData }) {
    const { createdAt, ...final } = userData[0];
    const columnsNonMemo = Object.keys(final).map((key) => {
        if (key === "createdAt" || key === "updatedAt")
            return {
                Header: key,
                accessor: key,

                Cell: ({ value }) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                },
            };
        return {
            Header: key,
            accessor: key,
        };
    });
    const columns = useMemo(() => columnsNonMemo, [userData]);
    const data = useMemo(() => userData, [userData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination
    );
    return (
        <TableContainer width={"100%"}>
            <Table {...getTableBodyProps()}>
                <Thead>
                    {headerGroups.map((headerGroup, idx) => (
                        <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, idx) => (
                                <Th
                                    key={idx}
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, idx) => {
                        prepareRow(row);
                        return (
                            <Tr key={idx} {...row.getRowProps()}>
                                {row.cells.map((cell, idx) => {
                                    return (
                                        <Td key={idx} {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
                <Tfoot></Tfoot>
            </Table>

            <Table variant="striped">
                <Tbody>
                    <Tr>
                        <Td>
                            <Button
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                {"<<"}
                            </Button>{" "}
                        </Td>
                        <Td>
                            <Button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                {"<"}
                            </Button>{" "}
                        </Td>
                        <Td>
                            <Button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                {">"}
                            </Button>{" "}
                        </Td>
                        <Td>
                            <Button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                {">>"}
                            </Button>{" "}
                        </Td>
                        <Td>
                            <Txt as="b">
                                Page {pageIndex + 1} of {pageOptions.length}
                            </Txt>
                        </Td>
                        <Td>
                            <Txt>
                                Go to page:{" "}
                                <Input
                                    placeholder="Page"
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(page);
                                    }}
                                    style={{ width: "100px" }}
                                />
                            </Txt>{" "}
                        </Td>
                        <Td>
                            <Select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </Select>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}
