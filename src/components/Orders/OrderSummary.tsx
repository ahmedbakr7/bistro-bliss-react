import React, { useState } from "react";
import type { OrderStatus } from "../../services/ordersApi";

export type OrderSummaryProps = {
    subtotal: number;
    shipping?: number;
    status?: OrderStatus | null;
    // when used inside admin views
    isAdmin?: boolean;
    onUpdateStatus?: (
        next: OrderStatus,
        options?: { etaMinutes?: number; acceptedAt?: string; receivedAt?: string; deliveredAt?: string }
    ) => void;
    isUpdating?: boolean;
    onDelete?: () => void;
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
    isAdmin = false,
    onUpdateStatus,
    isUpdating = false,
    onDelete,
}) => {
    const total = subtotal + shipping;

    // Admin controls
    const [hrs, setHrs] = useState<string>("");
    const [mins, setMins] = useState<string>("");

    function parseEta(): number | undefined {
        const h = Number(hrs) || 0;
        const m = Number(mins) || 0;
        const totalMins = h * 60 + m;
        return totalMins > 0 ? totalMins : undefined;
    }

    function buildTimestampsFromEta(etaMinutes?: number) {
        const now = new Date();
        const acceptedAt = now.toISOString();
        const receivedAt = etaMinutes
            ? new Date(now.getTime() + etaMinutes * 60000).toISOString()
            : undefined;
        return { acceptedAt, receivedAt };
    }

    const renderAdminControls = () => {
        const s = (status ?? "DRAFT") as OrderStatus;
        if (s === "CREATED") {
            const eta = parseEta();
            const disableAccept = !eta || isUpdating;
            return (
                <div className="d-flex flex-column gap-2" aria-live="polite">
                    <div className="d-flex flex-column gap-2">
                        <button
                            type="button"
                            className="btn btn-success rounded-pill"
                            onClick={() => {
                                const etaMins = parseEta();
                                const { acceptedAt, receivedAt } =
                                    buildTimestampsFromEta(etaMins);
                                onUpdateStatus?.("PREPARING", {
                                    etaMinutes: etaMins,
                                    acceptedAt,
                                    receivedAt,
                                });
                            }}
                            aria-label="Accept order"
                            disabled={disableAccept}
                        >
                            {isUpdating ? "Updating..." : "Accept Order"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger rounded-pill"
                            onClick={() => onDelete?.()}
                            aria-label="Cancel order"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Cancel Order"}
                        </button>
                    </div>

                    <div className="d-flex justify-content-center gap-4 align-items-end">
                        <div className="text-center">
                            <label className="form-label mb-1" htmlFor="etaHrs">
                                hrs
                            </label>
                            <input
                                id="etaHrs"
                                type="number"
                                min={0}
                                className="form-control form-control-sm text-center"
                                style={{ width: 70 }}
                                value={hrs}
                                onChange={(e) => setHrs((e.target as HTMLInputElement).value)}
                                inputMode="numeric"
                                aria-label="Estimated hours"
                                disabled={isUpdating}
                            />
                        </div>
                        <div className="text-center">
                            <label className="form-label mb-1" htmlFor="etaMins">
                                mins
                            </label>
                            <input
                                id="etaMins"
                                type="number"
                                min={0}
                                max={59}
                                className="form-control form-control-sm text-center"
                                style={{ width: 70 }}
                                value={mins}
                                onChange={(e) => setMins((e.target as HTMLInputElement).value)}
                                inputMode="numeric"
                                aria-label="Estimated minutes"
                                disabled={isUpdating}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        if (s === "PREPARING") {
            return (
                <div className="d-flex flex-column gap-2" aria-live="polite">
                    <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        onClick={() => onUpdateStatus?.("DELIVERING")}
                        aria-label="Mark as delivering"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Start Delivery"}
                    </button>
                </div>
            );
        }
        return null;
    };

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
                {isAdmin ? (
                    renderAdminControls()
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(OrderSummary);

