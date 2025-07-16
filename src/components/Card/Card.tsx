import type { CSSProperties, ReactNode } from "react";
import { CardImage } from "./CardImage";
import { CardHeader } from "./CardHeader";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";

interface CardProps {
    style?: CSSProperties;
    className?: string;
    sameHeight?: boolean;
    children: ReactNode;
    [key: string]: unknown;
}

/**
 * Card component using compound pattern
 *
 * Usage:
 * <Card>
 *   <Card.Image src="image.jpg" alt="Image" />
 *   <Card.Header>Header Content</Card.Header>
 *   <Card.Body title="Title" text="Text">Body content</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 */
function Card({
    sameHeight = true,
    style,
    className = "",
    children,
    ...props
}: CardProps): ReactNode {
    const defaultClasses = `card ${sameHeight ? "h-100" : ""}`;
    return (
        <div
            style={style}
            className={`${defaultClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// Attach the subcomponents to the Card component
Card.Image = CardImage;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
