import { useContext } from "react";
import ThemeContext from "./ThemeContext.js";

export default function useMoviesContext() {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error("ThemeContext must be provided in the root");
    return ctx;
}
