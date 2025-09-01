import { useContext } from "react";
import { TableContext } from "./TableContext";

export function useTableContext() {
    const ctx = useContext(TableContext);

    if (ctx === null) {
        throw new Error(
            "useTableContext must be used within a <TableRowIndexProvider>."
        );
    }

    return ctx;
}
