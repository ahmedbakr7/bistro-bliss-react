import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import {
    fetchOrderDetails,
    fetchUserOrders,
    type Order,
    type OrderDetail,
    type OrdersPayload,
} from "../services/ordersApi";

const ORDERS_QUERY_KEY = ["orders"] as const;

export function useUserOrders() {
    const { authState } = useAuthContext();
    const userId =
        (authState.user as unknown as { id?: string; _id?: string })?.id ||
        (authState.user as unknown as { id?: string; _id?: string })?._id;

    const enabled = !!authState.user && !!authState.token && !!userId;

    return useQuery<OrdersPayload>({
        queryKey: [...ORDERS_QUERY_KEY, userId],
        queryFn: () => fetchUserOrders(userId as string),
        enabled,
        staleTime: 1000 * 30,
    });
}

export function useOrderDetails(orderId?: string) {
    return useQuery<OrderDetail[]>({
        queryKey: ["order-details", orderId],
        queryFn: () => fetchOrderDetails(orderId as string),
        enabled: !!orderId,
        initialData: [] as OrderDetail[],
        staleTime: 1000 * 30,
    });
}
