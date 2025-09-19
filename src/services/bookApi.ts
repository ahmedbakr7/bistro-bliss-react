import api from "./api";
import type { AuthState } from "../stores/AuthContext/AuthContext";
import type { BookDataType } from "../pages/book/BookPage";

export async function submitBook(bookData: BookDataType, authState: AuthState) {
    try {
        // Map UI fields to backend schema
        const userId =
            (authState.user as unknown as { id?: string; _id?: string })?.id ||
            (authState.user as unknown as { id?: string; _id?: string })?._id;
        if (!userId) throw new Error("User ID is required for booking.");
        if (!bookData.date || !bookData.time)
            throw new Error("Both date and time are required.");

        // Combine date and time into an ISO timestamp
        const bookedAtISO = new Date(
            `${bookData.date}T${bookData.time}:00`
        ).toISOString();

        const payload = {
            userId,
            numberOfPeople: Number(bookData.totalPerson ?? 1),
            bookedAt: bookedAtISO,
            // status is optional; default handled by backend (PENDING)
        };

        console.log("Submitting booking payload:", payload);
        const response = await api.post("/booking/create-booking", payload);
        console.log("Booking response:", response);
        return response.data; // Return the response data for the mutation
    } catch (error) {
        console.error("Booking error:", error);
        throw error; // Re-throw the error so useMutation can handle it
    }
}

export function resetBook() {
    // No-op: Formik handles form state reset; keep for API compatibility
    return;
}
