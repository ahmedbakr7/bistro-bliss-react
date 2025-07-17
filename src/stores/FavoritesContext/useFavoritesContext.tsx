import { useContext } from "react";
import FavoritesContext from "./FavoritesContext";
import type { FavoritesContextType } from "./FavoritesContext";

export default function useFavoritesContext(): FavoritesContextType {
    const ctx = useContext(FavoritesContext);

    if (!ctx) {
        throw new Error(
            "useFavoritesContext must be used within a FavoritesProvider"
        );
    }

    return ctx;
}
