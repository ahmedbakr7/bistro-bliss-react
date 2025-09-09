// import { useState, useCallback, useEffect } from "react";
// import type { ReactNode } from "react";
// import FavoritesContext from "./FavoritesContext";
// import type { FavoriteItem } from "./FavoritesContext";
// import {
//     addFavourite as apiAddFavourite,
//     removeFavourite as apiRemoveFavourite,
//     fetchFavourites,
// } from "../../services/favouritesApi";

// interface FavoritesProviderProps {
//     initialValue?: FavoriteItem[];
//     children: ReactNode;
// }

// export default function FavoritesProvider({
//     initialValue = [],
//     children,
// }: FavoritesProviderProps) {
//     const [favorites, setFavorites] = useState<FavoriteItem[]>(initialValue);

//     // Initial load from API (skip if initialValue provided)
//     useEffect(() => {
//         if (initialValue.length) return; // trust provided initial
//         let ignore = false;
//         (async () => {
//             try {
//                 const ids = await fetchFavourites();
//                 if (!ignore) setFavorites(ids.map((id) => ({ id })));
//             } catch (e) {
//                 console.error("Failed to fetch favourites", e);
//             }
//         })();
//         return () => {
//             ignore = true;
//         };
//     }, [initialValue]);

//     const isFavorite = useCallback(
//         (id: FavoriteItem["id"]) => favorites.some((item) => item.id === id),
//         [favorites]
//     );

//     const addFavorite = useCallback((item: FavoriteItem) => {
//         // optimistic update
//         setFavorites((prev) => {
//             if (prev.some((i) => i.id === item.id)) return prev;
//             return [...prev, item];
//         });
//         (async () => {
//             try {
//                 const ids = await apiAddFavourite(item.id);
//                 setFavorites(ids.map((id) => ({ id })));
//             } catch (e) {
//                 console.error("Failed to add favourite", e);
//                 // revert on failure
//                 setFavorites((prev) => prev.filter((i) => i.id !== item.id));
//             }
//         })();
//     }, []);

//     const removeFavorite = useCallback((id: FavoriteItem["id"]) => {
//         // optimistic update
//         setFavorites((prev) => prev.filter((i) => i.id !== id));
//         (async () => {
//             try {
//                 const ids = await apiRemoveFavourite(id);
//                 setFavorites(ids.map((fid) => ({ id: fid })));
//             } catch (e) {
//                 console.error("Failed to remove favourite", e);
//                 // refetch full list to recover (simplest strategy)
//                 try {
//                     const ids = await fetchFavourites();
//                     setFavorites(ids.map((fid) => ({ id: fid })));
//                 } catch (err) {
//                     console.error("Failed to refetch favourites", err);
//                 }
//             }
//         })();
//     }, []);

//     const toggleFavorite = useCallback(
//         (item: FavoriteItem) => {
//             if (isFavorite(item.id)) {
//                 removeFavorite(item.id);
//             } else {
//                 addFavorite(item);
//             }
//         },
//         [isFavorite, addFavorite, removeFavorite]
//     );

//     const value = {
//         favorites,
//         setFavorites,
//         addFavorite,
//         removeFavorite,
//         toggleFavorite,
//         isFavorite,
//     };

//     return (
//         <FavoritesContext.Provider value={value}>
//             {children}
//         </FavoritesContext.Provider>
//     );
// }
