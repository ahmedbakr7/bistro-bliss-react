import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addFavourite,
    fetchFavourites,
    removeFavourite,
    type FavouriteId,
} from "../services/favouritesApi";
import { useCallback, useEffect } from "react";
import useAuthContext from "../stores/AuthContext/useAuthContext";

const FAVS_QUERY_KEY = ["favourites"] as const;

export function useFavouritesQuery(userId: string | null, enabled = true) {
    return useQuery({
        queryKey: [...FAVS_QUERY_KEY, userId] as const,
        queryFn: () => fetchFavourites(userId as string),
        enabled: enabled && !!userId,
        staleTime: Infinity,
        initialData: [] as FavouriteId[],
    });
}

export function useFavouritesActions(userId: string | null, enabled = true) {
    const queryClient = useQueryClient();

    const add = useMutation({
        mutationFn: (productId: FavouriteId) =>
            addFavourite(userId as string, productId),
        onMutate: async (productId) => {
            if (!enabled || !userId) return { previous: [] as FavouriteId[] };
            await queryClient.cancelQueries({ queryKey: FAVS_QUERY_KEY });
            const previous =
                queryClient.getQueryData<FavouriteId[]>(FAVS_QUERY_KEY);

            queryClient.setQueryData<FavouriteId[]>(FAVS_QUERY_KEY, (old) => {
                const list = old ? [...old] : [];
                if (!list.includes(productId)) list.push(productId);
                return list;
            });

            return { previous } as { previous?: FavouriteId[] };
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(FAVS_QUERY_KEY, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: FAVS_QUERY_KEY });
        },
    });

    const remove = useMutation({
        mutationFn: (productId: FavouriteId) =>
            removeFavourite(userId as string, productId),
        onMutate: async (productId) => {
            if (!enabled || !userId) return { previous: [] as FavouriteId[] };
            await queryClient.cancelQueries({ queryKey: FAVS_QUERY_KEY });
            const previous =
                queryClient.getQueryData<FavouriteId[]>(FAVS_QUERY_KEY);

            queryClient.setQueryData<FavouriteId[]>(FAVS_QUERY_KEY, (old) => {
                const list = old ? [...old] : [];
                return list.filter((id) => id !== productId);
            });

            return { previous } as { previous?: FavouriteId[] };
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(FAVS_QUERY_KEY, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: FAVS_QUERY_KEY });
        },
    });

    const toggle = useCallback(
        (productId: FavouriteId, current: FavouriteId[] | undefined) => {
            if (current?.includes(productId)) {
                remove.mutate(productId);
            } else {
                add.mutate(productId);
            }
        },
        [add, remove]
    );

    return {
        addToFavourites: (productId: FavouriteId) =>
            enabled && userId ? add.mutate(productId) : undefined,
        removeFromFavourites: (productId: FavouriteId) =>
            enabled && userId ? remove.mutate(productId) : undefined,
        add,
        remove,
        toggle,
    };
}

export function useFavourites() {
    const { authState } = useAuthContext();
    const queryClient = useQueryClient();
    const enabled = !!authState.user && !!authState.token;
    const userId =
        (authState.user as unknown as { id?: string; _id?: string })?.id ||
        (authState.user as unknown as { id?: string; _id?: string })?._id ||
        null;

    const query = useFavouritesQuery(userId, enabled);
    const actions = useFavouritesActions(userId, enabled);

    // Ensure empty array when unauthenticated
    useEffect(() => {
        if (!enabled || !userId) {
            queryClient.setQueryData<FavouriteId[]>(FAVS_QUERY_KEY, []);
        }
    }, [enabled, userId, queryClient]);

    return {
        ...query, // data, isLoading, error
        ...actions, // addToFavourites, removeFromFavourites, toggle, add/remove mutations
    };
}
