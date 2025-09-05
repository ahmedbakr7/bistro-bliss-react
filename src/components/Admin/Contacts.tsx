import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { GenericAbortSignal } from "axios";
import api from "../../services/api";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";
import QueryBuilder from "../QueryBuilder/QueryBuilder";
import type { QueryField } from "../QueryBuilder/types";
import Pagination from "../Pagination";

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    [key: string]: unknown; // satisfy Record constraint
}

export interface ContactPayload {
    data: ContactMessage[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
}

export type ContactQuery = {
    page?: number;
    totalPages?: number;
    limit?: number;
    sortBy?: "createdAt" | "name";
    sortOrder?: "asc" | "desc";
    search?: string;
    email?: string;
    subject?: string;
    createdAfter?: string;
    createdBefore?: string;
};

export default function Contacts(): ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryRef = useRef<ContactQuery>({});

    const derivedParams: ContactQuery = useMemo(() => {
        const obj: Partial<ContactQuery> = {};
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
                    obj.sortBy = value as ContactQuery["sortBy"];
                    break;
                case "sortOrder":
                    obj.sortOrder = value as ContactQuery["sortOrder"];
                    break;
                case "search":
                    obj.search = value;
                    break;
                case "email":
                    obj.email = value;
                    break;
                case "subject":
                    obj.subject = value;
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
        return obj as ContactQuery;
    }, [searchParams]);

    queryRef.current = { ...queryRef.current, ...derivedParams };

    async function fetchContactMessages(
        signal: GenericAbortSignal
    ): Promise<ContactPayload> {
        const qs = searchParams.toString();
        const url = "/contacts" + (qs ? `?${qs}` : "");
        const { data: payload } = await api.get<ContactPayload>(url, { signal });
        queryRef.current.limit = payload.pagination.limit;
        queryRef.current.page = payload.pagination.page;
        queryRef.current.totalPages = payload.pagination.totalPage;
        return payload;
    }

    const { data: payload, isPending, isError, error } = useQuery<ContactPayload>({
        queryKey: ["contacts", searchParams.toString()],
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

    const fields: QueryField[] = useMemo(
        () => [
            {
                name: "search",
                label: "Search",
                type: "string",
                placeholder: "Name / Email / Subject / Message",
            },
            {
                name: "email",
                label: "Email",
                type: "string",
            },
            {
                name: "subject",
                label: "Subject",
                type: "string",
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
            delete cleaned.page; // reset page when filters change
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
                Failed to load contact messages:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    return (
        <div className="d-flex flex-row w-100 h-100">
            <QueryBuilder
                fields={fields}
                onSubmit={applyFilters}
                initialValues={queryRef.current}
                width={260}
                title="Contact Filters"
            />
            <div className="flex-grow-1 p-3 overflow-auto d-flex justify-content-between">
                <Table<ContactMessage>
                    data={(payload as ContactPayload).data}
                    tableHeaders={contactHeaders}
                    caption="Table of Contact Messages"
                    className="w-100"
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
                <Pagination
                    count={payload.pagination.totalPage}
                    index={payload.pagination.page}
                    handleChange={(pageNumber) => {
                        const next = new URLSearchParams(searchParams.toString());
                        if (pageNumber <= 1) {
                            next.delete("page");
                        } else {
                            next.set("page", String(pageNumber));
                        }
                        setSearchParams(next);
                        queryRef.current.page = pageNumber;
                    }}
                />
            </div>
        </div>
    );
}
