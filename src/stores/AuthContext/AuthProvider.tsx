import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import AuthContext, {
    type AuthContextType,
    type AuthState,
} from "./AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
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
                {}
            )
            .then(({ data }) => {
                setAuthState({
                    user: data.user,
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
                            user: data.user,
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
