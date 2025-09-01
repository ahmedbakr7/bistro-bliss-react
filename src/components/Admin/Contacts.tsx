import type { GenericAbortSignal } from "axios";
import api from "../../services/api";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    [key: string]: unknown; // satisfy Record constraint
}

async function fetchContactMessages(
    signal: GenericAbortSignal
): Promise<ContactMessage[]> {
    const { data } = await api.get<ContactMessage[]>("/contacts", { signal });
    return data;
}

export default function Contacts(): ReactElement {
    const { data, isPending, isError, error } = useQuery<ContactMessage[]>({
        queryKey: ["contacts"],
        queryFn: ({ signal }) => fetchContactMessages(signal),
        staleTime: 5000,
    });

    const contactHeaders: TableHeader<ContactMessage>[] = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Subject", key: "subject" },
        { name: "Message", key: "message" },
        { name: "Created", key: "createdAt" },
    ];

    if (isPending) {
        return <span className="align-self-center m-auto">loading...</span>;
    }

    if (isError) {
        return (
            <div className="alert alert-danger" role="alert">
                Failed to load contact messages:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    return (
        <section>
            <h1>Manage Contact Messages</h1>
            <p>Contacts management dashboard placeholder.</p>
            <Table<ContactMessage>
                data={data ?? []}
                tableHeaders={contactHeaders}
                caption="Table of Contact Messages"
                emptyElement={
                    <tr>
                        <td
                            colSpan={contactHeaders.length + 1}
                            className="text-center"
                        >
                            No messages found
                        </td>
                    </tr>
                }
                index
            />
        </section>
    );
}
