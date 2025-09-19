import api from "./api";

export type FavouriteId = number | string;

// New product representation returned by backend
export interface FavouriteProduct {
    favouriteDetailId: string;
    id: string; // product id
    name?: string;
    price?: number | string;
    description?: string;
    imageUrl?: string;
    [key: string]: unknown; // allow additional product fields
}

export interface FavouritesProductsPayload {
    favouritesId: string | number;
    products: FavouriteProduct[];
}

/**
 * GET /users/:userId/favourites -> { favouritesId, products: [{ favouriteDetailId, ...product }] }
 */
export async function fetchFavouriteProducts(
    userId: string
): Promise<FavouritesProductsPayload> {
    const { data } = await api.get<FavouritesProductsPayload>(
        `/users/${userId}/favourites`
    );
    const favouritesId = data?.favouritesId as string | number;
    const raw = Array.isArray(data?.products) ? data.products : [];

    const products: FavouriteProduct[] = raw.map(
        (entry: unknown, idx: number) => {
            if (entry && typeof entry === "object") {
                const e = entry as Record<string, unknown> & {
                    favouriteDetailId?: string | number;
                    id?: string | number;
                    name?: string;
                    title?: string;
                    price?: number | string;
                    price_snapshot?: number | string;
                    description?: string;
                    imageUrl?: string;
                    photo?: string;
                };
                return {
                    favouriteDetailId: e.favouriteDetailId ?? e.id ?? idx,
                    id: e.id ?? idx,
                    name: e.name ?? e.title ?? `Favourite #${idx + 1}`,
                    price: e.price ?? e.price_snapshot ?? 0,
                    description: e.description,
                    imageUrl: e.imageUrl || e.photo || e.image,
                    ...e,
                } as FavouriteProduct;
            }
            return {
                favouriteDetailId: idx,
                id: entry as string | number,
                name: `Favourite #${idx + 1}`,
                price: 0,
            } as FavouriteProduct;
        }
    );

    return { favouritesId, products };
}

/**
 * POST /users/:userId/favourites { productId } -> returns product with favouriteDetailId
 */
export async function addFavourite(
    userId: string,
    productId: FavouriteId
): Promise<FavouriteProduct> {
    const { data } = await api.post(`/users/${userId}/favourites`, {
        productId,
    });
    return data as FavouriteProduct;
}

/**
 * DELETE /users/:userId/favourites/:detailId (uses favouriteDetailId, not productId)
 */
export async function removeFavourite(
    userId: string,
    favouriteDetailId: FavouriteId
): Promise<void> {
    await api.delete(`/users/${userId}/favourites/${favouriteDetailId}`);
}

/**
 * Toggle helper: tries add first; if already exists, resolves detail id and removes.
 * Returns refreshed array of product ids.
 */
export async function toggleFavourite(userId: string, productId: FavouriteId) {
    try {
        await addFavourite(userId, productId);
    } catch {
        // On conflict, fetch list to find detail id then remove
        const products = await fetchFavouriteProducts(userId);
        const match = products.products.find((p) => p.id === productId);
        if (match) await removeFavourite(userId, match.favouriteDetailId);
    }
}
