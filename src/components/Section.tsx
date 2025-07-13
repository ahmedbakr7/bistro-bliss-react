import type { CSSProperties, ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    style?: CSSProperties;
    classes?: string;
    title?: string;
    className?: string;
    padding?: string;
    [key: string]: unknown;
}

export default function Section({
    children,
    style,
    className = "",
padding="",
    classes = "",
    title="",
    ...props
}: SectionProps): ReactNode {
    if (className && classes) {
        throw new Error("use either classsName or classes");
    }

    return (
        <section
            style={{padding,...style}}
            className={
                className ? className : `container min-vh-100 ${title ? "d-flex flex-column justify-content-evenly":""} ${classes}`
            }
            {...props}
        >
            {title && <h1>{title}</h1>}
            <div>{children}</div>
        </section>
    );
}
