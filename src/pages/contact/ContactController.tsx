import api from "../../services/api";
import type { ContactDataType } from "./ContactPage";

export async function submitContact({
    name,
    email,
    subject,
    message,
}: ContactDataType) {
    // actions: {}
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

export function resetContact() {
    throw new Error("unimplemented function");
    return;
}