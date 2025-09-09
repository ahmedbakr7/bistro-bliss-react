import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchCart,
    addCartItem,
    removeCartItem,
    type CartItem,
} from "../services/cartApi";

const CART_QUERY_KEY = ["cart"] as const;

export function useCart() {
    const queryClient = useQueryClient();

    const cartQuery = useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: fetchCart,
        staleTime: Infinity,
    });

    const addMutation = useMutation({
        mutationFn: ({
            productId,
            quantity = 1,
        }: {
            productId: number | string;
            quantity?: number;
        }) => addCartItem(productId, quantity),
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
            const previous =
                queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY);

            queryClient.setQueryData<CartItem[]>(CART_QUERY_KEY, (old) => {
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
                queryClient.setQueryData(CART_QUERY_KEY, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });

    const removeMutation = useMutation({
        mutationFn: (productId: number | string) => removeCartItem(productId),
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
            const previous =
                queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY);

            queryClient.setQueryData<CartItem[]>(CART_QUERY_KEY, (old) => {
                const list = old ? [...old] : [];
                return list.filter((i) => i.productId !== productId);
            });

            return { previous } as { previous?: CartItem[] };
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(CART_QUERY_KEY, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });

    return {
        ...cartQuery, // data, isLoading, etc.
        addToCart: (productId: number | string, quantity = 1) =>
            addMutation.mutate({ productId, quantity }),
        removeFromCart: (productId: number | string) =>
            removeMutation.mutate(productId),
    };
}
