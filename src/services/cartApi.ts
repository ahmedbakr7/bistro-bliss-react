import api from "./api";

export interface CartItem {
    productId: number | string;
    quantity: number;
}

// Server cart line shape (minimal fields we rely on)
interface CartLine {
    id?: number | string;
    detailId?: number | string;
    productId?: number | string;
    quantity?: number;
}

// Helper: resolve server-side cart line detailId from a productId
async function resolveDetailIdFromProductId(
    userId: string,
    productId: number | string
): Promise<string | number | undefined> {
    try {
        const { data } = await api.get(`/users/${userId}/cart`);
        const items = (data?.items ?? data) as CartLine[];
        if (!Array.isArray(items)) return undefined;
        const found = items.find(
            (i: CartLine) => String(i?.productId) === String(productId)
        );
        // Prefer id, but fall back to detailId if API names it differently
        return found?.id ?? found?.detailId;
    } catch {
        return undefined;
    }
}

// Remote (authenticated) cart endpoints (scoped by userId)
export async function fetchCart(userId: string): Promise<CartItem[]> {
    const { data } = await api.get(`/users/${userId}/cart`);
    return data.items ?? data; // flexible shape
}

export async function addCartItem(
    userId: string,
    productId: number | string,
    quantity = 1
): Promise<CartItem[]> {
    const { data } = await api.post(`/users/${userId}/cart/items`, {
        productId,
        quantity,
    });
    return data.items ?? data;
}

export async function updateCartItem(
    userId: string,
    productId: number | string,
    quantity: number
): Promise<CartItem[]> {
    // Backward compatible: accept productId, resolve server detailId
    const detailId = await resolveDetailIdFromProductId(userId, productId);
    if (detailId === undefined)
        throw new Error("Cart item not found for given productId");

    const { data } = await api.patch(
        `/users/${userId}/cart/items/${detailId}`,
        {
            quantity,
        }
    );
    return data.items ?? data;
}

// Direct helper if caller knows the server-side detailId already
export async function updateCartItemByDetailId(
    userId: string,
    detailId: number | string,
    quantity: number
): Promise<CartItem[]> {
    const { data } = await api.patch(
        `/users/${userId}/cart/items/${detailId}`,
        { quantity }
    );
    return data.items ?? data;
}

export async function removeCartItem(
    userId: string,
    productId: number | string
): Promise<CartItem[]> {
    // Backward compatible: accept productId, resolve server detailId
    const detailId = await resolveDetailIdFromProductId(userId, productId);
    if (detailId === undefined) {
        // Treat as idempotent delete when item isn't present
        return [];
    }
    await api.delete(`/users/${userId}/cart/items/${detailId}`);
    return [];
}

// Direct helper if caller knows the server-side detailId already
export async function removeCartItemByDetailId(
    userId: string,
    detailId: number | string
): Promise<CartItem[]> {
    await api.delete(`/users/${userId}/cart/items/${detailId}`);
    return [];
}

export async function clearRemoteCart(userId: string): Promise<CartItem[]> {
    const { data } = await api.delete(`/users/${userId}/cart`);
    return data.items ?? [];
}

// Checkout
export interface CheckoutPayload {
    paymentMethodId?: string;
    addressId?: string | number;
    couponCode?: string;
    notes?: string;
}

export interface CheckoutResponse {
    orderId: string | number;
    total?: number;
    currency?: string;
    status?: "created" | "paid" | "pending" | "failed";
    message?: string;
}

export async function checkoutCart(
    userId: string,
    payload: CheckoutPayload = {}
): Promise<CheckoutResponse> {
    const { data } = await api.post(`/users/${userId}/cart/checkout`, payload);
    return data;
}
