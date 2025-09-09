import api from "./api";

export type FavouriteId = number | string;

export async function fetchFavourites(): Promise<FavouriteId[]> {
    const { data } = await api.get("/favourites");
    return data.items ?? data; // expecting array of ids or objects
}

export async function addFavourite(
    productId: FavouriteId
): Promise<FavouriteId[]> {
    const { data } = await api.put(`/favourites`, { productId });
    return data.items ?? data;
}

export async function removeFavourite(
    productId: FavouriteId
): Promise<FavouriteId[]> {
    const { data } = await api.delete(`/favourites/${productId}`);
    return data.items ?? data;
}

export async function toggleFavourite(
    productId: FavouriteId
): Promise<FavouriteId[]> {
    try {
        return await addFavourite(productId);
    } catch {
        // if server returns 409 or similar meaning already exists -> remove
        return await removeFavourite(productId);
    }
}
