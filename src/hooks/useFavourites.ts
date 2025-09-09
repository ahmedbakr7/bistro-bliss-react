import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addFavourite,
    fetchFavourites,
    removeFavourite,
    type FavouriteId,
} from "../services/favouritesApi";
import { useCallback } from "react";

const FAVS_QUERY_KEY = ["favourites"] as const;

export function useFavouritesQuery(enabled = true) {
    return useQuery({
        queryKey: FAVS_QUERY_KEY,
        queryFn: fetchFavourites,
        enabled,
        staleTime: Infinity,
    });
}

export function useFavouritesActions() {
    const queryClient = useQueryClient();

    const add = useMutation({
        mutationFn: (productId: FavouriteId) => addFavourite(productId),
        onMutate: async (productId) => {
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
        mutationFn: (productId: FavouriteId) => removeFavourite(productId),
        onMutate: async (productId) => {
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
        addToFavourites: (productId: FavouriteId) => add.mutate(productId),
        removeFromFavourites: (productId: FavouriteId) =>
            remove.mutate(productId),
        add,
        remove,
        toggle,
    };
}

export function useFavourites() {
    const query = useFavouritesQuery();
    const actions = useFavouritesActions();

    return {
        ...query, // data, isLoading, error
        ...actions, // addToFavourites, removeFromFavourites, toggle, add/remove mutations
    };
}
