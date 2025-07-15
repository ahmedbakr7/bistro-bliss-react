import { Children, type CSSProperties, type ReactNode } from "react";

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5;

interface GridContainerProps {
    children: ReactNode;
    style?: CSSProperties;
    classes?: string;
    className?: string;
    columnNumber?: number;
    spacing: Spacing;
    // groupWithNoSpacing?:boolean
    [key: string]: unknown;
}

export default function GridContainer({
    children,
    style,
    classes = "",
    className = "",
    columnNumber = 4,
// groupWithNoSpacing=false,   // attach className "card-group" to the container to make all cards as one piece with the same height
    spacing = 0,
    ...props
}: GridContainerProps): ReactNode {

    return (
        <div
            style={style}
            className={
                className
                    ? className
                    : `row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-${columnNumber} g-${spacing} ${classes}`
            }
            {...props}
        >
            {Children.map(children, (child, index) => (
                <div key={index} className="col">
                    {child}
                </div>
            ))}
        </div>
    );
}
