import api from "./api";

export type BookingStatus =
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED_BY_CUSTOMER"
    | "CANCELLED_BY_RESTAURANT"
    | "NO_SHOW"
    | "SEATED"
    | "COMPLETED";

export interface Booking {
    id: string;
    userId?: string;
    numberOfPeople: number;
    bookedAt: Date | string;
    status: BookingStatus;
    createdAt: Date | string;
    updatedAt: Date | string;
    [key: string]: unknown;
}

export interface BookingPayload {
    data: Booking[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
}

export interface BookingQuery {
    page?: number;
    totalPages?: number;
    limit?: number;
    status?: BookingStatus | "";
    userId?: string;
    createdAfter?: string;
    createdBefore?: string;
    [key: string]: unknown;
}

// Fetch bookings list with optional AbortSignal from react-query
export async function fetchBookings(
    signal: AbortSignal | undefined,
    searchParams: URLSearchParams
): Promise<BookingPayload> {
    const qs = searchParams.toString();
    const url = "/bookings" + (qs ? `?${qs}` : "");
    const { data } = await api.get<BookingPayload>(url, { signal });
    return data;
}

// Update a booking's status
export async function updateBookingStatus(
    id: string,
    status: BookingStatus
): Promise<Booking> {
    const { data } = await api.patch<Booking>(`/bookings/${id}`, { status });
    return data;
}
