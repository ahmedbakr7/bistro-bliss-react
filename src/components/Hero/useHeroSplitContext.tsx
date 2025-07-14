import { useContext } from "react";
import { HeroSplitContext } from "./HeroSplitContext";

export function useHeroSplitContext() {
    const ctx = useContext(HeroSplitContext);

    if (!ctx) {
        throw new Error(
            "Accordion-related components must be wrapped by <Accordion>."
        );
    }

    return ctx;
}
