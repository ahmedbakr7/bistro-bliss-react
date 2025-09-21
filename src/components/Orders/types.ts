import type { Order, OrderDetail } from "../../services/ordersApi";

export type DetailRow = OrderDetail & {
    product?: {
        name?: string | null;
        imageUrl?: string | null;
        price?: number | null;
        [k: string]: unknown;
    };
    image?: string;
};

export type OrderGroup = { order: Order; details: DetailRow[] };
