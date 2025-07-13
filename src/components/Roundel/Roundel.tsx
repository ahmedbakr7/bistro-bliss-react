import type { ReactNode, CSSProperties } from "react";
import "./Roundel.css";

interface RoundelProps {
    // Can be a URL or an imported image
    image?: string;
    // Icon component can be passed as children
    children?: ReactNode;
    // Size of the roundel in pixels (default: 40)
    size?: number;
    // Background color (default: primary color)
    bgColor?: string;
    // Border color (default: none)
    borderColor?: string;
    // Border width (default: 1px if borderColor is provided)
    borderWidth?: number;
    // Custom styles
    style?: CSSProperties;
    // Custom class name
    className?: string;
    // URL to navigate to when clicked
    href?: string;
    // Alt text for the image
    alt?: string;
    // Click handler
    onClick?: () => void;
    // Additional props
    [key: string]: unknown;
}

export default function Roundel({
    image,
    children,
    size = 40,
    bgColor = "var(--color-primary)",
    borderColor,
    borderWidth = 1,
    style,
    className = "",
    href,
    alt = "Social media icon",
    onClick,
}: RoundelProps): ReactNode {
    const roundelStyle: CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        cursor: href || onClick ? "pointer" : "default",
        ...(borderColor && { border: `${borderWidth}px solid ${borderColor}` }),
        ...style,
    };

    // Content to be displayed inside the roundel
    const content = image ? (
        <img
            src={image}
            alt={alt}
            style={{
                width: "60%",
                height: "60%",
                objectFit: "contain",
            }}
        />
    ) : (
        children
    );

    // Wrapper for hover effects
    const wrapperStyle: CSSProperties = {
        display: "inline-block",
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    // Return link if href is provided, otherwise a div
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className={`roundel-wrapper ${className}`}
                style={wrapperStyle}
            >
                <div className="roundel" style={roundelStyle}>
                    {content}
                </div>
            </a>
        );
    }

    return (
        <div
            className={`roundel-wrapper ${className}`}
            style={wrapperStyle}
            onClick={handleClick}
        >
            <div className="roundel" style={roundelStyle}>
                {content}
            </div>
        </div>
    );
}
