import { useState, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Overlay, Popover } from "react-bootstrap";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationWidgets from "./NotificationWidgets";

const iconBtnStyle: React.CSSProperties = {
    width: 34,
    height: 34,
    padding: 0,
    borderRadius: 8,
};

export default function Notification() {
    const [show, setShow] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const {
        data: notifications = [],
        unreadCount,
        markRead,
        markAll,
    } = useNotifications();
    const unread = unreadCount();

    const handleClick = () => {
        setShow((s) => !s);
    };

    return (
        <>
            <button
                ref={btnRef}
                type="button"
                aria-label="Notifications"
                aria-expanded={show}
                aria-haspopup="true"
                className="theme-btn-primary btn-sm d-flex align-items-center justify-content-center position-relative"
                style={iconBtnStyle}
                onClick={handleClick}
            >
                <IoNotificationsOutline size={18} />
                {unread > 0 && (
                    <span
                        className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: 18, height: 18, fontSize: 10 }}
                    >
                        {unread > 9 ? "9+" : unread}
                    </span>
                )}
            </button>
            <Overlay
                show={show}
                target={btnRef.current}
                placement="bottom"
                rootClose
                onHide={() => setShow(false)}
            >
                <Popover
                    id="notifications-popover"
                    className="border-0 shadow p-0"
                >
                    <NotificationWidgets
                        notifications={notifications}
                        unread={unread}
                        onClose={() => setShow(false)}
                        onMarkRead={(id: string) => markRead.mutate(id)}
                        onMarkAll={() => markAll.mutate()}
                    />
                </Popover>
            </Overlay>
        </>
    );
}
