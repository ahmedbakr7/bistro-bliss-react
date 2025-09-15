import api from "./api";

export type FavouriteId = number | string;

// Matches OrderDetails from backend (favourites line item)
export interface FavouriteDetail {
    id: string | number; // detailId
    orderId: string | number;
    productId: string | number;
    quantity: number;
    price_snapshot?: number;
    name_snapshot?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    deletedAt?: string | Date | null;
}

export interface FavouritePayload {
    favouritesId: string | number;
    items: FavouriteDetail[];
}

async function fetchFavouriteDetails(
    userId: string
): Promise<FavouritePayload> {
    const { data } = await api.get(`/users/${userId}/favourites`);
    // Server returns { favouritesId, items }
    const favouritesId = (data?.favouritesId ?? data?.id) as string | number;
    const items = (Array.isArray(data?.items) ? data.items : data) as unknown[];

    // If API already returned the right shape, trust it; else try to coerce
    const normalizedItems: FavouriteDetail[] = items.map((entry, idx) => {
        if (entry && typeof entry === "object") {
            const p = entry as Record<string, unknown>;
            return {
                id: (p.id ?? idx) as string | number,
                orderId: (p.orderId ?? favouritesId ?? "") as string | number,
                productId: (p.productId ?? p["product_id"]) as string | number,
                quantity: Number(
                    (p.quantity as number | string | undefined) ?? 1
                ),
                price_snapshot: p.price_snapshot as number | undefined,
                name_snapshot: p.name_snapshot as string | undefined,
                createdAt: p.createdAt as string | Date | undefined,
                updatedAt: p.updatedAt as string | Date | undefined,
                deletedAt:
                    (p.deletedAt as string | Date | null | undefined) ?? null,
            };
        }
        return {
            id: idx,
            orderId: favouritesId ?? "",
            productId: entry as string | number,
            quantity: 1,
        } as FavouriteDetail;
    });

    return { favouritesId, items: normalizedItems };
}

export async function fetchFavourites(userId: string): Promise<FavouriteId[]> {
    const payload = await fetchFavouriteDetails(userId);
    return payload.items.map((i) => i.productId);
}

export async function addFavourite(
    userId: string,
    productId: FavouriteId
): Promise<FavouriteId[]> {
    return await api.post(`/users/${userId}/favourites`, { productId });
    // Return latest productId list
    // return fetchFavourites(userId);
}

export async function removeFavourite(
    userId: string,
    productId: FavouriteId
): Promise<FavouriteId[]> {
    // Need detailId to delete; look it up first
    return await api.delete(`/users/${userId}/favourites/${productId}`);
    // Return latest productId list regardless
    // return fetchFavourites(userId);
}

export async function toggleFavourite(
    userId: string,
    productId: FavouriteId
): Promise<FavouriteId[]> {
    try {
        return await addFavourite(userId, productId);
    } catch {
        return await removeFavourite(userId, productId);
    }
}

// Optional export if consumers need full detail rows
export { fetchFavouriteDetails };
