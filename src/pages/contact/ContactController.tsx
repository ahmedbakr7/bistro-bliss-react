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
        const response = await api.post("/contact/create-contact", {
            name,
            email,
            subject,
            message,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export function resetContact() {
    console.log("reseting form");
}
