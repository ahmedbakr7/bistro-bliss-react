import api from "./api";

export interface Profile {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    imageUrl: string | null;
    role: "user" | "admin";
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    deletedAt?: string | Date | null;
    [key: string]: unknown;
}

function normalizeProfile(
    raw: unknown,
    fallbackId: string
): Profile | undefined {
    if (!raw || typeof raw !== "object") {
        return;
    }

    const r = raw as Record<string, unknown> & {
        id?: string;
        _id?: string;
        name?: string;
        username?: string;
        fullName?: string;
        email?: string;
        phone?: string;
        phoneNumber?: string;
        imageUrl?: string;
        avatarUrl?: string;
        avatar?: string;
        image?: string;
        photo?: string;
        role?: "user" | "admin";
        createdAt?: string | Date;
        updatedAt?: string | Date;
        deletedAt?: string | Date;
    };

    const id = (r.id as string) ?? (r._id as string) ?? fallbackId;
    const name =
        (r.name as string) ??
        (r.fullName as string) ??
        (r.username as string) ??
        null;
    const email = (r.email as string) ?? null;
    const phoneNumber =
        (r.phoneNumber as string) ?? (r.phone as string) ?? null;
    const imageUrl =
        (r.imageUrl as string) ??
        (r.avatarUrl as string) ??
        (r.avatar as string) ??
        (r.photo as string) ??
        (r.image as string) ??
        null;

    return {
        id,
        name,
        email,
        phoneNumber,
        imageUrl,
        role: r.role,
        createdAt: (r.createdAt as string | Date) ?? null,
        updatedAt: (r.updatedAt as string | Date) ?? null,
        deletedAt: (r.deletedAt as string | Date) ?? null,
        ...r,
    } as Profile;
}

export async function fetchUserProfile(userId: string) {
    // Updated to use the unified users endpoint
    const { data } = await api.get(`/users/${userId}`);
    return normalizeProfile(data, userId);
}

export type UpdateProfilePayload = Partial<
    Pick<Profile, "name" | "email" | "phoneNumber" | "imageUrl">
> & { [key: string]: unknown };

export async function updateUserProfile(
    userId: string,
    payload: UpdateProfilePayload
) {
    // Updated to use the unified users endpoint
    const { data } = await api.patch(`/users/${userId}`, payload);
    return normalizeProfile(data, userId);
}
