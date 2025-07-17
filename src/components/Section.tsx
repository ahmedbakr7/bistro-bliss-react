import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    style?: CSSProperties;
    title?: string;
    className?: string;
    padding?: string;
    [key: string]: unknown;
}

export default function Section({
    children,
    style,
    className = "",
    padding = "",
    title = "",
    ...props
}: SectionProps): ReactNode {
    const defaultClasses = `container ${
        title ? "d-flex flex-column justify-content-evenly" : ""
    }`;

    return (
        <section
            style={{ padding, ...style }}
            className={`${defaultClasses} ${className}`}
            {...props}
        >
            {title && <h1>{title}</h1>}
            {children}
        </section>
    );
}
