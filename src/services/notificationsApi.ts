import api from "./api";

export interface RawNotification {
    id?: string | number;
    userId?: string | number | null;
    type?: string;
    message?: string;
    readAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    [k: string]: unknown;
}

export interface Notification {
    id: string;
    userId?: string | null;
    type: string;
    message: string;
    readAt: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    raw?: RawNotification; // keep original
}

function normalize(raw: unknown, idx: number): Notification {
    const o = (raw && typeof raw === "object" ? raw : {}) as RawNotification;
    const id = String(o.id ?? idx);
    return {
        id,
        userId: (o.userId ? String(o.userId) : null) ?? null,
        type: (o.type ? String(o.type) : "info").toLowerCase(),
        message: o.message ? String(o.message) : "(no message)",
        readAt: o.readAt ? String(o.readAt) : null,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
        deletedAt: o.deletedAt ?? null,
        raw: o,
    };
}

// GET /users/:userId/notifications -> Notification[]
export async function fetchUserNotifications(
    userId: string
): Promise<Notification[]> {
    const { data } = await api.get(`/users/${userId}/notifications`);
    let arr: unknown = data;
    if (!Array.isArray(arr) && arr && typeof arr === "object") {
        const maybe = arr as { items?: unknown };
        if (Array.isArray(maybe.items)) arr = maybe.items;
    }
    return (Array.isArray(arr) ? arr : []).map(normalize);
}

// PATCH /users/:userId/notifications/:id/read -> updated notification
// Adjust endpoint if your backend differs.
export async function markNotificationRead(
    userId: string,
    notificationId: string
): Promise<Notification> {
    const { data } = await api.patch(
        `/users/${userId}/notifications/${notificationId}/read`,
        {}
    );
    return normalize(data, 0);
}

// PATCH /users/:userId/notifications/read-all -> { updated: n }
export async function markAllNotificationsRead(userId: string): Promise<void> {
    await api.patch(`/users/${userId}/notifications/read-all`, {});
}
