import type { CSSProperties, ReactNode } from "react";

interface CardContainerProps {
    children: ReactNode;
    style?: CSSProperties;
    classes?: string;
    className?: string;
    numberOfElementsLg?: number;
    [key: string]: unknown;
}

export default function CardContainer({
    children,
    style,
    classes = "",
    className = "",
numberOfElementsLg=4,
    ...props
}: CardContainerProps): ReactNode {
    return (
        <div
            style={style}
            className={
                className ? className : `row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-${numberOfElementsLg} g-2 ${classes}`
            }
            {...props}
>
            {children}
        </div>
    );
}
