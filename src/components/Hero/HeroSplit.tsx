import { type HTMLAttributes, type ReactNode } from "react";
import HeroImage from "./HeroImage";
import { HeroSplitContext } from "./HeroSplitContext";
import HeroSplitContent from "./HeroSplitContent";

interface HeroSplitProps extends HTMLAttributes<HTMLElement> {
    center?: boolean;
    children?: ReactNode;
    className?: string;
}

/**
 * Split hero component with image on one side and content on the other
 */
export default function HeroSplit({
    center=false,
    children,
    className,
    ...restProps
}: HeroSplitProps): ReactNode {
    // Create image styles

    return (
        <HeroSplitContext.Provider value={{title:"",center}}>
            <section
                className={`container d-flex align-items-center justify-content-center position-relative ${className}`}
                {...restProps}
            >
                <div
                    className={`row w-100 g-5 ${
                        center
                            ? " justify-content-center align-items-center"
                            : ""
                    }`}
                >
                    {children}
                </div>
            </section>
        </HeroSplitContext.Provider>
    );
}

HeroSplit.Image = HeroImage;
HeroSplit.HeroSplitContent = HeroSplitContent;
