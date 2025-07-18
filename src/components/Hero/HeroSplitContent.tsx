import type { ReactNode } from "react";
import HeroContent, { type HeroContentProps } from "./HeroContent";
import { useHeroSplitContext } from "./useHeroSplitContext";

type HeroSplitContentProps = Omit<HeroContentProps, "center">;

export default function HeroSplitContent({
    title,
    subtitle,
    ctaText,
    ctaLink = "#",
    secondaryCtaText,
    secondaryCtaLink = "#",
    useOverlay = false,
    children,
    style,
    className,
}: HeroSplitContentProps): ReactNode {
    const { center } = useHeroSplitContext();

    return (
        <HeroContent
            style={style}
            className={className}
            title={title}
            subtitle={subtitle}
            ctaText={ctaText}
            ctaLink={ctaLink}
            secondaryCtaText={secondaryCtaText}
            secondaryCtaLink={secondaryCtaLink}
            useOverlay={useOverlay && center}
            center={center}
        >
            {children}
        </HeroContent>
    );
}
