import api from "../../services/api";
import type { LoginDataType } from "./AuthLogin";
import type { RegisterDataType } from "./AuthRegister";

export const BASE_URL = import.meta.env.VITE_API_URL;

export async function submitRegister(registerData: RegisterDataType) {
    // actions: {}
    try {
        const response = await api.post("/register", registerData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function resetRegister() {
    console.log("reseting form");
}

export async function submitLogin(loginData: LoginDataType) {
    // actions: {}
    try {
        const response = await api.post("/login", loginData); // Fixed endpoint
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function resetLogin() {
    console.log("reseting form");
}
