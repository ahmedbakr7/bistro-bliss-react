import { createContext } from "react";
import type { ThemeContextValue } from "./types";

const ThemeContext = createContext<ThemeContextValue>({
    theme: "system",
    setTheme: () => {},
});

export default ThemeContext;
