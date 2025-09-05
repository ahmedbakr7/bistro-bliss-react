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

export interface Product {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [key: string]: unknown; // satisfy Record constraint
}

export interface ProductPayload {
    data: Product[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
}

export type ProductQuery = {
    page?: number;
    totalPages?: number;
    limit?: number;
    sortBy?: "name" | "price" | "createdAt";
    sortOrder?: "asc" | "desc";
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    createdAfter?: string;
    createdBefore?: string;
};

export default function Products(): ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();

    // persistent ref (non-reactive) holding most recent query meta
    const queryRef = useRef<ProductQuery>({});

    // Derive params from URLSearchParams each render
    const derivedParams: ProductQuery = useMemo(() => {
        const obj: Partial<ProductQuery> = {};
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
                    obj.sortBy = value as ProductQuery["sortBy"];
                    break;
                case "sortOrder":
                    obj.sortOrder = value as ProductQuery["sortOrder"];
                    break;
                case "search":
                    obj.search = value;
                    break;
                case "minPrice":
                    obj.minPrice = Number(value);
                    break;
                case "maxPrice":
                    obj.maxPrice = Number(value);
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
        return obj as ProductQuery;
    }, [searchParams]);

    // sync ref with latest params (non-reactive update)
    queryRef.current = { ...queryRef.current, ...derivedParams };

    async function fetchProducts(signal: GenericAbortSignal): Promise<ProductPayload> {
        const qs = searchParams.toString();
        const url = "/products" + (qs ? `?${qs}` : "");
        const { data: payload } = await api.get<ProductPayload>(url, { signal });
        // update ref with returned pagination meta
        queryRef.current.limit = payload.pagination.limit;
        queryRef.current.page = payload.pagination.page;
        queryRef.current.totalPages = payload.pagination.totalPage;
        return payload;
    }

    const { data: payload, isPending, isError, error } = useQuery<ProductPayload>({
        queryKey: ["products", searchParams.toString()],
        queryFn: ({ signal }) => fetchProducts(signal),
        staleTime: 5000,
    });

    const productHeaders: TableHeader<Product>[] = [
        { name: "Name", key: "name" },
        { name: "Description", key: "description" },
        { name: "Price", key: "price" },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
    ];

    const fields: QueryField[] = useMemo(
        () => [
            {
                name: "search",
                label: "Search",
                type: "string",
                placeholder: "Name / Description",
            },
            {
                name: "minPrice",
                label: "Min Price",
                type: "number",
            },
            {
                name: "maxPrice",
                label: "Max Price",
                type: "number",
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
                Failed to load products: {error instanceof Error ? error.message : "Unknown error"}
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
                title="Product Filters"
            />
            <div className="flex-grow-1 p-3 overflow-auto d-flex justify-content-between">
                <Table<Product>
                    data={(payload as ProductPayload).data}
                    tableHeaders={productHeaders}
                    caption="Table of Products"
                    className="w-100"
                    emptyElement={
                        <tr>
                            <td colSpan={productHeaders.length + 1} className="text-center">
                                No products found
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
