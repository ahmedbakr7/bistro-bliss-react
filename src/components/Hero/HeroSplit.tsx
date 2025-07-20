import { type HTMLAttributes, type ReactNode } from "react";
import HeroImage from "./HeroImage";
import { HeroSplitContext } from "./HeroSplitContext";
import HeroSplitContent from "./HeroSplitContent";

interface HeroSplitProps extends HTMLAttributes<HTMLElement> {
    center?: boolean;
    children?: ReactNode;
}

/**
 * Split hero component with image on one side and content on the other
 */
export default function HeroSplit({
    center=false,
    children,
    className="",
    ...restProps
}: HeroSplitProps): ReactNode {
    // Create image styles

    return (
        <HeroSplitContext.Provider value={{title:"",center}}>
                <div
                    className={`${className} h-100 row w-100 g-5 ${
                        center
                            ? " justify-content-center align-items-center"
                            : ""
                    }`}
                    {...restProps}
                >
                    {children}
                </div>
        </HeroSplitContext.Provider>
    );
}

HeroSplit.Image = HeroImage;
HeroSplit.HeroSplitContent = HeroSplitContent;
