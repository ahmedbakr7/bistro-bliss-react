import { useMutation } from "@tanstack/react-query";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import {
    updateUserProfile,
    type UpdateProfilePayload,
} from "../services/profileApi";
import { toast } from "react-toastify";

export function useProfileQuery() {
    return useAuthContext().authState.user;
}

export function useProfileActions(userId: string | null) {
    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) =>
            updateUserProfile(userId as string, payload),

        onSuccess: () => {
            toast.success("Profile updated");
        },

        onError: (error) => {
            console.error("OTP verification failed:", error);
            toast.error("Profile update failed");
        },
    });
}

export function useProfile() {
    const { authState } = useAuthContext();

    // get id directly from auth user
    const userId = authState.user?.id ?? null;

    // const query = useProfileQuery();
    const actions = useProfileActions(userId);

    // return { query, ...actions };
    return { ...actions };
}
