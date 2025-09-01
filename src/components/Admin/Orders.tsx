import type { GenericAbortSignal } from "axios";
import api from "../../services/api";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";

export interface Order {
    id: string;
    status?: string | null;
    userId: string | null;
    totalPrice?: number | null;
    acceptedAt?: string | null;
    deliveredAt?: string | null;
    receivedAt?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [key: string]: unknown;
}

async function fetchOrders(signal: GenericAbortSignal): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/orders", { signal });
    return data;
}

export default function Orders(): ReactElement {
    const { data, isPending, isError, error } = useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: ({ signal }) => fetchOrders(signal),
        staleTime: 5000,
    });

    const orderHeaders: TableHeader<Order>[] = [
        { name: "Status", key: "status" },
        { name: "User", key: "userId" },
        { name: "Total", key: "totalPrice" },
        { name: "Accepted", key: "acceptedAt" },
        { name: "Delivered", key: "deliveredAt" },
        { name: "Received", key: "receivedAt" },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
    ];

    if (isPending)
        return <span className="align-self-center m-auto">loading...</span>;

    if (isError)
        return (
            <div className="alert alert-danger" role="alert">
                Failed to load orders:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );

    return (
        <Table<Order>
            data={data ?? []}
            tableHeaders={orderHeaders}
            caption="Table of Orders"
            emptyElement={
                <tr>
                    <td
                        colSpan={orderHeaders.length + 1}
                        className="text-center"
                    >
                        No orders found
                    </td>
                </tr>
            }
            index
        />
    );
}
