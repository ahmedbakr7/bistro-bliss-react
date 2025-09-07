import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useMemo, useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { GenericAbortSignal } from "axios";
import api from "../../services/api";
import QueryBuilder from "../QueryBuilder/QueryBuilder";
import type { QueryField } from "../QueryBuilder/types";
import Pagination from "../Pagination";
import GridContainer from "../GridContainer";
import Card from "../Card/Card";
import ProductForm from "./ProductForm";

export interface Product {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    price: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string | null;
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
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState(false);

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

    queryRef.current = { ...queryRef.current, ...derivedParams };

    const queryClient = useQueryClient();

    // Fetcher
    async function fetchProducts(
        signal: GenericAbortSignal
    ): Promise<ProductPayload> {
        const qs = searchParams.toString();
        const url = "/products" + (qs ? `?${qs}` : "");
        const { data: payload } = await api.get<ProductPayload>(url, {
            signal,
        });
        // update ref with returned pagination meta
        queryRef.current.limit = payload.pagination.limit;
        queryRef.current.page = payload.pagination.page;
        queryRef.current.totalPages = payload.pagination.totalPage;
        return payload;
    }

    // Query
    const {
        data: payload,
        isPending,
        isError,
        error,
    } = useQuery<ProductPayload>({
        queryKey: ["products", searchParams.toString()],
        queryFn: ({ signal }) => fetchProducts(signal as GenericAbortSignal),
        staleTime: 5000,
    });

