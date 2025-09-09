// import { createContext } from "react";
// import type { Dispatch, SetStateAction } from "react";

// export interface FavoriteItem {
//     id: string | number;
//     // Add other properties that a favorite item would have
//     // For example: name, image, description, etc.
// }

// export interface FavoritesContextType {
//     favorites: FavoriteItem[];
//     setFavorites: Dispatch<SetStateAction<FavoriteItem[]>>;
//     addFavorite: (item: FavoriteItem) => void;
//     removeFavorite: (id: FavoriteItem["id"]) => void;
//     toggleFavorite: (item: FavoriteItem) => void;
//     isFavorite: (id: FavoriteItem["id"]) => boolean;
// }

// const FavoritesContext = createContext<FavoritesContextType>({
//     favorites: [],
//     setFavorites: () => {},
//     addFavorite: () => {},
//     removeFavorite: () => {},
//     toggleFavorite: () => {},
//     isFavorite: () => false,
// });

// export default FavoritesContext;
