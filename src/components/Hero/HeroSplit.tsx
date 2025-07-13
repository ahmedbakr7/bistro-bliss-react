import type { ReactNode, CSSProperties } from "react";

interface HeroSplitProps {
    useOverlay?: boolean;
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    image?: string;
    children?: ReactNode;
    center: boolean;
    height?: string;
}

/**
 * Conditionally wraps children in a styled container when overlay is needed
 */
// const ConditionalOverlay = ({
//     condition,
//     style,
//     children,
// }: {
//     condition: boolean;
//     style?: CSSProperties;
//     children: ReactNode;
// }) => {
//     if (!condition) return <>{children}</>; // Just render children without the wrapper

//     return (
//         <div
//             className="row-cols-md-2 position-relative py-1 container theme-text-inverse z-1"
//             style={{
//                 maxWidth: "800px",
//                 textShadow: "0 2px 4px rgba(0,0,0,0.3)",
//                 ...style,
//             }}
//         >
//             {children}
//         </div>
//     );
// };

/**
 * Split hero component with image on one side and content on the other
 */
export default function HeroSplit({
    title = "Welcome to Bistro Bliss",
    // useOverlay = false,
    subtitle = "Experience culinary excellence",
    ctaText = "Book a Table",
    ctaLink = "#",
    secondaryCtaText,
    secondaryCtaLink = "#",
    image,
    center,
    children,
}: HeroSplitProps): ReactNode {
    // Create image styles
    const imageStyles: CSSProperties = {
        aspectRatio: 16 / 9,
        backgroundColor: "grey",
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <section
            className={`container d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative`}
        >
            <div
                className={`row w-100 g-5 ${
                    center ? "justify-content-center align-items-center" : ""
                }`}
            >
                {/* Image column */}
                <div
                    className={`col-lg-6 ${
                        center
                            ? "position-absolute top-0 start-0 vw-100 vh-100 z-n1"
                            : ""
                    }`}
                    style={imageStyles}
                ></div>

                {/* Content column */}
                <div
                    className={`col-lg-6 d-flex flex-column justify-content-center ${
                        center ? "align-items-center" : ""
                    }`}
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
            </div>
        </section>
    );
}
