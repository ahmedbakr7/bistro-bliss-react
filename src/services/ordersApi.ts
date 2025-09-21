import type { Product } from "../pages/MenuPage";
import api from "./api";

export interface OrdersPayload {
    data: Order[];
    pagination: {
        count: number;
        limit: number;
        page: number;
        pages: number;
    };
}

export type OrderStatus =
    | "CANCELED"
    | "FAVOURITES"
    | "DRAFT"
    | "CREATED"
    | "PREPARING"
    | "READY"
    | "DELIVERING"
    | "RECEIVED";

export interface Order {
    id: string;
    status?: OrderStatus | null;
    userId: string | null;
    totalPrice?: number | null;
    acceptedAt?: string | null;
    deliveredAt?: string | null;
    receivedAt?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date;
    // When joined from backend, orders may include details
    orderDetails?: OrderDetail[];
    [key: string]: unknown;
}

export interface OrderDetail {
    id: string;
    orderId: string;
    product: Product;
    quantity: number;
    price_snapshot?: number | null;
    name_snapshot?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date;
    [key: string]: unknown;
}

export async function fetchUserOrders(userId: string): Promise<OrdersPayload> {
    const { data } = await api.get<OrdersPayload>(`/users/${userId}/orders`);
    return data ?? [];
}

export async function fetchOrderDetails(
    orderId: string
): Promise<OrderDetail[]> {
    // Common REST shapes: /orders/:id/details or /orders/:id/order-details
    // Try the first; backend can alias accordingly.
    const { data } = await api.get<OrderDetail[]>(`/orders/${orderId}/details`);
    return data ?? [];
}
