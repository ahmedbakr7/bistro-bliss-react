import { useState } from "react";
import type { ReactNode } from "react";
import FavoritesContext from "./FavoritesContext";
import type { FavoriteItem } from "./FavoritesContext";

interface FavoritesProviderProps {
    initialValue?: FavoriteItem[];
    children: ReactNode;
}

export default function FavoritesProvider({
    initialValue = [],
    children,
}: FavoritesProviderProps) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>(initialValue);

    // Commented code from the original file
    // useEffect(() => {
    //   const storedFavs = localStorage.getItem("favorites")
    //   if (storedFavs) setFavorites(JSON.parse(storedFavs))
    // }, [])

    // useEffect(() => {
    //   localStorage.setItem('favorites', JSON.stringify(favorites))
    // }, [favorites])

    // const addToFavorites = (movie) => {
    //   setFavorites(prev => [...prev, movie])
    // }

    // const removeFromFavorites = (movieId) => {
    //   setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    // }

    // const isFavorite = (movieId) => {
    //   return favorites.some(movie => movie.id === movieId)
    // }

    const value = { favorites, setFavorites };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}
