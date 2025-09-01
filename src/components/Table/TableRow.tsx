import type { ReactNode } from "react";
import { useTableContext } from "./useTableContext";

export interface TableRowProps<T extends Record<string, unknown>> {
    row: T;
    rowIndex: number;
}

export default function TableRow<T extends Record<string, unknown>>({
    row,
    rowIndex,
}: TableRowProps<T>): ReactNode {
    const { index: indexColumn, tableHeaders } = useTableContext();

    return (
        <tr key={row.id as string}>
            {indexColumn && <th scope="row">{rowIndex + 1}</th>}
            {tableHeaders?.map((col, index) => {
                const value = row[col.key as keyof T];
                return (
                    <td key={index} className={col.className}>
                        {value as string}
                    </td>
                );
            })}
        </tr>
    );
}
