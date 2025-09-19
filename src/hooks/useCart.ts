import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchCartPayload,
    addCartItem,
    removeCartItem,
    updateCartItem,
    type CartProductLine,
    clearRemoteCart,
    checkoutCart,
    type CheckoutPayload,
    type CheckoutResponse,
} from "../services/cartApi";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import { useCallback, useEffect } from "react";

const CART_QUERY_KEY = ["cart"] as const;
const cartKey = (userId: string | null) => [...CART_QUERY_KEY, userId] as const;

type CartQueryKey = ReturnType<typeof cartKey>;

interface MutationCtx {
    previous?: CartState;
}

export interface CartState {
    cartId: string | number;
    items: CartProductLine[];
}

function getCartState(data: unknown): CartState | undefined {
    if (!data || typeof data !== "object") return undefined;
    const obj = data as {
        cartId?: string | number;
        id?: string | number;
        items?: unknown;
    };
    if (!Array.isArray(obj.items)) return undefined;
    const cartId = obj.cartId ?? obj.id;
    if (cartId === undefined) return undefined;
    return { cartId, items: obj.items as CartProductLine[] };
}

export function useCartQuery(userId: string | null, enabled = true) {
    return useQuery({
        queryKey: cartKey(userId),
        queryFn: () => fetchCartPayload(userId as string),
        enabled: enabled && !!userId,
        staleTime: Infinity,
    });
}

export function useCartActions(userId: string | null, enabled = true) {
    const queryClient = useQueryClient();

    const add = useMutation<
        CartProductLine,
        unknown,
        { productId: string; quantity?: number },
        MutationCtx
    >({
        mutationFn: ({ productId, quantity = 1 }) =>
            addCartItem(userId as string, productId, quantity),
        onMutate: async ({ productId, quantity = 1 }) => {
            if (!enabled || !userId)
                return { previous: { cartId: "guest", items: [] } };
            await queryClient.cancelQueries({ queryKey: cartKey(userId) });
            const previous = getCartState(
                queryClient.getQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey
                )
            );

            queryClient.setQueryData<CartState | undefined>(
                cartKey(userId) as CartQueryKey,
                (old) => {
                    const base: CartState =
                        getCartState(old) ||
                        ({
                            cartId: previous?.cartId || "temp",
                            items: [],
                        } as CartState);
                    const items = [...base.items];
                    const idx = items.findIndex(
                        (i) => i.productId === productId
                    );
                    if (idx >= 0 && items[idx]) {
                        items[idx] = {
                            ...items[idx],
                            quantity: (items[idx].quantity ?? 0) + quantity,
                        };
                    } else {
                        items.push({
                            cartDetailId: `temp-${productId}`,
                            productId,
                            quantity,
                        } as CartProductLine);
                    }
                    return { ...base, items };
                }
            );
            return { previous };
        },
        onError: (_e, _vars, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey,
                    ctx.previous
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartKey(userId) });
        },
    });

    const update = useMutation<
        CartProductLine,
        unknown,
        { productId: string; quantity: number },
        MutationCtx
    >({
        mutationFn: ({ productId, quantity }) =>
            updateCartItem(userId as string, productId, quantity),
        onMutate: async ({ productId, quantity }) => {
            if (!enabled || !userId)
                return { previous: { cartId: "guest", items: [] } };
            await queryClient.cancelQueries({ queryKey: cartKey(userId) });
            const previous = getCartState(
                queryClient.getQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey
                )
            );
            queryClient.setQueryData<CartState | undefined>(
                cartKey(userId) as CartQueryKey,
                (old) => {
                    const base: CartState =
                        getCartState(old) ||
                        ({
                            cartId: previous?.cartId || "temp",
                            items: [],
                        } as CartState);
                    const items = base.items.map((i) =>
                        i.productId === productId ? { ...i, quantity } : i
                    );
                    return { ...base, items };
                }
            );
            return { previous };
        },
        onError: (_e, _vars, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey,
                    ctx.previous
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartKey(userId) });
        },
    });

    const remove = useMutation<void, unknown, string, MutationCtx>({
        mutationFn: (productId) => removeCartItem(userId as string, productId),
        onMutate: async (productId) => {
            if (!enabled || !userId)
                return { previous: { cartId: "guest", items: [] } };
            await queryClient.cancelQueries({ queryKey: cartKey(userId) });
            const previous = getCartState(
                queryClient.getQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey
                )
            );
            queryClient.setQueryData<CartState | undefined>(
                cartKey(userId) as CartQueryKey,
                (old) => {
                    const base: CartState =
                        getCartState(old) ||
                        ({
                            cartId: previous?.cartId || "temp",
                            items: [],
                        } as CartState);
                    const items = base.items.filter(
                        (i) => i.productId !== productId
                    );
                    return { ...base, items };
                }
            );
            return { previous };
        },
        onError: (_e, _vars, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey,
                    ctx.previous
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartKey(userId) });
        },
    });

    const clear = useMutation<void, unknown, void>({
        mutationFn: async () => {
            if (!enabled || !userId) throw new Error("No user");
            await clearRemoteCart(userId as string);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartKey(userId) });
        },
    });

    const checkout = useMutation<CheckoutResponse, unknown, CheckoutPayload | void>({
        mutationFn: async (payload) => {
            if (!enabled || !userId) throw new Error("No user");
            return checkoutCart(userId as string, (payload ?? {}) as CheckoutPayload);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartKey(userId) });
        },
    });

    const increment = useCallback(
        (productId: string, delta = 1) => {
            const payload = getCartState(
                queryClient.getQueryData<CartState | undefined>(
                    cartKey(userId) as CartQueryKey
                )
            );
            const current = payload?.items.find(
                (i) => i.productId === productId
            );
            if (!current) {
                add.mutate({ productId, quantity: delta });
            } else {
                update.mutate({
                    productId,
                    quantity: (current.quantity ?? 0) + delta,
                });
            }
        },
        [add, update, queryClient, userId]
    );

    return {
        add,
        remove,
        update,
        increment,
        clear,
        checkout,
        addToCart: (productId: string, quantity = 1) =>
            enabled && userId ? add.mutate({ productId, quantity }) : undefined,
        removeFromCart: (productId: string) =>
            enabled && userId ? remove.mutate(productId) : undefined,
        updateQuantity: (productId: string, quantity: number) =>
            enabled && userId
                ? update.mutate({ productId, quantity })
                : undefined,
        clearCart: () => (enabled && userId ? clear.mutate() : undefined),
        checkoutNow: (payload?: CheckoutPayload) =>
            enabled && userId ? checkout.mutate(payload) : undefined,
    };
}

export function useCart() {
    const queryClient = useQueryClient();
    const { authState } = useAuthContext();
    const enabled = !!authState.user && !!authState.token;
    const userId =
        (authState.user as unknown as { id?: string; _id?: string })?.id ||
        (authState.user as unknown as { id?: string; _id?: string })?._id ||
        null;

    const query = useCartQuery(userId, enabled);
    const actions = useCartActions(userId, enabled);

    useEffect(() => {
        if (!enabled || !userId) {
            queryClient.setQueryData<CartState | undefined>(
                cartKey(userId) as CartQueryKey,
                {
                    cartId: "guest",
                    items: [],
                }
            );
        }
    }, [enabled, userId, queryClient]);

    return {
        ...query, // data: CartPayload
        ...actions,
    };
}
