import { queryClient } from "../lib/react-query-client";
import api from "./api";

// --- Types ---
export interface CartPayload {
    cartId: string;
    items: RawCartLine[]; // normalized lines
}

export interface RawProduct {
    id?: string;
    name?: string;
    price?: number | string;
    description?: string;
    imageUrl?: string;
    category?: string;
    [k: string]: unknown;
}

export interface RawCartLine {
    id?: string; // server id
    cartDetailId?: string; // normalized alias
    orderId?: string; // order / cart id reference
    productId?: string; // product id
    quantity?: number; // quantity
    name_snapshot?: string; // fallback name snapshot
    price_snapshot?: number | string; // fallback price snapshot
    product?: RawProduct; // associated product
    [k: string]: unknown; // extra passthrough fields
}

// Backwards compatibility alias used by mutations
export type CartProductLine = RawCartLine;

// --- Normalization Helpers ---
function toStr(val: unknown, fallback: string): string {
    if (val === null || val === undefined || val === "") return fallback;
    return String(val);
}

function toQty(val: unknown, fallback = 1): number {
    if (typeof val === "number" && val > 0) return val;
    const n = Number(val);
    return Number.isFinite(n) && n > 0 ? n : fallback;
}

function normalizeLine(raw: unknown, idx: number): RawCartLine {
    const obj = (raw && typeof raw === "object" ? raw : {}) as RawCartLine;
    const cartDetailId = toStr(
        obj.cartDetailId || obj.detailId || obj.id,
        `line-${idx}`
    );
    const productId = toStr(
        obj.productId || obj.product?.id || cartDetailId,
        cartDetailId
    );
    const qty = toQty(obj.quantity, 1);

    const name =
        obj.name ||
        obj.name_snapshot ||
        obj.product?.name ||
        `Item #${idx + 1}`;

    const price = obj.price ?? obj.price_snapshot ?? obj.product?.price ?? 0;

    const imageUrl =
        obj.imageUrl ||
        obj.photo ||
        obj.product?.imageUrl ||
        obj.product?.photo;

    return {
        ...obj,
        cartDetailId,
        id: obj.id ? toStr(obj.id, cartDetailId) : cartDetailId,
        productId,
        quantity: qty,
        name,
        price,
        imageUrl,
    }; // keep product and extra fields if present
}

interface RawCartRoot {
    cartId?: string | number;
    id?: string | number;
    orderId?: string | number;
    items?: unknown;
}

function normalizePayload(data: unknown): CartPayload {
    const root = (data && typeof data === "object" ? data : {}) as RawCartRoot;
    const rawItems = Array.isArray(root.items) ? root.items : [];
    const cartId = toStr(root.cartId ?? root.id ?? root.orderId, "unknown");
    const items = rawItems.map((r, i) => normalizeLine(r, i));
    return { cartId, items };
}

// --- Fetch ---
export async function fetchCartPayload(userId: string): Promise<CartPayload> {
    const { data } = await api.get(`/users/${userId}/cart`);
    return normalizePayload(data);
}

// --- Mutations ---
export async function addCartItem(
    userId: string,
    productId: string,
    quantity = 1
): Promise<CartProductLine> {
    const { data } = await api.post(`/users/${userId}/cart/items`, {
        productId,
        quantity,
    });
    return normalizeLine(data, 0);
}

export async function updateCartItemByDetailId(
    userId: string,
    detailId: string,
    quantity: number
): Promise<CartProductLine> {
    const { data } = await api.patch(
        `/users/${userId}/cart/items/${detailId}`,
        { quantity }
    );
    return normalizeLine(data, 0);
}

export async function removeCartItemByDetailId(
    userId: string,
    detailId: string
): Promise<void> {
    await api.delete(`/users/${userId}/cart/items/${detailId}`);
}

// Resolve detail id from React Query cache (no network)
async function resolveDetailId(
    userId: string,
    productId: string
): Promise<string | undefined> {
    const payload = queryClient.getQueryData<CartPayload>(["cart", userId]);
    if (!payload) return undefined;
    const match = payload.items.find((i) => String(i.productId) === productId);
    return match?.id;
}

export async function updateCartItem(
    userId: string,
    productId: string,
    quantity: number
): Promise<CartProductLine> {
    const detailId = await resolveDetailId(userId, productId);
    if (!detailId)
        throw new Error(`Cart item not found for productId=${productId}`);
    return updateCartItemByDetailId(userId, detailId, quantity);
}

export async function removeCartItem(
    userId: string,
    productId: string
): Promise<void> {
    const detailId = await resolveDetailId(userId, productId);
    if (!detailId) return; // idempotent: nothing to remove
    await removeCartItemByDetailId(userId, detailId);
}

export async function clearRemoteCart(userId: string): Promise<void> {
    await api.delete(`/users/${userId}/cart`);
}

// --- Checkout ---
export interface CheckoutPayload {
    paymentMethodId?: string;
    addressId?: string;
    couponCode?: string;
    notes?: string;
}

export interface CheckoutResponse {
    orderId: string;
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
