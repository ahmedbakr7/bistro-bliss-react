import type { ReactNode } from "react";

interface CardImageProps {
    src: string;
    alt?: string;
    className?: string;
    [key: string]: unknown;
}

export function CardImage({
    src,
    alt = "",
    className = "",
    ...props
}: CardImageProps): ReactNode {
    return (
        <img
            src={src}
            alt={alt}
            className={`card-img-top ${className}`}
            {...props}
        />
    );
}

CardImage.displayName = "Card.Image";
