import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { paths } from "../../utils/routes/routePaths";
import Table, { type TableHeader } from "../../components/Table/Table";
import type { CartItem } from "../../services/cartApi";

// Extend CartItem with an index signature to satisfy Table's constraint
type CartItemRow = CartItem & { [key: string]: unknown };

export default function CartPage() {
    const { data: cartItems, isLoading } = useCart();

    const tableHeaders: TableHeader<CartItemRow>[] = [
        {
            name: "Product",
            key: "productId",
            render: (_row, value) => <>#{String(value)}</>,
        },
        { name: "Quantity", key: "quantity" },
    ];

    return (
        <section className="container py-5">
            <div className="d-flex align-items-center gap-2 mb-4">
                <FiShoppingCart size={22} />
                <h2 className="m-0">Your Cart</h2>
            </div>

            {isLoading ? (
                <p>Loading cart...</p>
            ) : (cartItems?.length ?? 0) === 0 ? (
                <div className="text-center py-5">
                    <p className="mb-3">Your cart is empty.</p>
                    <Link to={paths.menu} className="theme-btn-primary">
                        Browse menu
                    </Link>
                </div>
            ) : (
                <Table<CartItemRow>
                    tableHeaders={tableHeaders}
                    data={(cartItems ?? []) as CartItemRow[]}
                    index
                />
            )}
        </section>
    );
}
