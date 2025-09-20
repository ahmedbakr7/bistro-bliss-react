import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import AuthContext, {
    type AuthContextType,
    type AuthState,
    type User,
} from "./AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

function normalizeUser(raw: unknown): User {
    const r = (raw || {}) as Record<string, unknown> & {
        id?: string;
        _id?: string;
        name?: string;
        fullName?: string;
        username?: string;
        email?: string;
        phoneNumber?: string;
        phone?: string;
        imageUrl?: string | null;
        avatarUrl?: string | null;
        image?: string | null;
        photo?: string | null;
        role?: "user" | "admin";
    };

    return {
        id: (r.id as string) ?? (r._id as string) ?? "",
        name:
            (r.name as string) ??
            (r.fullName as string) ??
            (r.username as string) ??
            "",
        email: (r.email as string) ?? "",
        phoneNumber: (r.phoneNumber as string) ?? (r.phone as string) ?? "",
        imageUrl:
            (r.imageUrl as string | null) ??
            (r.avatarUrl as string | null) ??
            (r.image as string | null) ??
            (r.photo as string | null) ??
            null,
        role: (r.role as "user" | "admin") ?? "user",
    } satisfies User;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    // const [token, setToken] = useState<Token>(getTokenLocalStorage());
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        cart: [],
        favourites: [],
        token: null,
    });

    const tokenRef = useRef<string | null>(authState.token);
    const navigate = useNavigate();

    function login(email: string, password: string) {
        return api
            .post(
                "/auth/login",
                {
                    email,
                    password,
                },
                // {}
            )
            .then(({ data }) => {
                setAuthState({
                    user: normalizeUser(data.user),
                    token: data.accessToken,
                    cart: data.cart,
                    favourites: data.favourites,
                });
            });
    }

    function logOut() {
        api.post("/auth/logout", {});
        setAuthState({ user: null, cart: [], favourites: [], token: null });
        navigate("/", { replace: true });
    }

    // keep ref updated whenever state changes
    useEffect(() => {
        tokenRef.current = authState.token;
    }, [authState.token]);

    useEffect(() => {
        const authInterceptor = api.interceptors.request.use(
            (config: CustomAxiosRequestConfig) => {
                if (!config.headers) {
                    config.headers = {} as AxiosRequestHeaders;
                }

                if (tokenRef.current && !config._retry) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${tokenRef.current}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, []);

    useEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (
                    error.response.status === 401 &&
                    (error.response.data.message as string)
                        .split(" ", 2)
                        .at(-1) === "Unauthorized"
                ) {
                    try {
                        const { data } = await api.get("/auth/refresh");

                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                        originalRequest._retry = true;

                        setAuthState({
                            user: normalizeUser(data.user),
                            token: data.accessToken,
                            cart: data.cart,
                            favourites: data.favourites,
                        });

                        return api(originalRequest);
                    } catch {
                        setAuthState({
                            user: null,
                            cart: [],
                            favourites: [],
                            token: null,
                        });
                        navigate("/", { replace: true });
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        };
    }, [navigate]);

    const value: AuthContextType = {
        authState,
        login,
        logOut,
        setAuthState,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
