import type { ReactElement } from "react";
import { useMemo, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import QueryBuilder from "../QueryBuilder/QueryBuilder";
import type { QueryField } from "../QueryBuilder/types";
import Pagination from "../Pagination";
import OrderGroupRow from "../Orders/OrderGroupRow";
import type { DetailRow } from "../Orders/types";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";
import {
    fetchOrders,
    type OrdersPayload,
    type OrdersQuery,
    type Order,
    type OrderStatus,
} from "../../services/ordersApi";

export default function Orders(): ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryRef = useRef<OrdersQuery>({});

    const derivedParams: OrdersQuery = useMemo(() => {
        const obj: Partial<OrdersQuery> = {};
        searchParams.forEach((value, key) => {
            if (value === "") return;
            switch (key) {
                case "page":
                    obj.page = Number(value);
                    break;
                case "limit":
                    obj.limit = Number(value);
                    break;
                case "status":
                    obj.status = value as OrderStatus;
                    break;
                case "userId":
                    obj.userId = value;
                    break;
                case "createdAfter":
                    obj.createdAfter = value;
                    break;
                case "createdBefore":
                    obj.createdBefore = value;
                    break;
                default:
                    break;
            }
        });
        return obj as OrdersQuery;
    }, [searchParams]);

    queryRef.current = { ...queryRef.current, ...derivedParams };

    const {
        data: payload,
        isPending,
        isError,
        error,
    } = useQuery<OrdersPayload>({
        queryKey: ["orders", searchParams.toString()],
        queryFn: ({ signal }) => fetchOrders(signal, searchParams),
        staleTime: 5000,
    });

    const fields: QueryField[] = useMemo(
        () => [
            {
                name: "status",
                label: "Status",
                type: "enum",
                options: [
                    { label: "Any", value: "" },
                    { label: "Draft", value: "DRAFT" },
                    { label: "Created", value: "CREATED" },
                    { label: "Preparing", value: "PREPARING" },
                    { label: "Ready", value: "READY" },
                    { label: "Delivering", value: "DELIVERING" },
                    { label: "Received", value: "RECEIVED" },
                    { label: "Canceled", value: "CANCELED" },
                    { label: "Favourites", value: "FAVOURITES" },
                ],
            },
            {
                name: "userId",
                label: "User Id",
                type: "string",
                placeholder: "User id",
            },
            { name: "createdAfter", label: "Created After", type: "date" },
            { name: "createdBefore", label: "Created Before", type: "date" },
        ],
        []
    );

    const applyFilters = useCallback(
        (vals: Record<string, unknown>) => {
            const cleaned: Record<string, string> = {};
            Object.entries(vals).forEach(([k, v]) => {
                if (v === "" || v === undefined || v === null) return;
                cleaned[k] = String(v);
            });
            delete cleaned.page; // reset page when filters change
            setSearchParams(cleaned);
        },
        [setSearchParams]
    );

    // Shape into groups like ProfilePage rendering
    type OrderGroup = { order: Order; details: DetailRow[] };
    const groupedData: OrderGroup[] = useMemo(() => {
        const orders = (payload as OrdersPayload | undefined)?.data ?? [];
        return orders.map((o) => ({
            order: o,
            details: (o.orderDetails ?? []) as DetailRow[],
        }));
    }, [payload]);

    const groupHeaders: TableHeader<OrderGroup>[] = useMemo(
        () => [
            {
                name: "Orders",
                render: (row, _value, rowIndex) => (
                    <OrderGroupRow group={row} rowIndex={rowIndex} />
                ),
            },
        ],
        []
    );

    return (
        <div className="d-flex flex-row w-100 h-100">
            <QueryBuilder
                fields={fields}
                onSubmit={applyFilters}
                initialValues={queryRef.current}
                width={260}
                title="Order Filters"
            />
            <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3">
                {isPending ? (
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <span className="text-muted">loading...</span>
                    </div>
                ) : isError ? (
                    <div className="alert alert-danger" role="alert">
                        Failed to load orders:{" "}
                        {error instanceof Error
                            ? error.message
                            : "Unknown error"}
                    </div>
                ) : (
                    <>
                        <Table<OrderGroup>
                            data={groupedData}
                            tableHeaders={groupHeaders}
                            emptyElement={
                                <tr>
                                    <td
                                        colSpan={groupHeaders.length + 1}
                                        className="text-center"
                                    >
                                        No orders found
                                    </td>
                                </tr>
                            }
                        />
                        {payload && payload.pagination.pages > 1 && (
                            <Pagination
                                count={payload.pagination.pages}
                                index={payload.pagination.page}
                                handleChange={(pageNumber: number) => {
                                    const next = new URLSearchParams(
                                        searchParams.toString()
                                    );
                                    if (pageNumber <= 1) {
                                        next.delete("page");
                                    } else {
                                        next.set("page", String(pageNumber));
                                    }
                                    queryRef.current.page = pageNumber;
                                    setSearchParams(next);
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
