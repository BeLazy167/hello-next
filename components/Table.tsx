import { useMemo } from "react";
import { useTable } from "react-table";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
export default function TableX({ userData }) {
    const columnsNonMemo = Object.keys(userData[0]).map((key) => {
        return {
            Header: key,
            accessor: key,
        };
    });
    const columns = useMemo(() => columnsNonMemo, []);
    const data = useMemo(() => userData, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
    return (
        <Table {...getTableBodyProps()}>
            <Thead>
                {headerGroups.map((headerGroup, idx) => (
                    <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, idx) => (
                            <Th key={idx} {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row, idx) => {
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
    );
}
