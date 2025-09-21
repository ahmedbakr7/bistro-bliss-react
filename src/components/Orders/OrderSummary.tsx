import React from "react";
import type { OrderStatus } from "../../services/ordersApi";

export type OrderSummaryProps = {
    subtotal: number;
    shipping?: number;
    status?: OrderStatus | null;
};

const DEFAULT_SHIPPING = 15;

const statusBadge = (status?: OrderStatus | null) => {
    const map: Record<OrderStatus, { label: string; className: string }> = {
        DRAFT: {
            label: "Draft",
            className: "badge bg-secondary-subtle text-secondary-emphasis",
        },
        CREATED: {
            label: "Created",
            className: "badge bg-primary-subtle text-primary-emphasis",
        },
        PREPARING: {
            label: "Preparing",
            className: "badge bg-warning-subtle text-warning-emphasis",
        },
        READY: {
            label: "Ready",
            className: "badge bg-info-subtle text-info-emphasis",
        },
        DELIVERING: {
            label: "Delivering",
            className: "badge bg-primary-subtle text-primary-emphasis",
        },
        RECEIVED: {
            label: "Received",
            className: "badge bg-success-subtle text-success-emphasis",
        },
        CANCELED: {
            label: "Canceled",
            className: "badge bg-danger-subtle text-danger-emphasis",
        },
        FAVOURITES: {
            label: "Favourites",
            className: "badge bg-dark-subtle text-dark-emphasis",
        },
    };

    const key = (status ?? "DRAFT") as OrderStatus;
    const meta = map[key] ?? {
        label: String(status ?? "Unknown"),
        className: "badge bg-secondary",
    };
    return <span className={meta.className}>{meta.label}</span>;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shipping = DEFAULT_SHIPPING,
    status,
}) => {
    const total = subtotal + shipping;

    return (
        <div className="border rounded p-4 ">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="m-0">Order Summary</h5>
                <div aria-live="polite" aria-atomic="true">
                    {statusBadge(status)}
                </div>
            </div>
            <p className="text-muted mb-4">we hope you enjoy your food</p>

            <div className="d-flex justify-content-between mb-2">
                <span>Subtotal :</span>
                <span aria-label={`Subtotal $${subtotal.toFixed(2)}`}>
                    {`$${subtotal.toFixed(2)}`}
                </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span>Shipping :</span>
                <span aria-label={`Shipping $${shipping.toFixed(2)}`}>
                    {`$${shipping.toFixed(2)}`}
                </span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
                <strong>Total :</strong>
                <strong aria-label={`Total $${total.toFixed(2)}`}>
                    {`$${total.toFixed(2)}`}
                </strong>
            </div>

            <div className="mt-4">
                <div className="mb-2 text-capitalize" aria-live="polite">
                    <small className="text-muted">Status</small>
                    <div>{statusBadge(status)}</div>
                </div>
                <div className="mb-3">
                    <small className="text-muted">
                        Order will be delivered soon
                    </small>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">
                        <small>Created</small>
                    </span>
                    <span
                        className="rounded-circle bg-danger"
                        style={{
                            width: 24,
                            height: 24,
                            display: "inline-block",
                        }}
                        aria-hidden="true"
                    ></span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(OrderSummary);
