import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useMemo, useCallback, useRef, useState } from "react"; // added useState
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";
import api from "../../services/api";
import type { GenericAbortSignal } from "axios";
import QueryBuilder from "../QueryBuilder/QueryBuilder";
import type { QueryField } from "../QueryBuilder/types";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom"; // removed useNavigate

export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
    role: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    // Added index signature to satisfy Record constraint in Table
    [key: string]: unknown;
}

export interface UserPayload {
    data: User[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
}

interface UserQueryParams {
    name?: string;
    role?: string;
    createdAfter?: string; // ISO date
    createdBefore?: string; // ISO date
    hasPhone?: boolean;
    [key: string]: unknown; // add index signature for Record compatibility
}

export type UserQuery = {
    page?: number;
    totalPages?: number;
    limit?: number;
    sortBy?: "name" | "email" | "createdAt";
    sortOrder?: "asc" | "desc";
    role?: string;
    email?: string;
    phoneNumber?: string;
    imageUrl?: string;
    name?: string;
    createdAfter?: string;
    createdBefore?: string;
};

export default function Users(): ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();

    // Ref that survives renders; holds latest query state (non-reactive)
    const queryRef = useRef<UserQuery>({});

    // Derive a plain object from current URLSearchParams (reactive)
    const derivedParams: UserQuery = useMemo(() => {
        const obj: Partial<UserQuery> = {};
        searchParams.forEach((value, key) => {
            if (value === "") return;
            switch (key) {
                case "page":
                    obj.page = Number(value);
                    break;
                case "limit":
                    obj.limit = Number(value);
                    break;
                case "sortBy":
                    obj.sortBy = value as UserQuery["sortBy"];
                    break;
                case "sortOrder":
                    obj.sortOrder = value as UserQuery["sortOrder"];
                    break;
                case "role":
                    obj.role = value;
                    break;
                case "email":
                    obj.email = value;
                    break;
                case "phoneNumber":
                    obj.phoneNumber = value;
                    break;
                case "imageUrl":
                    obj.imageUrl = value;
                    break;
                case "name":
                    obj.name = value;
                    break;
                case "search":
                    obj.search = value;
                    break;
                case "createdAfter":
                    obj.createdAfter = value;
                    break;
                case "createdBefore":
                    obj.createdBefore = value;
                    break;
                default:
                    break;
            }
        });
        return obj as UserQuery;
    }, [searchParams]);

    // Sync ref (does not trigger rerender)
    queryRef.current = { ...queryRef.current, ...derivedParams };

    async function fetchUsers(
        signal: GenericAbortSignal
    ): Promise<UserPayload> {
        const qs = searchParams.toString(); // current query string from URL
        const url = "/users" + (qs ? `?${qs}` : "");
        const { data: payload } = await api.get<UserPayload>(url, { signal });
        // Update ref with pagination meta (non-reactive)
        queryRef.current.limit = payload.pagination.limit;
        queryRef.current.page = payload.pagination.page;
        queryRef.current.totalPages = payload.pagination.totalPage;
        return payload;
    }

    // react-query key depends on stringified params (stable primitive)
    const {
        data: payload,
        isPending,
        isError,
        error,
    } = useQuery<UserPayload>({
        queryKey: ["users", searchParams.toString()],
        queryFn: ({ signal }) => fetchUsers(signal),
        staleTime: 5000,
    });

    const queryClient = useQueryClient();

    const [mutatingId, setMutatingId] = useState<string | null>(null);

    const toggleRole = useMutation({
        mutationFn: async ({
            id,
            nextRole,
        }: {
            id: string;
            nextRole: string;
        }) => {
            setMutatingId(id);
            const { data } = await api.patch<User>(`/users/${id}`, {
                role: nextRole,
            });
            return data;
        },
        onSettled: () => {
            setMutatingId(null);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const userHeaders: TableHeader<User>[] = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Phone", key: "phoneNumber" },
        {
            name: "Role",
            key: "role",
            render: (row: User) => {
                const nextRole = row.role === "admin" ? "user" : "admin";
                const isUpdating =
                    toggleRole.isPending && mutatingId === row.id;
                const isAdmin = row.role === "admin";
                const btnClass = `btn btn-sm ${
                    isAdmin ? "theme-btn-secondary" : "theme-btn-primary"
                }`;
                return (
                    <button
                        type="button"
                        className={btnClass}
                        disabled={isUpdating}
                        onClick={() =>
                            toggleRole.mutate({ id: row.id, nextRole })
                        }
                        aria-label={`${isAdmin ? "Revoke" : "Make"} admin for ${
                            row.name
                        }`}
                    >
                        {isUpdating
                            ? "Updating..."
                            : isAdmin
                            ? "Revoke Admin"
                            : "Make Admin"}
                    </button>
                );
            },
        },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
    ];

    // QueryBuilder fields config
    const fields: QueryField[] = useMemo(
        () => [
            {
                name: "search",
                label: "Search",
                type: "string",
                placeholder: "Name / Email",
            },
            {
                name: "role",
                label: "Role",
                type: "enum",
                options: [
                    { label: "Any", value: "" },
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                ],
            },
            {
                name: "phoneNumber",
                label: "phone number",
                type: "number",
                helpText: "User's phone number",
            },
            {
                name: "createdAfter",
                label: "Created After",
                type: "date",
            },
            {
                name: "createdBefore",
                label: "Created Before",
                type: "date",
            },
        ],
        []
    );

    const applyFilters = useCallback(
        (vals: Record<string, unknown>) => {
            const cleaned: Record<string, string> = {};
            Object.entries(vals).forEach(([k, v]) => {
                if (v === "" || v === undefined || v === null) return;
                cleaned[k] = String(v);
            });
            // Reset page when filters change
            delete cleaned.page;
            setSearchParams(cleaned);
        },
        [setSearchParams]
    );

    if (isPending) {
        return <span className="align-self-center m-auto">loading...</span>;
    }

    if (isError) {
        return (
            <div className="alert alert-danger" role="alert">
                Failed to load users:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    return (
        <div className="d-flex flex-row w-100 h-100">
            <QueryBuilder
                fields={fields}
                onSubmit={applyFilters}
                initialValues={queryRef.current} // uses ref (latest values)
                width={260}
                title="User Filters"
            />
            <div className="flex-grow-1 p-3 overflow-auto d-flex justify-content-between">
                <Table<User>
                    data={(payload as UserPayload).data}
                    tableHeaders={userHeaders}
                    caption="Table of Users"
                    className="w-100"
                    emptyElement={
                        <tr>
                            <td
                                colSpan={userHeaders.length + 1}
                                className="text-center"
                            >
                                No users found
                            </td>
                        </tr>
                    }
                    index
                />
                <Pagination
                    count={payload.pagination.totalPage}
                    index={payload.pagination.page}
                    handleChange={(pageNumber) => {
                        // Update URL param without causing state variable changes
                        const next = new URLSearchParams(
                            searchParams.toString()
                        );
                        if (pageNumber <= 1) {
                            next.delete("page"); // keep URL clean
                        } else {
                            next.set("page", String(pageNumber));
                        }
                        setSearchParams(next);
                        queryRef.current.page = pageNumber; // update ref
                    }}
                />
            </div>
        </div>
    );
}

// Removed constructPath (not needed with setSearchParams)
