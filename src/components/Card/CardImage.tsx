import type { HTMLAttributes, ReactNode } from "react";

interface CardImageProps extends HTMLAttributes<HTMLElement> {
    src: string;
    alt?: string;
    className?: string;
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
