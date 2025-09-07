import { MdEmail } from "react-icons/md";
import api from "../../services/api";
import type { LoginDataType } from "./AuthLogin";
import type { RegisterDataType } from "./AuthRegister";

export const BASE_URL = import.meta.env.VITE_API_URL;

export async function submitRegister(registerData: RegisterDataType) {
    console.log(registerData);
    try {
        // Build a single multipart/form-data payload containing ALL fields
        const formData = new FormData();

        // Append scalar fields (convert to string just in case)
        const scalarFields: Record<string, unknown> = {
            name: registerData.name,
            email: registerData.email,
            phoneNumber: registerData.phoneNumber,
            password: registerData.password,
        };
        Object.entries(scalarFields).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        // Append file (image) if present
        if (registerData.profileImage) {
            formData.append("image", registerData.profileImage);
        } else {
            console.warn("profileImage is not provided; proceeding without it");
        }

        // Single request to register endpoint expecting multipart/form-data
        const { data } = await api.post("/auth/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return data;
    } catch (error) {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error((error as any).response?.data || "Registration failed");
    }
}

export function resetRegister() {
    console.log("reseting form");
}

// export async function submitLogin(loginData: LoginDataType) {
//     // actions: {}
//     try {
//         const response = await api.post("/auth/login", loginData); // Fixed endpoint
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

export function resetLogin() {
    console.log("reseting form");
}
