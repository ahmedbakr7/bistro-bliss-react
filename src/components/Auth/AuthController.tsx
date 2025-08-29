import { MdEmail } from "react-icons/md";
import api from "../../services/api";
import type { LoginDataType } from "./AuthLogin";
import type { RegisterDataType } from "./AuthRegister";

export const BASE_URL = import.meta.env.VITE_API_URL;

export async function submitRegister(registerData: RegisterDataType) {
    console.log(registerData);
    try {
        const body = {
            name: registerData.name,
            email: registerData.email,
            phoneNumber: registerData.phoneNumber,
            password: registerData.password,
            // profilePic: response.data.normalizedPath,
        };

        let { data } = await api.post("/auth/register", body);
        console.log(data);

        const formData = new FormData();
        if (registerData.profileImage) {
            formData.append("image", registerData.profileImage);
        } else {
            throw new Error("profile image is null");
        }

        data = await api.post(`/users/${data.id}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (data.status !== 200) {
            throw new Error(
                `User registered you can login now, but Image Upload failed, reason: ${data.message}`
            );
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
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
