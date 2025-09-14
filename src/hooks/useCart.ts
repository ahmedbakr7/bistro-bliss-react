import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchCart,
    addCartItem,
    removeCartItem,
    type CartItem,
} from "../services/cartApi";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import { useEffect, useMemo } from "react";

const CART_QUERY_KEY = ["cart"] as const;

export function useCart() {
    const queryClient = useQueryClient();
    const { authState } = useAuthContext();
    const enabled = !!authState.user && !!authState.token;
    const userId =
        (authState.user as unknown as { id?: string; _id?: string })?.id ||
        (authState.user as unknown as { id?: string; _id?: string })?._id;

    const key = useMemo(() => [...CART_QUERY_KEY, userId] as const, [userId]);

    const cartQuery = useQuery({
        queryKey: key,
        queryFn: () => fetchCart(userId as string),
        enabled: enabled && !!userId,
        staleTime: Infinity,
        initialData: [] as CartItem[],
    });

    // Ensure empty array when unauthenticated
    useEffect(() => {
        if (!enabled || !userId) {
            queryClient.setQueryData<CartItem[]>(key, []);
        }
    }, [enabled, userId, key, queryClient]);

    const addMutation = useMutation({
        mutationFn: ({
            productId,
            quantity = 1,
        }: {
            productId: number | string;
            quantity?: number;
        }) => addCartItem(userId as string, productId, quantity),
        onMutate: async (data) => {
            if (!enabled || !userId) return { previous: [] as CartItem[] };
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData<CartItem[]>(key);

            queryClient.setQueryData<CartItem[]>(key, (old) => {
                const list = old ? [...old] : [];
                const idx = list.findIndex(
                    (i) => i.productId === data.productId
                );
                if (idx >= 0) {
                    const nextQty = list[idx].quantity + (data.quantity ?? 1);
                    list[idx] = { ...list[idx], quantity: nextQty };
                } else {
                    list.push({
                        productId: data.productId,
                        quantity: data.quantity ?? 1,
                    });
                }
                return list;
            });

            return { previous } as { previous?: CartItem[] };
        },
        onError: (_err, _data, context) => {
            if (context?.previous) {
                queryClient.setQueryData(key, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        },
    });

    const removeMutation = useMutation({
        mutationFn: (productId: number | string) =>
            removeCartItem(userId as string, productId),
        onMutate: async (productId) => {
            if (!enabled || !userId) return { previous: [] as CartItem[] };
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData<CartItem[]>(key);

            queryClient.setQueryData<CartItem[]>(key, (old) => {
                const list = old ? [...old] : [];
                return list.filter((i) => i.productId !== productId);
            });

            return { previous } as { previous?: CartItem[] };
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(key, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        },
    });

    return {
        ...cartQuery, // data, isLoading, etc.
        addToCart: (productId: number | string, quantity = 1) =>
            enabled && userId
                ? addMutation.mutate({ productId, quantity })
                : undefined,
        removeFromCart: (productId: number | string) =>
            enabled && userId ? removeMutation.mutate(productId) : undefined,
    };
}
