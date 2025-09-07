import api from "../../services/api";
import type { ContactDataType } from "./ContactPage";

export async function submitContact({
    name,
    email,
    subject,
    message,
}: ContactDataType) {
    // actions: {}
    const response = await api.post("/contacts", {
        name,
        email,
        subject,
        message,
    });

    console.log(response);
}

export function resetContact() {
    console.log("reseting form");
}
