import type { ReactNode } from "react";
import { TableContext } from "./TableContext";
import TableRow from "./TableRow";

type HeadColorTheme = "light" | "dark";

type StripedDirection = "row" | "col";

export interface TableHeader<
    T extends Record<string, unknown> = Record<string, unknown>
> {
    name: string;
    key: keyof T & string;
    className?: string;
}

interface TableProps<
    T extends Record<string, unknown> = Record<string, unknown>
> {
    tableHeaders: TableHeader<T>[];
    caption?: string;
    headColorTheme?: HeadColorTheme;
    isStriped?: boolean;
    data: T[];
    stripedDir?: StripedDirection;
    hoverable?: boolean;
    emptyElement?: ReactNode;
    index?: boolean;
    children?: ReactNode;
}

export default function Table<
    T extends Record<string, unknown> = Record<string, unknown>
>({
    caption,
    headColorTheme,
    isStriped = false,
    stripedDir = "row",
    hoverable = false,
    data,
    children,
    tableHeaders = [],
    emptyElement = null,
    index = false,
}: TableProps<T>): ReactNode {
    const tableClassNames = [
        "table",
        headColorTheme ? `table-${headColorTheme}` : "",
        caption ? "caption-top" : "",
        isStriped
            ? stripedDir === "col"
                ? "table-striped-columns"
                : "table-striped"
            : "",
        hoverable ? "table-hover" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const hasData = data && data.length > 0;

    return (
        <TableContext.Provider
            value={{
                index,
                tableHeaders: tableHeaders as TableHeader<
                    Record<string, unknown>
                >[],
            }}
        >
            <div className="table-responsive">
                <table className={tableClassNames}>
                    {caption && <caption>{caption}</caption>}
                    <thead>
                        <tr>
                            {index && <th scope="col">#</th>}
                            {tableHeaders.map((h) => (
                                <th
                                    key={h.key}
                                    scope="col"
                                    className={h.className}
                                >
                                    {h.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hasData
                            ? data.map((row, index) => (
                                  <TableRow row={row} rowIndex={index} />
                              ))
                            : children ?? emptyElement}
                    </tbody>
                </table>
            </div>
        </TableContext.Provider>
    );
}
