import type { ReactNode } from "react";

export interface HeroContentProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    useOverlay?: boolean;
    children?: ReactNode;
    center?: boolean;
}

/**
 * Reusable hero content component with title, subtitle, and CTA buttons
 */
export default function HeroContent({
    title,
    subtitle,
    ctaText,
    ctaLink = "#",
    secondaryCtaText,
    secondaryCtaLink = "#",
    useOverlay = false,
    center = false,
    children,
}: HeroContentProps): ReactNode {
    return (
        <div
            className={`${
                useOverlay ? "theme-text-inverse" : ""
            } d-flex flex-column justify-content-center ${
                center ? "text-center" : ""
            }`}
            style={
                useOverlay
                    ? { textShadow: "0 2px 4px rgba(0,0,0,0.3)" }
                    : undefined
            }
        >
            {children ?? (
                <>
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                    <div
                        className={`d-flex ${
                            center ? "justify-content-center" : ""
                        }`}
                    >
                        {ctaText && (
                            <a href={ctaLink} className="theme-button me-2">
                                {ctaText}
                            </a>
                        )}
                        {secondaryCtaText && (
                            <a
                                href={secondaryCtaLink}
                                className="theme-secondary-button me-2"
                            >
                                {secondaryCtaText}
                            </a>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
