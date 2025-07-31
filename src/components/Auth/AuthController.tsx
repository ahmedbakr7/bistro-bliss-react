import { MdEmail } from "react-icons/md";
import api from "../../services/api";
import type { LoginDataType } from "./AuthLogin";
import type { RegisterDataType } from "./AuthRegister";

export const BASE_URL = import.meta.env.VITE_API_URL;

export async function submitRegister(registerData: RegisterDataType) {
    console.log(registerData);
    try {
        const formData = new FormData();
        if (registerData.profileImage) {
            formData.append("image", registerData.profileImage);
        } else {
            throw new Error("profile image is null");
        }

        let response = await api.post("menu/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status !== 200) {
            throw new Error(
                `Image Upload failed, reason: ${response.statusText}`
            );
        }

        const body = {
            name: registerData.fullname,
            email: registerData.email,
            phoneNumber: registerData.phoneNumber,
            password: registerData.password,
            profilePic: response.data.normalizedPath,
        };

        response = await api.post("/user/register", body);
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
