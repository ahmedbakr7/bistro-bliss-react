import { createContext } from "react";
import type { TableHeader } from "./Table";

export interface TableContextValue<
    T extends Record<string, unknown> = Record<string, unknown>
> {
    index?: boolean;
    tableHeaders?: TableHeader<T>[];
}

export const TableContext = createContext<TableContextValue | null>(null);
