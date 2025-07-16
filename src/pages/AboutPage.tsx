import type { ReactNode } from "react";
import Section from "../components/Section";
import { HeroSplit } from "../components/Hero";

export default function AboutPage(): ReactNode {
    return (
        <main>
            <Section>
                <HeroSplit>
                    <HeroSplit.Image path="/src/assets/gyro.png" />
                    <HeroSplit.HeroSplitContent
                        title="We provide healthy food for you family."
                        subtitle="Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city's rich culinary culture, we aim to honor our local roots while infusing a global palate."
                        className="d-flex h-100 justify-content-center"
                    />
                </HeroSplit>
            </Section>
            
        </main>
    );
}
