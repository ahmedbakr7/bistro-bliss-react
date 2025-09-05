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
        <tr key={(row.id as string) ?? rowIndex}>
            {indexColumn && <th scope="row">{rowIndex + 1}</th>}
            {tableHeaders?.map((col, index) => {
                const value = col.key ? (row[col.key as keyof T] as unknown) : undefined;
                const content = col.render
                    ? col.render(row as T, value, rowIndex)
                    : (value as ReactNode);
                return (
                    <td key={col.key ?? index} className={col.className}>
                        {content}
                    </td>
                );
            })}
        </tr>
    );
}
