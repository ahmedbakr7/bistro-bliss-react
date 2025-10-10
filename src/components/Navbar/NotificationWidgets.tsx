import type { Notification } from "../../services/notificationsApi";

interface NotificationWidgetsProps {
    notifications: Notification[];
    unread: number;
    onClose: () => void;
    onMarkRead: (id: string) => void;
    onMarkAll: () => void;
}

export default function NotificationWidgets(props: NotificationWidgetsProps) {
    const { notifications, unread, onClose, onMarkRead, onMarkAll } = props;

    return (
        <div style={{ width: 320 }} className="bg-white">
            <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
                <strong>Notifications</strong>
                <div className="d-flex gap-2">
                    {unread > 0 && (
                        <button
                            type="button"
                            className="btn btn-link btn-sm p-0"
                            onClick={onMarkAll}
                        >
                            Mark all read
                        </button>
                    )}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={onClose}
                        style={{ fontSize: 10 }}
                    />
                </div>
            </div>
            <ul
                className="list-unstyled mb-0"
                style={{ maxHeight: 300, overflowY: "auto" }}
            >
                {notifications.length === 0 && (
                    <li className="px-3 py-4 text-center text-muted small">
                        No notifications
                    </li>
                )}
                {notifications.map((n) => {
                    const isUnread = !n.readAt;
                    return (
                        <li
                            key={n.id}
                            className={`px-3 py-2 border-bottom ${
                                isUnread ? "bg-light" : ""
                            }`}
                            style={{ cursor: isUnread ? "pointer" : "default" }}
                            onClick={() => isUnread && onMarkRead(n.id)}
                        >
                            <div className="small mb-1">
                                <span className="badge bg-secondary me-2 text-uppercase">
                                    {n.type}
                                </span>
                                {isUnread && (
                                    <span className="badge bg-danger">NEW</span>
                                )}
                            </div>
                            <div style={{ fontSize: 13, lineHeight: 1.3 }}>
                                {n.message}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
