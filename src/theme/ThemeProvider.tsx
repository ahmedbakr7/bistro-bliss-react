// src/theme/ThemeProvider.tsx
import { useState, useEffect, type ReactNode } from "react";
import ThemeContext from "./ThemeContext";
import type { Theme } from "./types";

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved === "light" || saved === "dark" || saved === "system")
            return saved;
        return "system"; // Default to system if no preference is stored
    });

    useEffect(() => {
        let themeMode: Theme = theme;
        if (theme === "system") {
            themeMode = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
        }
        document.documentElement.setAttribute("data-theme", themeMode);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
