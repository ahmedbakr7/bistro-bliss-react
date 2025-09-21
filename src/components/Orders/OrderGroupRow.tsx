import React, { useMemo } from "react";
import OrderItemRow from "./OrderItemRow";
import OrderSummary from "./OrderSummary";
import type { Order } from "../../services/ordersApi";
import type { DetailRow } from "./types";

export type OrderGroup = { order: Order; details: DetailRow[] };

export type OrderGroupRowProps = {
    group: OrderGroup;
    rowIndex: number;
};

const OrderGroupRow: React.FC<OrderGroupRowProps> = ({ group, rowIndex }) => {
    const { order, details } = group;

    const subtotal = useMemo(
        () =>
            details.reduce(
                (s, d) => s + (d.price_snapshot ?? 0) * d.quantity,
                0
            ),
        [details]
    );

    const containerClass = rowIndex > 0 ? "pt-2 pb-3" : "py-3";

    return (
        <div className={containerClass}>
            <div className="row g-4 mx-0">
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-end">
                        <h6 className="mb-0">Product name</h6>
                        <h6 className="mb-0">Unit price</h6>
                        <h6 className="mb-0">Quantity</h6>
                    </div>
                    {rowIndex === 0 && <hr className="mt-2 mb-3" />}
                    {details.map((d) => (
                        <OrderItemRow key={d.id} item={d} />
                    ))}
                </div>
                <div className="col-lg-4">
                    <OrderSummary subtotal={subtotal} status={order.status} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(OrderGroupRow);
