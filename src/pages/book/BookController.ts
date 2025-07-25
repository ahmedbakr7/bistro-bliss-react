import api from "../../services/api";
import type { BookDataType } from "./BookPage";

export async function submitBook(bookData: BookDataType) {
    try {
        console.log("Submitting booking:", bookData);
        const response = await api.post("/booking/create-booking", bookData);
        console.log("Booking response:", response);
        return response.data; // Return the response data for the mutation
    } catch (error) {
        console.error("Booking error:", error);
        throw error; // Re-throw the error so useMutation can handle it
    }
}

export function resetBook() {
    throw new Error("unimplemented function");
    return;
}
