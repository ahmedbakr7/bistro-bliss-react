import type { CSSProperties, ReactNode } from "react";

export type CardSpacing = 0 | 1 | 2 | 3 | 4 | 5;

interface CardGroupProps {
    /**
     * Cards to be displayed in the group
     */
    children?: ReactNode;

    /**
     * Whether cards should have spacing between them
        bootstrap constants from 0 to 5
     */
    spacing?: CardSpacing;

    /**
     * Custom CSS styles
     */
    style?: CSSProperties;

    /**
     * Additional CSS classes
     */
    className?: string;

    /**
     * Custom data attributes or other props
     */
    [key: string]: unknown;
}

/**
 * CardGroup component for displaying a group of cards with configurable spacing
 */
export default function CardGroup({
    children,
    spacing = 0,
    style,
    className = "",
    ...props
}: CardGroupProps): ReactNode {
    return (
        <div
            style={style}
            {...props}
            className={`${className} card-${spacing === 0 ? "group" : "deck"}`}
        >
            {children ?? (
                <>
                    <p>No Content</p>
                </>
            )}
        </div>
    );
}
