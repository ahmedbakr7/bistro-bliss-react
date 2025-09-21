import React from "react";

export type OrderSummaryProps = {
    subtotal: number;
    shipping?: number;
    status?: string | null;
};

const DEFAULT_SHIPPING = 15;

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shipping = DEFAULT_SHIPPING,
    status,
}) => {
    const total = subtotal + shipping;

    return (
        <div className="border rounded p-4 ">
            <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-success-subtle border border-success text-success">
                    ✓
                </span>
                <h5 className="m-0">Order Confirmed</h5>
            </div>
            <p className="text-muted mb-4">we hope you enjoy your food</p>

            <div className="d-flex justify-content-between mb-2">
                <span>Subtotal :</span>
                <span>{`$${subtotal.toFixed(2)}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span>Shipping :</span>
                <span>{`$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
                <strong>Total :</strong>
                <strong>{`$${total.toFixed(2)}`}</strong>
            </div>

            <div className="mt-4">
                <div className="mb-2 text-capitalize">
                    <small className="text-muted">status</small>
                    <div>{status ?? "pending"}</div>
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
                    ></span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(OrderSummary);
