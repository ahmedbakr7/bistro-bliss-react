import type { ReactNode } from "react";

interface CardFooterProps {
    className?: string;
    children: ReactNode;
    [key: string]: unknown;
}

export function CardFooter({
    children,
    className = "",
    ...props
}: CardFooterProps): ReactNode {
    return (
        <div {...props} className={`card-footer text-muted ${className}`}>
            {children}
        </div>
    );
}

CardFooter.displayName = "Card.Footer";
