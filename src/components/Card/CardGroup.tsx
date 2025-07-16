import type { ReactNode } from "react";

interface CardGroupProps {
    className?: string;
    children: ReactNode;
}

/**
 * CardGroup component to display multiple cards in a row with equal height
 */
export function CardGroup({
    className = "",
    children,
}: CardGroupProps): ReactNode {
    return <div className={`card-group ${className}`}>{children}</div>;
}

export default CardGroup;
