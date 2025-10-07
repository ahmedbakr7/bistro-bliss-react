import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import {
    fetchUserNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    type Notification,
} from "../services/notificationsApi";
import { useCallback, useEffect } from "react";

const NOTIFS_QUERY_KEY = ["notifications"] as const;
const key = (userId: string | null) => [...NOTIFS_QUERY_KEY, userId] as const;

export function useNotificationsQuery(userId: string | null, enabled = true) {
    return useQuery<Notification[]>({
        queryKey: key(userId),
        queryFn: () => fetchUserNotifications(userId as string),
        enabled: enabled && !!userId,
        initialData: [] as Notification[],
        staleTime: 1000 * 30,
    });
}

export function useNotificationsActions(userId: string | null, enabled = true) {
    const qc = useQueryClient();

    const markRead = useMutation({
        mutationFn: (notificationId: string) =>
            markNotificationRead(userId as string, notificationId),
        onMutate: async (id) => {
            if (!enabled || !userId) return { previous: [] as Notification[] };
            await qc.cancelQueries({ queryKey: key(userId) });
            const previous = qc.getQueryData<Notification[]>(key(userId));
            qc.setQueryData<Notification[]>(key(userId), (old) => {
                return (old || []).map((n) =>
                    n.id === id
                        ? { ...n, readAt: n.readAt || new Date().toISOString() }
                        : n
                );
            });
            return { previous };
        },
        onError: (_e, _vars, ctx) => {
            if (ctx?.previous) qc.setQueryData(key(userId), ctx.previous);
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: key(userId) });
        },
    });

    const markAll = useMutation({
        mutationFn: () => markAllNotificationsRead(userId as string),
        onMutate: async () => {
            if (!enabled || !userId) return { previous: [] as Notification[] };
            await qc.cancelQueries({ queryKey: key(userId) });
            const previous = qc.getQueryData<Notification[]>(key(userId));
            const ts = new Date().toISOString();
            qc.setQueryData<Notification[]>(key(userId), (old) =>
                (old || []).map((n) => ({ ...n, readAt: n.readAt || ts }))
            );
            return { previous };
        },
        onError: (_e, _vars, ctx) => {
            if (ctx?.previous) qc.setQueryData(key(userId), ctx.previous);
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: key(userId) });
        },
    });

    const unreadCount = useCallback(() => {
        const data = qc.getQueryData<Notification[]>(key(userId));
        return (data || []).filter((n) => !n.readAt).length;
    }, [qc, userId]);

    return { markRead, markAll, unreadCount };
}

export function useNotifications() {
    const { authState } = useAuthContext();
    const enabled = !!authState.user && !!authState.token;
    const authUser = authState.user as { id?: string; _id?: string } | null;
    const userId = authUser?.id || authUser?._id || null;

    const query = useNotificationsQuery(userId, enabled);
    const actions = useNotificationsActions(userId, enabled);

    const qc = useQueryClient();
    useEffect(() => {
        if (!enabled || !userId) {
            qc.setQueryData<Notification[]>(key(userId), []);
        }
    }, [enabled, userId, qc]);

    return { ...query, ...actions };
}
