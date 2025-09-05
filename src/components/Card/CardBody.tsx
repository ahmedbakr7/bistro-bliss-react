import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LinkType {
    text: string;
    href: string;
    [key: string]: unknown;
}

interface CardBodyProps {
    className?: string;
    title?: ReactNode; // changed to allow ReactNode
    subtitle?: ReactNode; // changed to allow ReactNode / custom styled span
    text?: string;
    links?: LinkType[];
    children?: ReactNode;
    imageOverlay?: boolean;
    [key: string]: unknown;
}

export function CardBody({
    className = "",
    title,
    subtitle,
    text,
    links,
    children,
    imageOverlay = false,
    ...props
}: CardBodyProps): ReactNode {
    return (
        <div
            {...props}
            className={`card-${
                imageOverlay ? "img-Overlay" : "body"
            } ${className}`}
        >
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && (
                <h3 className="card-subtitle mb-2 text-muted">{subtitle}</h3>
            )}
            {text && <p className="card-text">{text}</p>}
            {links?.map((link: LinkType, index) => {
                const { text, href, ...restProps } = link;
                return (
                    <Link
                        key={index}
                        to={href}
                        className="card-link"
                        {...restProps}
                    >
                        {text}
                    </Link>
                );
            })}
            {children}
        </div>
    );
}

CardBody.displayName = "Card.Body";
