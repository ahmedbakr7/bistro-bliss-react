import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import {
    fetchUserProfile,
    updateUserProfile,
    type Profile,
    type UpdateProfilePayload,
} from "../services/profileApi";

// const PROFILE_QUERY_KEY = ["profile"] as const;
// const key = (userId: string | null) => [...PROFILE_QUERY_KEY, userId] as const;

export function useProfileQuery() {
    return useAuthContext().authState.user;
}

export function useProfileActions(userId: string | null, enabled = true) {
    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) =>
            updateUserProfile(userId as string, payload),

        onSuccess: () => {
            console.log("success");
        },

        onError: (error) => {
            console.error("OTP verification failed:", error);
        },
    });
}

export function useProfile() {
    const { authState } = useAuthContext();
    const enabled = !!authState.user && !!authState.token;

    // if (!enabled) throw new Error("User not logged in.");

    // get id directly from auth user
    const userId = authState.user?.id ?? null;

    // const query = useProfileQuery();
    const actions = useProfileActions(userId, enabled);

    // return { query, ...actions };
    return { ...actions };
}
