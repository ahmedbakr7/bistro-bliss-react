import React from "react";
import type { OrderStatus, Order } from "../../services/ordersApi";
import OrderProgressBar from "./OrderProgressBar";

const STATUS_META: Record<OrderStatus, { label: string; className: string }> = {
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

/**
 * Renders a status badge for a given status.
 */
const StatusBadge: React.FC<{ status?: OrderStatus | null }> = ({ status }) => {
    const key = (status ?? "DRAFT") as OrderStatus;
    const meta = STATUS_META[key] ?? {
        label: String(status ?? "Unknown"),
        className: "badge bg-secondary",
    };
    return <span className={meta.className}>{meta.label}</span>;
};

// ---------------------------------------------
// Admin controls (isolated for clarity)
// ---------------------------------------------

type AdminControlsProps = {
    status?: OrderStatus | null;
    isUpdating: boolean;
    onUpdateStatus?: (
        next: OrderStatus,
        options?: {
            etaMinutes?: number;
            acceptedAt?: string;
            receivedAt?: string;
            deliveredAt?: string;
        }
    ) => void;
    onDelete?: () => void;
};

/**
 * Utility: build accepted & received timestamps based on ETA minutes.
 */
function buildTimestampsFromEta(etaMinutes?: number) {
    const now = new Date();
    const acceptedAt = now.toISOString();
    // deliveredAt represents the ETA (future scheduled time)
    const deliveredAt = etaMinutes
        ? new Date(now.getTime() + etaMinutes * 60000).toISOString()
        : undefined;
    return { acceptedAt, deliveredAt };
}

/**
 * Admin-only component for manipulating order state.
 * Keeps its own local ETA state to avoid clutter in parent component.
 */
const AdminControls: React.FC<AdminControlsProps> = ({
    status,
    isUpdating,
    onUpdateStatus,
    onDelete,
}) => {
    const s = (status ?? "DRAFT") as OrderStatus;

    // ETA local state (hours & minutes)
    const [hrs, setHrs] = React.useState("");
    const [mins, setMins] = React.useState("");

    const parseEta = React.useCallback((): number | undefined => {
        const h = Number(hrs) || 0;
        const m = Number(mins) || 0;
        const totalMins = h * 60 + m;
        return totalMins > 0 ? totalMins : undefined;
    }, [hrs, mins]);

    // Render different actions depending on current status
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
                            const { acceptedAt, deliveredAt } =
                                buildTimestampsFromEta(etaMins);
                            onUpdateStatus?.("PREPARING", {
                                etaMinutes: etaMins,
                                acceptedAt,
                                deliveredAt,
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
                            onChange={(e) =>
                                setHrs((e.target as HTMLInputElement).value)
                            }
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
                            onChange={(e) =>
                                setMins((e.target as HTMLInputElement).value)
                            }
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

    // New: When delivering, allow completion
    if (s === "DELIVERING") {
        return (
            <div className="d-flex flex-column gap-2" aria-live="polite">
                <button
                    type="button"
                    className="btn btn-success rounded-pill"
                    onClick={() =>
                        onUpdateStatus?.("RECEIVED", {
                            receivedAt: new Date().toISOString(),
                        })
                    }
                    aria-label="Complete delivery"
                    disabled={isUpdating}
                >
                    {isUpdating ? "Updating..." : "Complete Delivery"}
                </button>
            </div>
        );
    }

    return null;
};

// ---------------------------------------------
// Public component
// ---------------------------------------------

export type OrderSummaryProps = {
    subtotal: number;
    shipping?: number;
    status?: OrderStatus | null;
    // when used inside admin views
    isAdmin?: boolean;
    onUpdateStatus?: (
        next: OrderStatus,
        options?: {
            etaMinutes?: number;
            acceptedAt?: string;
            receivedAt?: string;
            deliveredAt?: string;
        }
    ) => void;
    isUpdating?: boolean;
    onDelete?: () => void;
    /** Custom currency formatter (defaults to USD style). */
    formatCurrency?: (amount: number) => string;
    /** Full order object for progress bar timeline */
    order?: Order;
};

const DEFAULT_SHIPPING = 15;

/** Default currency formatter */
const defaultFormatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shipping = DEFAULT_SHIPPING,
    status,
    isAdmin = false,
    onUpdateStatus,
    isUpdating = false,
    onDelete,
    formatCurrency = defaultFormatCurrency,
    order,
}) => {
    const total = subtotal + shipping;

    return (
        <div className="border rounded p-4 ">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="m-0">Order Summary</h5>
                <div aria-live="polite" aria-atomic="true">
                    <StatusBadge status={status} />
                </div>
            </div>
            <p className="text-muted mb-4">we hope you enjoy your food</p>

            <div className="d-flex justify-content-between mb-2">
                <span>Subtotal :</span>
                <span aria-label={`Subtotal ${formatCurrency(subtotal)}`}>
                    {formatCurrency(subtotal)}
                </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span>Shipping :</span>
                <span aria-label={`Shipping ${formatCurrency(shipping)}`}>
                    {formatCurrency(shipping)}
                </span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
                <strong>Total :</strong>
                <strong aria-label={`Total ${formatCurrency(total)}`}>
                    {formatCurrency(total)}
                </strong>
            </div>

            <div className="mt-4">
                <div className="mb-2 text-capitalize" aria-live="polite">
                    <small className="text-muted">Status</small>
                    <div>
                        <StatusBadge status={status} />
                    </div>
                </div>
                {isAdmin ? (
                    <AdminControls
                        status={status}
                        isUpdating={isUpdating}
                        onUpdateStatus={onUpdateStatus}
                        onDelete={onDelete}
                    />
                ) : (
                    <>
                        {order && <OrderProgressBar order={order} />}
                        <div className="mb-3">
                            <small className="text-muted">
                                {order?.deliveredAt
                                    ? "ETA displayed above"
                                    : "Order will be delivered soon"}
                            </small>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(OrderSummary);
