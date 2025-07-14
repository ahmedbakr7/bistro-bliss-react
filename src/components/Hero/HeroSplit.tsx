import { type ReactNode } from "react";
import HeroImage from "./HeroImage";
import { HeroSplitContext } from "./HeroSplitContext";
import HeroSplitContent from "./HeroSplitContent";

interface HeroSplitProps {
    center?: boolean;
    children: ReactNode;
}

/**
 * Split hero component with image on one side and content on the other
 */
export default function HeroSplit({
    center=false,
    children,
}: HeroSplitProps): ReactNode {
    // Create image styles

    return (
        <HeroSplitContext.Provider value={{title:"",center}}>
            <section
                className={`container d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative`}
            >
                <div
                    className={`row w-100 g-5 ${
                        center
                            ? "justify-content-center align-items-center"
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
