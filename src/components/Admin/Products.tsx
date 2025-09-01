import type { GenericAbortSignal } from "axios";
import api from "../../services/api";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "../Table/Table";
import type { TableHeader } from "../Table/Table";

export interface Product {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [key: string]: unknown; // satisfy Record constraint
}

async function fetchProducts(
    query: string,
    signal: GenericAbortSignal
): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products", { signal });
    return data;
}

export default function Products(): ReactElement {
    const query = "query";
    const { data, isPending, isError, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: ({ signal, queryKey }) => fetchProducts(query, signal),
        staleTime: 5000,
    });

    const productHeaders: TableHeader<Product>[] = [
        { name: "Name", key: "name" },
        { name: "Description", key: "description" },
        { name: "Image URL", key: "imageUrl" },
        { name: "Price", key: "price" },
        { name: "Created", key: "createdAt" },
        { name: "Updated", key: "updatedAt" },
    ];

    if (isPending) {
        return <span className="align-self-center m-auto">loading...</span>;
    }

    if (isError) {
        return (
            <div className="alert alert-danger" role="alert">
                Failed to load products:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    return (
        <Table<Product>
            data={data ?? []}
            tableHeaders={productHeaders}
            caption="Table of Products"
            emptyElement={
                <tr>
                    <td
                        colSpan={productHeaders.length + 1}
                        className="text-center"
                    >
                        No products found
                    </td>
                </tr>
            }
            index
        />
    );
}
