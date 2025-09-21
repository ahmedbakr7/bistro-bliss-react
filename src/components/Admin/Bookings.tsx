import type { ReactElement } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";
import { useMemo, useRef, useCallback } from "react";
import QueryBuilder from "../QueryBuilder/QueryBuilder";
import type { QueryField } from "../QueryBuilder/types";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import {
    fetchBookings,
    updateBookingStatus,
    type Booking,
    type BookingPayload,
    type BookingQuery,
    type BookingStatus,
} from "../../services/bookingsApi";

export default function Bookingsx(): ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryRef = useRef<BookingQuery>({});

    const derivedParams: BookingQuery = useMemo(() => {
        const obj: Partial<BookingQuery> = {};
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
                    obj.status = value as BookingStatus;
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
        return obj as BookingQuery;
    }, [searchParams]);

    queryRef.current = { ...queryRef.current, ...derivedParams };

    const {
        data: payload,
        isPending,
        isError,
        error,
    } = useQuery<BookingPayload>({
        queryKey: ["bookings", searchParams.toString()],
        queryFn: ({ signal }) => fetchBookings(signal, searchParams),
        staleTime: 5000,
    });

    const queryClient = useQueryClient();

    const updateStatus = useMutation({
        mutationFn: async ({
            id,
            status,
        }: {
            id: string;
            status: BookingStatus;
        }) => updateBookingStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
    });

    const statusActionButtons = (row: Booking) => {
        // Only allow transitions for PENDING or CONFIRMED relative to admin actions
        const buttons: ReactElement[] = [];
        const loading = updateStatus.isPending;

        const pushBtn = (
            label: string,
            next: BookingStatus,
            variant: "primary" | "secondary"
        ) => {
            buttons.push(
                <button
                    key={next}
                    type="button"
                    className={`btn btn-sm theme-btn-${variant}`}
                    disabled={loading}
                    onClick={() =>
                        updateStatus.mutate({ id: row.id, status: next })
                    }
                >
                    {loading ? "Updating..." : label}
                </button>
            );
        };

        if (row.status === "PENDING") {
            pushBtn("Confirm", "CONFIRMED", "primary");
            pushBtn("Cancel", "CANCELLED_BY_RESTAURANT", "secondary");
        } else if (row.status === "CONFIRMED") {
            pushBtn("Complete", "COMPLETED", "primary");
            pushBtn("Cancel", "CANCELLED_BY_RESTAURANT", "secondary");
        }
        return <div className="d-flex flex-column gap-1">{buttons}</div>;
    };

    const statusBadge = (status: BookingStatus) => {
        const map: Record<BookingStatus, { label: string; className: string }> =
            {
                PENDING: {
                    label: "Pending",
                    className: "badge bg-warning-subtle text-warning-emphasis",
                },
                CONFIRMED: {
                    label: "Confirmed",
                    className: "badge bg-success-subtle text-success-emphasis",
                },
                CANCELLED_BY_CUSTOMER: {
                    label: "Cancelled (Customer)",
                    className: "badge bg-secondary",
                },
                CANCELLED_BY_RESTAURANT: {
                    label: "Cancelled (Restaurant)",
                    className: "badge bg-danger-subtle text-danger-emphasis",
                },
                NO_SHOW: {
                    label: "No Show",
                    className: "badge bg-dark-subtle text-dark-emphasis",
                },
                SEATED: {
                    label: "Seated",
                    className: "badge bg-info-subtle text-info-emphasis",
                },
                COMPLETED: {
                    label: "Completed",
                    className: "badge bg-primary-subtle text-primary-emphasis",
                },
            };
        const meta = map[status];
        return <span className={meta.className}>{meta.label}</span>;
    };

    const bookingHeaders: TableHeader<Booking>[] = [
        { name: "User", key: "userId" },
        { name: "People", key: "numberOfPeople" },
        { name: "Booked At", key: "bookedAt" },
        {
            name: "Status",
            key: "status",
            render: (row) => statusBadge(row.status as BookingStatus),
        },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
        {
            name: "Actions",
            key: "id",
            render: (row) => statusActionButtons(row),
        },
    ];

    const fields: QueryField[] = useMemo(
        () => [
            {
                name: "status",
                label: "Status",
                type: "enum",
                options: [
                    { label: "Any", value: "" },
                    { label: "Pending", value: "PENDING" },
                    { label: "Confirmed", value: "CONFIRMED" },
                    { label: "Completed", value: "COMPLETED" },
                    {
                        label: "Cancelled (Cust)",
                        value: "CANCELLED_BY_CUSTOMER",
                    },
                    {
                        label: "Cancelled (Rest)",
                        value: "CANCELLED_BY_RESTAURANT",
                    },
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

    const bookings = (payload as BookingPayload | undefined)?.data ?? [];

    return (
        <div className="d-flex flex-row w-100 h-100">
            <QueryBuilder
                fields={fields}
                onSubmit={applyFilters}
                initialValues={queryRef.current}
                width={260}
                title="Booking Filters"
            />
            <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3">
                {isPending ? (
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <span className="text-muted">loading...</span>
                    </div>
                ) : isError ? (
                    <div className="alert alert-danger" role="alert">
                        Failed to load bookings:{" "}
                        {error instanceof Error
                            ? error.message
                            : "Unknown error"}
                    </div>
                ) : (
                    <>
                        <Table<Booking>
                            data={bookings}
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
                        {payload && payload.pagination.totalPage > 1 && (
                            <Pagination
                                count={payload.pagination.totalPage}
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
