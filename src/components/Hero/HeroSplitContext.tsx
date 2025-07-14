import { createContext } from "react";
import type { HeroContentProps } from "./HeroContent";

export const HeroSplitContext = createContext<HeroContentProps>({ title: "" });
