import type { CSSProperties, ReactNode } from "react";

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5;

interface GridContainerProps {
    children: ReactNode;
    style?: CSSProperties;
    classes?: string;
    className?: string;
    numberOfElementsLg?: number;
    spacing: Spacing;
    [key: string]: unknown;
}

export default function GridContainer({
    children,
    style,
    classes = "",
    className = "",
numberOfElementsLg=4,
spacing=0,
    ...props
}: GridContainerProps): ReactNode {
    return (
        <div
            style={style}
            className={
                className ? className : `row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-${numberOfElementsLg} g-${spacing} ${classes}`
            }
            {...props}
>
            {children}
        </div>
    );
}
