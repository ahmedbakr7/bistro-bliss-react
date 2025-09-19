import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { paths } from "../../utils/routes/routePaths";
import Table, { type TableHeader } from "../../components/Table/Table";
import { useMemo } from "react";
// Removed useMutation/useQueryClient and direct cartApi imports; use useCart actions

// Extend CartProductLine with an index signature to satisfy Table's constraint
import type { CartProductLine } from "../../services/cartApi";

type CartItemRow = CartProductLine & { [key: string]: unknown };

export default function CartPage() {
    const {
        data: cartPayload,
        isLoading,
        increment,
        remove,
        clear,
        checkout,
    } = useCart();

    const cartItems = useMemo(
        () => cartPayload?.items ?? [],
        [cartPayload?.items]
    );

    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const priceRaw = item.price ?? item.product?.price ?? 0;
            const price =
                typeof priceRaw === "string"
                    ? Number(priceRaw)
                    : Number(priceRaw ?? 0);
            const qty = Number(item.quantity ?? 0);
            return sum + price * qty;
        }, 0);
    }, [cartItems]);

    const getUnitPrice = (row: CartItemRow): number => {
        const priceRaw = row.price ?? row.product?.price ?? 0;
        return typeof priceRaw === "string"
            ? Number(priceRaw)
            : Number(priceRaw ?? 0);
    };

    const tableHeaders: TableHeader<CartItemRow>[] = [
        {
            name: "Product",
            key: "name",
            render: (row) => {
                const imgSrc = [
                    row.imageUrl,
                    (row as CartProductLine).photo,
                    row.product?.imageUrl,
                    row.product?.photo,
                ].find(
                    (v): v is string => typeof v === "string" && v.length > 0
                );
                const title =
                    (typeof row.name === "string" && row.name) ||
                    (typeof row.product?.name === "string" &&
                        row.product.name) ||
                    `#${String(row.productId ?? "")}`;
                const fallback = "/images/placeholder_image.png";
                return (
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={imgSrc || fallback}
                            alt={title}
                            width={48}
                            height={48}
                            className="rounded object-fit-cover"
                            onError={(e) => {
                                const img = e.currentTarget;
                                if (
                                    !img.src.endsWith("placeholder_image.png")
                                ) {
                                    img.src = fallback;
                                }
                            }}
                        />
                        <span>{title}</span>
                    </div>
                );
            },
        },
        {
            name: "Unit Price",
            key: "price",
            render: (row) => (
                <span>
                    {getUnitPrice(row).toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                    })}
                </span>
            ),
        },
        {
            name: "Quantity",
            key: "quantity",
            render: (row) => (
                <div className="d-flex align-items-center gap-2">
                    <button
                        aria-label="Decrease"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                            const q = Number(row.quantity ?? 0);
                            if (q <= 1) {
                                remove.mutate(row.productId as string);
                            } else {
                                increment(row.productId as string, -1);
                            }
                        }}
                    >
                        −
                    </button>
                    <span
                        className="min-w-2 text-center"
                        style={{ minWidth: 24 }}
                    >
                        {row.quantity}
                    </span>
                    <button
                        aria-label="Increase"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increment(row.productId as string, 1)}
                    >
                        +
                    </button>
                </div>
            ),
        },
    ];

    const isEmpty = (cartItems?.length ?? 0) === 0;

    return (
        <section className="container py-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                    <FiShoppingCart size={60} />
                    <h2 className="m-0 ms-3">Your Cart</h2>
                </div>
            </div>

            {isLoading ? (
                <p>Loading cart...</p>
            ) : isEmpty ? (
                <div className="text-center py-5">
                    <p className="mb-3">Your cart is empty.</p>
                    <Link to={paths.menu} className="btn theme-btn-primary">
                        Browse menu
                    </Link>
                </div>
            ) : (
                <>
                    <Table<CartItemRow>
                        tableHeaders={tableHeaders}
                        data={cartItems as CartItemRow[]}
                        tableClassName="align-middle"
                    />
                    <div className="d-flex align-items-center justify-content-end gap-3 mt-3">
                        <span className="fw-semibold">
                            Total:{" "}
                            {total.toLocaleString(undefined, {
                                style: "currency",
                                currency: "USD",
                            })}
                        </span>
                        <button
                            className="btn btn-outline-secondary theme-btn-secondary"
                            onClick={() => clear.mutate()}
                            disabled={clear.isPending}
                        >
                            {clear.isPending ? "Clearing..." : "Clear cart"}
                        </button>
                        <button
                            className="btn theme-btn-primary"
                            onClick={() => checkout.mutate()}
                            disabled={checkout.isPending}
                        >
                            {checkout.isPending ? "Processing..." : "Checkout"}
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
