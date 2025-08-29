import { createContext } from "react";

export type Token = string;

export type User = {
    name: string;
    password: string;
};

export interface AuthState {
    user: User | null;
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
