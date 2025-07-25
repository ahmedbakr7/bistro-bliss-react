import api from "../../services/api";
import type { BookDataType } from "./BookPage";

export async function submitBook(bookData: BookDataType) {
    // actions: {}
    try {
        console.log(bookData);
        const response = await api.post("/booking/create-booking", bookData);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export function resetBook() {
    throw new Error("unimplemented function");
    return;
}
