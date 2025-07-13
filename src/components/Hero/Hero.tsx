import type { CSSProperties, ReactNode } from "react";

interface HeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    // imageStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    image?: string;
    children?: ReactNode;
    height?: string;
    center?: boolean;
}

interface HeroStyle {
    style: CSSProperties;
    className: string;
}

const coverHeroStyle: HeroStyle = {
    className: "position-absolute top-0 start-0 w-100 h-100 z-n1 ",
    style: {
        // backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
};
const splitHeroStyle: HeroStyle = { style: {}, className: "" };

export default function Hero({
    title = "title",
    subtitle = "subtitles",
    ctaText = "Book a Table",
    ctaLink = "/reservation",
    secondaryCtaText,
    secondaryCtaLink = "/menu",
    // imageStyle = {backgroundImage},
    image,
    children,
    height = "100vh",
    center = true,
    contentStyle,
}: HeroProps): ReactNode {
    let heroStyle: HeroStyle = center ? coverHeroStyle : splitHeroStyle;

    return (
        <section
            className={`position-relative ${
                center ? "justify-content-center " : "container row-cols-md-2"
            } d-flex align-items-center overflow-hidden`}
            style={{ height: height, minHeight: "500px" }}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100 z-n1 "
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            <div
                className="row-cols-md-2 position-relative py-1 container theme-text-inverse z-1"
                style={{
                    maxWidth: "800px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    ...contentStyle,
                }}
            >
                {children ?? (
                    <>
                        <h1>{title}</h1>
                        {subtitle && (
                            <p
                                className="mb-0"
                                style={{
                                    fontSize: "1.25rem",
                                    marginBottom: "2rem",
                                    maxWidth: "600px",
                                }}
                            >
                                {subtitle}
                            </p>
                        )}
                        <div className="d-flex flex-wrap gap-3 align-items-center ">
                            {ctaText && (
                                <a href={ctaLink} className="theme-button">
                                    {ctaText}
                                </a>
                            )}
                            {secondaryCtaText && (
                                <a
                                    href={secondaryCtaLink}
                                    className="theme-secondary-button"
                                >
                                    {secondaryCtaText}
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
