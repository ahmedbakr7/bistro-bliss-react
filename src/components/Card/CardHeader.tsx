import type { ReactNode } from "react";

interface CardHeaderProps {
    className?: string;
    children: ReactNode;
    [key: string]: unknown;
}

export function CardHeader({
    children,
    className = "",
    ...props
}: CardHeaderProps): ReactNode {
    return (
        <div {...props} className={`card-header ${className}`}>
            {children}
        </div>
    );
}

CardHeader.displayName = "Card.Header";
