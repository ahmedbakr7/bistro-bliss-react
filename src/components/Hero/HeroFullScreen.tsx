import type { ReactNode, CSSProperties } from "react";

interface HeroFullScreenProps {
    useOverlay?: boolean;
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    image?: string;
    children?: ReactNode;
    center?: boolean;
    height?: string;
}

/**
 * Full screen hero component with background image
 */
export default function HeroFullScreen({
    title = "Welcome to Bistro Bliss",
    useOverlay = false,
    subtitle = "Experience culinary excellence",
    ctaText = "Book a Table",
    ctaLink = "#",
    secondaryCtaText,
    secondaryCtaLink = "#",
    image,
    center = true,
    children,
}: HeroFullScreenProps): ReactNode {
    // Create image styles
    const imageStyles: CSSProperties = {
        backgroundColor: "grey",
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <section className="position-relative min-vh-100">
            {/* Full screen background image */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100 z-n1"
                style={imageStyles}
            ></div>

            {/* Content overlay */}
            <div className="container d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative">
                <div
                    className={`row w-100 g-5 ${
                        center ? "justify-content-center align-items-center" : ""
                    }`}
                >
                    <div
                        className={`col-lg-6 ${useOverlay ? "theme-text-inverse" : ""} d-flex flex-column justify-content-center ${
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
                                <p>{subtitle}</p>
                                <div
                                    className={`d-flex ${
                                        center ? "justify-content-center" : ""
                                    }`}
                                >
                                    {ctaText && (
                                        <a
                                            href={ctaLink}
                                            className="theme-button me-2"
                                        >
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
                    {!center && (
                        <div className="col-lg-6">
                            {/* This is an empty div to maintain the split layout when not centered */}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
