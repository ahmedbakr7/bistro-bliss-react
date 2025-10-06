import React, { useEffect, useMemo, useState, useCallback } from "react";
import type { Order } from "../../services/ordersApi";
import "./OrderProgressBar.css";

export interface OrderProgressBarProps {
    order: Order;
    /** If true show a compact version (future use) */
    compact?: boolean;
}

// Helper to parse ISO or Date into ms number safely
function toMs(d?: string | Date | null): number | undefined {
    if (!d) return undefined;
    try {
        return typeof d === "string" ? Date.parse(d) : d.getTime();
    } catch {
        return undefined;
    }
}

const OrderProgressBar: React.FC<OrderProgressBarProps> = ({ order }) => {
    const nowMs = Date.now();
    const [tick, setTick] = useState(nowMs);
    // Capture status for logic
    const status = order.status; // OrderStatus

    // live update every 30s while we are between accepted and ETA
    useEffect(() => {
        const id = setInterval(() => setTick(Date.now()), 30000);
        return () => clearInterval(id);
    }, []);

    const createdAt = toMs(order.createdAt);
    const acceptedAt = toMs(order.acceptedAt);
    const etaAt = toMs(order.deliveredAt); // ETA target
    const receivedAt = toMs(order.receivedAt);

    // Timeline end is ETA while in transit, else received if completed, else ETA if future, else accepted
    const timelineEnd =
        receivedAt || etaAt || acceptedAt || createdAt || Date.now();
    const timelineStart =
        createdAt || acceptedAt || etaAt || receivedAt || Date.now();
    const span =
        timelineEnd && timelineStart
            ? Math.max(1, timelineEnd - timelineStart)
            : 1;

    // Helper to convert a timestamp to a 0-100 percentage along the bar
    const pct = useCallback(
        (ts?: number): number => {
            if (!ts || !timelineStart) return 0;
            return Math.min(
                100,
                Math.max(0, ((ts - timelineStart) / span) * 100)
            );
        },
        [timelineStart, span]
    );

    // Progress fill percent rules now depend on status:
    // - Before accepted: 0
    // - PREPARING (accepted but not delivering): fill up to Accepted marker only
    // - DELIVERING: animate between Accepted and ETA
    // - RECEIVED: 100
    const { percent, inTransit } = useMemo(() => {
        if (!acceptedAt) return { percent: 0, inTransit: false };
        if (receivedAt) return { percent: 100, inTransit: false };
        if (status === "DELIVERING" && etaAt) {
            const prog = pct(Math.min(tick, etaAt));
            return { percent: prog, inTransit: true };
        }
        if (etaAt) {
            // Accepted but still preparing: freeze at accepted position
            return { percent: pct(acceptedAt), inTransit: false };
        }
        return { percent: 100, inTransit: false };
    }, [acceptedAt, etaAt, receivedAt, tick, pct, status]);

    const remaining = useMemo(() => {
        if (!acceptedAt || !etaAt || receivedAt || status !== "DELIVERING")
            return undefined;
        const diff = etaAt - tick;
        if (diff <= 0) return undefined;
        const mins = Math.round(diff / 60000);
        if (mins >= 60) {
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            return `${h}h ${m}m`;
        }
        return `${mins}m`;
    }, [acceptedAt, etaAt, tick, receivedAt, status]);

    // Build dynamic markers
    interface Marker {
        key: string;
        label: string;
        left: number;
        time?: number;
        state: "done" | "current" | "pending";
    }
    const markers: Marker[] = [];

    // Placed always visible at start
    if (createdAt) {
        markers.push({
            key: "placed",
            label: "Placed",
            left: 0,
            time: createdAt,
            state: "done",
        });
    }

    // Accepted appears only when acceptedAt exists
    if (acceptedAt) {
        // Position relative to timeline (created->ETA). If no eta yet, keep near start (e.g., 25%).
        const left = etaAt ? pct(acceptedAt) : 25;
        markers.push({
            key: "accepted",
            label: "Accepted",
            left,
            time: acceptedAt,
            state: "done",
        });
    }

    const showDelivering =
        status === "DELIVERING" && acceptedAt && etaAt && !receivedAt;
    if (showDelivering) {
        const currentTs = Math.min(Math.max(tick, acceptedAt!), etaAt!);
        const currentLeft = pct(currentTs);
        markers.push({
            key: "delivering",
            label: "Delivering",
            left: currentLeft,
            time: currentTs,
            state: "current",
        });
    }

    // End marker: ETA while in transit, Received when completed
    if (acceptedAt && etaAt && !receivedAt) {
        markers.push({
            key: "eta",
            label: "ETA",
            left: 100,
            time: etaAt,
            state: showDelivering ? "pending" : "pending",
        });
    }
    if (receivedAt) {
        // Replace ETA endpoint
        markers.push({
            key: "received",
            label: "Received",
            left: 100,
            time: receivedAt,
            state: "done",
        });
    }

    return (
        <div
            className="order-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(percent)}
            aria-label={`Order progress ${Math.round(percent)} percent`}
        >
            <div className="order-progress__track">
                <div
                    className="order-progress__fill"
                    style={{ width: `${percent}%` }}
                    aria-hidden="true"
                />
                {markers.map((m) => {
                    const cls = [
                        "order-progress__step",
                        m.state === "done" && "order-progress__step--done",
                        m.state === "current" &&
                            "order-progress__step--current",
                    ]
                        .filter(Boolean)
                        .join(" ");
                    const timeLabel = m.time
                        ? new Date(m.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                        : "--";
                    // For delivering marker show remaining instead of static time
                    const subLabel =
                        m.key === "delivering" && remaining
                            ? remaining
                            : timeLabel;
                    return (
                        <div
                            key={m.key}
                            className={cls}
                            style={{ left: `${m.left}%` }}
                            title={
                                m.time
                                    ? new Date(m.time).toLocaleString()
                                    : m.label
                            }
                            aria-label={`${m.label} ${m.state}`}
                        >
                            <div className="order-progress__dot" />
                            <div className="order-progress__label">
                                <span>{m.label}</span>
                                <small className="text-muted d-block">
                                    {subLabel}
                                </small>
                            </div>
                        </div>
                    );
                })}
            </div>
            {inTransit && remaining && (
                <div className="order-progress__eta mt-1" aria-live="polite">
                    Est. arrival in {remaining}
                </div>
            )}
        </div>
    );
};

export default React.memo(OrderProgressBar);
