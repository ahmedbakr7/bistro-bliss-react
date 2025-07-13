import type { CSSProperties, ReactNode } from "react";


interface HeroImageProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    // imageStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    image?: string;
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

export default function HeroImage({
    title = "title",
    subtitle = "subtitles",
    ctaText = "Book a Table",
    ctaLink = "/reservation",
    secondaryCtaText,
    secondaryCtaLink = "/menu",
    // imageStyle = {backgroundImage},
    image,
    height = "100vh",
    center = true,
    contentStyle,
}: HeroImageProps): ReactNode {

    return (<>
        <div
            className={heroStyle.className}
            style={{
                ...heroStyle.style,
                backgroundImage: image ? `url(${image})` : undefined,
            }}
        ></div>
        <div
            className="row-cols-md-2 position-relative py-1 container theme-text-inverse z-1"
            style={{
                maxWidth: "800px",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                ...contentStyle,
            }}
        ></div>
    </>)
}