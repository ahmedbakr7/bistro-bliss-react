import { createContext } from "react";
import type { Product } from "../../components/Admin/Products";

export type Token = string;

export type User = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    imageUrl: string | null;
    role: "user" | "admin";
};

export interface CartItem extends Product {
    count: number;
}

export interface AuthState {
    user: User | null;
    favourites: Product[];
    cart: CartItem[];
    token: Token | null;
}

export interface AuthContextType {
    authState: AuthState;
    login: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    setAuthState: (authState: AuthState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
