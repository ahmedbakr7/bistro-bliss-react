import type {
    CSSProperties,
    ElementType,
    HTMLAttributes,
    ReactNode,
} from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    HeaderElement?: ElementType;
    children?: ReactNode;
    style?: CSSProperties;
    title?: string;
    className?: string;
    padding?: string;
    [key: string]: unknown;
}

export default function Section({
    HeaderElement = "h2",
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
            {title && <HeaderElement>{title}</HeaderElement>}
            {children}
        </section>
    );
}
