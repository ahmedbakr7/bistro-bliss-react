import type { GenericAbortSignal } from "axios";
import api from "../../services/api";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";

export interface Booking {
    numberOfPeople: number;
    bookedAt: Date;
    status: string; // BookingStatus
    createdAt: Date;
    updatedAt: Date;
    [key: string]: unknown;
}

async function fetchBookings(signal: GenericAbortSignal): Promise<Booking[]> {
    const { data } = await api.get<Booking[]>("/bookings", { signal });
    return data;
}

export default function Bookingsx(): ReactElement {
    const { data, isPending, isError, error } = useQuery<Booking[]>({
        queryKey: ["bookings"],
        queryFn: ({ signal }) => fetchBookings(signal),
        staleTime: 5000,
    });

    const bookingHeaders: TableHeader<Booking>[] = [
        { name: "User", key: "userId" },
        { name: "People", key: "numberOfPeople" },
        { name: "Booked At", key: "bookedAt" },
        { name: "Status", key: "status" },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
    ];

    if (isPending)
        return <span className="align-self-center m-auto">loading...</span>;

    if (isError)
        return (
            <div className="alert alert-danger" role="alert">
                Failed to load bookings:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );

    return (
        <Table<Booking>
            data={data}
            tableHeaders={bookingHeaders}
            caption="Table of Bookings"
            emptyElement={
                <tr>
                    <td
                        colSpan={bookingHeaders.length + 1}
                        className="text-center"
                    >
                        No bookings found
                    </td>
                </tr>
            }
            index
        />
    );
}
