import api from "./api";

export interface CartItem {
    productId: number | string;
    quantity: number;
}

// Remote (authenticated) cart endpoints
export async function fetchCart(): Promise<CartItem[]> {
    const { data } = await api.get("/cart");
    return data.items ?? data; // flexible shape
}

export async function addCartItem(
    productId: number | string,
    quantity = 1
): Promise<CartItem[]> {
    const { data } = await api.post("/cart/items", { productId, quantity });
    return data.items ?? data;
}

export async function updateCartItem(
    productId: number | string,
    quantity: number
): Promise<CartItem[]> {
    const { data } = await api.patch(`/cart/items/${productId}`, { quantity });
    return data.items ?? data;
}

export async function removeCartItem(
    productId: number | string
): Promise<CartItem[]> {
    const { data } = await api.delete(`/cart/items/${productId}`);
    return data.items ?? data;
}

export async function clearRemoteCart(): Promise<CartItem[]> {
    const { data } = await api.delete("/cart");
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
    payload: CheckoutPayload = {}
): Promise<CheckoutResponse> {
    const { data } = await api.post("/cart/checkout", payload);
    return data;
}
