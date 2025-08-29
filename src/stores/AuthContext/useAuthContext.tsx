import { useContext } from "react";
import AuthContext from "./AuthContext";
import type { AuthContextType } from "./AuthContext";

export default function useAuthContext(): AuthContextType {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuthContext must be used within a useAuthProvider");
    }

    return ctx;
}
