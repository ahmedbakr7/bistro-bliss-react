import { Children, type CSSProperties, type ReactNode, type HTMLAttributes } from "react";

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5;

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    numberOfColumns?: number;
    spacing?: Spacing;
    childrenClassName?: string;
    // groupWithNoSpacing?: boolean;
}

export default function GridContainer({
    children,
    style,
    className = "",
    numberOfColumns = 4,
    // groupWithNoSpacing = false, // attach className "card-group" to the container to make all cards as one piece with the same height
    spacing = 0,
    childrenClassName="",
    ...props
}: GridContainerProps): ReactNode {
    const defaultClasses = `row  row-cols-1 row-cols-md-2 row-cols-lg-${numberOfColumns} g-${spacing}`;
    return (
        <div
            style={style}
            className={`${defaultClasses} ${className}`}
            {...props}
        >
            {Children.map(children, (child, index) => (
                <div key={index} className={`col ${childrenClassName}`}>
                    {child}
                </div>
            ))}
        </div>
    );
}
