import type { ReactNode } from "react";
import HeroContent, { type HeroContentProps } from "./HeroContent";
import { useHeroSplitContext } from "./useHeroSplitContext";

type HeroSplitContentProps = Omit<HeroContentProps,"center">

export default function HeroSplitContent({
    title,
    subtitle,
    ctaText,
    ctaLink = "#",
    secondaryCtaText,
    secondaryCtaLink = "#",
    useOverlay = false,
    children,
}: HeroSplitContentProps): ReactNode {
    const { center } = useHeroSplitContext();

    return (
        <div className="col-lg-6">
            <HeroContent
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
        </div>
    );
}
