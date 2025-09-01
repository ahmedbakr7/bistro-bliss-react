import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";
import api from "../../services/api";
import type { GenericAbortSignal } from "axios";

export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    // Added index signature to satisfy Record constraint in Table
    [key: string]: unknown;
}

async function fetchUsers(
    query: string,
    signal: GenericAbortSignal
): Promise<User[]> {
    const { data } = await api.get<User[]>("/users", { signal });
    return data; // data is User[]
}

export default function Users(): ReactElement {
    const query = "query";
    const { data, isPending, isError, error } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: ({ signal, queryKey }) => fetchUsers(query, signal),
        staleTime: 5000,
    });

    // Define table headers for the User table
    const userHeaders: TableHeader<User>[] = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Phone", key: "phoneNumber" },
        { name: "Role", key: "role" },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
    ];

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
        <Table<User>
            data={data}
            tableHeaders={userHeaders}
            caption="Table of Users"
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
    );
}
