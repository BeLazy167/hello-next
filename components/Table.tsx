import { useMemo } from "react";
import { useTable } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
export default function TableX({ userData }) {
    if (userData) {
        const columnsNonMemo = Object.keys(userData[0]).map((key) => {
            return {
                Header: key,
                accessor: key,
            };
        });
        const columns = useMemo(() => columnsNonMemo, []);
        const data = useMemo(() => userData, []);
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({ columns, data });
        return (
            <Table {...getTableBodyProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
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
        );
    }
}
