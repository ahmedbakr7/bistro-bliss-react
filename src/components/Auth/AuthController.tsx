import api from "../../services/api";
import type { RegisterDataType } from "./AuthRegister";

export const BASE_URL = import.meta.env.VITE_API_URL;

export async function submitRegister(
    {
        fullname:name,
        email,
        password,
    }: RegisterDataType,
    // actions: {}
) {
    try {
        const response = await api.post("/register", {
            name,
            email,
            password,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export function resetRegister() {
    throw new Error("unimplemented function");
    return;
}

export function submitLogin() {
    throw new Error("unimplemented function");
    return;
}

export function resetLogin() {
    throw new Error("unimplemented function");
    return;
}
