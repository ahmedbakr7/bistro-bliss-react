import type { ReactNode, CSSProperties } from "react";
import type { HeroContentProps } from "./HeroContent";
import HeroContent from "./HeroContent";

interface HeroFullScreenProps
    extends Omit<HeroContentProps, "center" | "useOverlay"> {
    image?: string;
    height?: string;
    center?: boolean;
    useOverlay?: boolean;
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
                        center
                            ? "justify-content-center align-items-center"
                            : ""
                    }`}
                >
                    <div className="col-lg-6">
                        <HeroContent
                            title={title}
                            subtitle={subtitle}
                            ctaText={ctaText}
                            ctaLink={ctaLink}
                            secondaryCtaText={secondaryCtaText}
                            secondaryCtaLink={secondaryCtaLink}
                            useOverlay={useOverlay}
                            center={center}
                        >
                            {children}
                        </HeroContent>
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
