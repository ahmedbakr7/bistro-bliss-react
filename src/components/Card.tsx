import type { CSSProperties, ReactNode } from "react";

interface CardContainerProps {
    children?: ReactNode;
    style?: CSSProperties;
    classes?: string;
    className?: string;
    image?: string;
    alt?: string;
    [key: string]: unknown;
}

export default function Card({
    children,
    style,
    classes = "",
    className = "",
    image = "",
    alt = "",
    ...props
}: CardContainerProps): ReactNode {
    if (image) {
        if (!alt) {
            throw new Error(
                "if image is provided, then alt text must be provided"
            );
        }
    }

    return (
        <div
            style={style}
            className={className ? className : `card ${classes}`}
            {...props}
        >
            {children ??
                <>
                    <img src={image} alt={alt} />
                    <div className="card-body"></div>
                </>
            }
        </div>
    );
}