    // Mutations
    const createOrUpdate = useMutation({
        mutationFn: async (product: Product) => {
            if (product.id) {
                await api.put(`/products/${product.id}`, product);
            } else {
                await api.post(`/products`, product);
            }
            return product;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const deleteProduct = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/products/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    // Filter Fields
    const fields: QueryField[] = useMemo(
        () => [
            {
                name: "search",
                label: "Search",
                type: "string",
                placeholder: "Name / Description",
            },
            { name: "minPrice", label: "Min Price", type: "number" },
            { name: "maxPrice", label: "Max Price", type: "number" },
            { name: "createdAfter", label: "Created After", type: "date" },
            { name: "createdBefore", label: "Created Before", type: "date" },
        ],
        []
    );

    // Apply filters -> URLSearchParams
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

    // Handlers
    function handleEdit(p: Product) {
        setEditingProduct(p);
        setShowForm(true);
    }

    function handleCreate() {
        setEditingProduct(null);
        setShowForm(true);
    }

    function handleDelete(id: string) {
        if (!confirm("Delete this product?")) return;
        deleteProduct.mutate(id);
    }

    function handleSaved(saved: Product) {
        createOrUpdate.mutate(saved);
        setShowForm(false);
    }

    // Loading / Error states
    if (isPending) {
        return <span className="align-self-center m-auto">Loading...</span>;
    }

    if (isError) {
        console.log(`error: ${error}`);
        return (
            <div className="alert alert-danger m-3" role="alert">
                Failed to load products:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    const products = (payload as ProductPayload | undefined)?.data ?? [];

    return (
        <div className="d-flex flex-row w-100 h-100">
            {/* Filters Sidebar */}
            <div style={{ width: 260 }} className="border-end bg-body-tertiary">
                <QueryBuilder
                    fields={fields}
                    onSubmit={applyFilters}
                    className="p-4"
                    initialValues={queryRef.current}
                    width={260}
                    title="Product Filters"
                />
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4 d-flex flex-column gap-3 overflow-auto">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <h4 className="m-0">Products</h4>
                    <button
                        type="button"
                        className="btn theme-btn-primary btn-sm px-3 py-2"
                        onClick={handleCreate}
                    >
                        New Product
                    </button>
                </div>

                {showForm && (
                    <div className="card border-0 shadow-sm p-3">
                        <ProductForm
                            product={editingProduct}
                            onSuccess={handleSaved}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                )}

                {products.length === 0 && (
                    <div className="text-muted small py-5 text-center w-100">
                        No products found
                    </div>
                )}

                {products.length > 0 && (
                    <GridContainer
                        numberOfColumns={4}
                        spacing={4}
                        className="text-center"
                    >
                        {products.map((p) => (
                            <Card
                                key={p.id}
                                className="border-0 shadow-sm h-100 rounded-4 position-relative overflow-hidden"
                                style={{
                                    transition:
                                        "box-shadow .3s ease, transform .3s ease",
                                }}
                                onMouseEnter={(e: unknown) => {
                                    const el = e as unknown as {
                                        currentTarget: HTMLElement;
                                    };
                                    el.currentTarget.style.transform =
                                        "translateY(-3px)";
                                    el.currentTarget.style.boxShadow =
                                        "0 4px 10px -2px rgba(0,0,0,0.12),0 8px 22px -4px rgba(0,0,0,0.10)";
                                }}
                                onMouseLeave={(e: unknown) => {
                                    const el = e as unknown as {
                                        currentTarget: HTMLElement;
                                    };
                                    el.currentTarget.style.transform = "";
                                    el.currentTarget.style.boxShadow = "";
                                }}
                            >
                                <div className="position-relative">
                                    <div className="ratio ratio-4x3 overflow-hidden bg-light rounded-top-4">
                                        <Card.Image
                                            src={
                                                p.imageUrl ??
                                                "/images/placeholder_image.png"
                                            }
                                            alt={p.name}
                                            className="object-fit-cover"
                                            style={{
                                                transition:
                                                    "transform .4s ease",
                                            }}
                                            onMouseEnter={(
                                                e: React.MouseEvent<HTMLElement>
                                            ) => {
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.transform =
                                                    "scale(1.04)";
                                            }}
                                            onMouseLeave={(
                                                e: React.MouseEvent<HTMLElement>
                                            ) => {
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.transform = "";
                                            }}
                                        />
                                        {/* ACTION OVERLAY */}
                                        <div
                                            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-2"
                                            style={{
                                                background:
                                                    "linear-gradient(to bottom,rgba(0,0,0,.25),rgba(0,0,0,.65))",
                                                color: "#fff",
                                                opacity: 0,
                                                transform: "translateY(6%)",
                                                transition:
                                                    "opacity .35s ease, transform .4s ease",
                                            }}
                                            onMouseEnter={(
                                                e: React.MouseEvent<HTMLElement>
                                            ) => {
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.opacity = "1";
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.transform =
                                                    "translateY(0)";
                                            }}
                                            onMouseLeave={(
                                                e: React.MouseEvent<HTMLElement>
                                            ) => {
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.opacity = "0";
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.transform =
                                                    "translateY(6%)";
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="btn theme-btn-secondary btn-sm px-3"
                                                onClick={() => handleEdit(p)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn theme-btn-primary btn-sm px-3"
                                                disabled={
                                                    deleteProduct.isPending &&
                                                    deleteProduct.variables ===
                                                        p.id
                                                }
                                                onClick={() =>
                                                    handleDelete(p.id)
                                                }
                                            >
                                                {deleteProduct.isPending &&
                                                deleteProduct.variables === p.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                    {/* PRICE BADGE */}
                                    <div
                                        className="position-absolute top-0 start-0 ms-2 mt-2 small fw-semibold text-uppercase px-2 py-1 rounded-pill"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,var(--theme-primary,#ff7a18),var(--theme-primary-accent,#ff3d81))",
                                            color: "#fff",
                                            letterSpacing: ".5px",
                                            boxShadow:
                                                "0 2px 6px -2px rgba(0,0,0,.25)",
                                            zIndex: 2,
                                        }}
                                    >
                                        ${p.price.toFixed(2)}
                                    </div>
                                </div>
                                <Card.Body
                                    className="text-start"
                                    title={
                                        <span
                                            className="fw-semibold"
                                            style={{
                                                fontSize: ".95rem",
                                                letterSpacing: ".3px",
                                            }}
                                        >
                                            {p.name}
                                        </span>
                                    }
                                    subtitle={
                                        <span
                                            style={{
                                                fontSize: ".7rem",
                                                fontWeight: 500,
                                                letterSpacing: ".3px",
                                                color: "var(--bs-secondary-color, #6c757d)",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                lineClamp: 2,
                                                WebkitBoxOrient:
                                                    "vertical" as const,
                                                overflow: "hidden",
                                                minHeight: "2.1em",
                                            }}
                                        >
                                            {(p.description ?? "").slice(
                                                0,
                                                120
                                            )}
                                        </span>
                                    }
                                    style={{ padding: ".75rem .9rem 1rem" }}
                                />
                            </Card>
                        ))}
                    </GridContainer>
                )}

                {payload && payload.pagination.totalPage > 1 && (
                    <div className="align-self-center">
                        <Pagination
                            count={payload.pagination.totalPage}
                            index={payload.pagination.page}
                            handleChange={(pageNumber: number) => {
                                const next = new URLSearchParams(
                                    searchParams.toString()
                                );
                                if (pageNumber <= 1) {
                                    next.delete("page");
                                } else {
                                    next.set("page", String(pageNumber));
                                }
                                queryRef.current.page = pageNumber; // keep ref in sync
                                setSearchParams(next);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
