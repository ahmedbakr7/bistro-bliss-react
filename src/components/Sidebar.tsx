import {
    useState,
    useCallback,
    useId,
    type CSSProperties,
    type ReactElement,
    type ReactNode,
} from "react";

interface SidebarProps {
    className?: string;
    children?: ReactNode;
    collapsed?: boolean; // controlled value (true = collapsed)
    defaultCollapsed?: boolean; // initial value for uncontrolled mode
    padding?: CSSProperties["padding"];
    style?: CSSProperties;
    collapseButton?: (collapsed: boolean) => ReactNode;
    onCollapseChange?: (collapsed: boolean) => void; // change notifier
    containerClassName?: string;
    toggleClassName?: string;
}

export default function Sidebar({
    className = "",
    children,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    collapseButton,
    containerClassName = "",
    padding,
    style,
    onCollapseChange,
    toggleClassName = "align-self-end btn btn-sm btn-outline-secondary",
}: SidebarProps): ReactElement | null {
    // Determine controlled vs uncontrolled mode (only collapsed prop controls)
    const isControlled = collapsedProp !== undefined;

    // Internal state for uncontrolled usage
    const [internalCollapsed, setInternalCollapsed] =
        useState<boolean>(defaultCollapsed);

    // Source of truth
    const collapsed = isControlled
        ? (collapsedProp as boolean)
        : internalCollapsed;

    const contentId = useId();

    const emitChange = useCallback(
        (next: boolean) => {
            onCollapseChange?.(next); // notify parent
        },
        [onCollapseChange]
    );

    const toggle = useCallback(() => {
        if (isControlled) {
            emitChange(!collapsed); // ask parent to change
        } else {
            setInternalCollapsed((prev) => {
                const next = !prev;
                emitChange(next);
                return next;
            });
        }
    }, [isControlled, collapsed, emitChange]);

    const outerClassName = [
        "border-end d-flex flex-column",
        className,
        !padding ? "p-3" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const innerClassName = [containerClassName, collapsed ? "d-none" : ""]
        .filter(Boolean)
        .join(" ");

    const mergedStyle = { padding, ...style };

    if (children == null) return null;

    return (
        <aside className={outerClassName} style={mergedStyle}>
            <button
                type="button"
                className={toggleClassName}
                onClick={toggle}
                aria-expanded={!collapsed}
                aria-controls={contentId}
            >
                {collapseButton
                    ? collapseButton(collapsed)
                    : collapsed
                    ? "›"
                    : "‹"}
            </button>
            <div
                id={contentId}
                className={innerClassName}
                aria-hidden={collapsed}
            >
                {children}
            </div>
        </aside>
    );
}
