import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface FavoriteItem {
    id: string | number;
    // Add other properties that a favorite item would have
    // For example: name, image, description, etc.
}

export interface FavoritesContextType {
    favorites: FavoriteItem[];
    setFavorites: Dispatch<SetStateAction<FavoriteItem[]>>;
}

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    setFavorites: () => {},
});

export default FavoritesContext;
