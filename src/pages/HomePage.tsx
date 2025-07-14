import type { ReactNode } from "react";
// import Hero from "../components/Hero/Hero";
import Section from "../components/Section";
import CardContainer from "../components/CardContainer";
import Card from "../components/Card";
import HeroSplit from "../components/Hero/HeroSplit";
import { HeroFullScreen } from "../components/Hero";

export default function HomePage(): ReactNode {
    return (
        <main>
            <HeroFullScreen
                height="80vh"
                title="Experience Culinary Excellence"
                subtitle="Bistro Bliss offers a delectable journey through the finest dishes crafted with passion and precision."
                ctaText="Reserve Your Table"
                image="/src/assets/bg-hero.png"
                secondaryCtaText="go where"
            />

            <HeroSplit center>
                <HeroSplit.Image path="/src/assets/bg-hero.png" />
                <HeroSplit.HeroSplitContent
                    title="Browse Our Menu"
                    subtitle="Bistro Bliss offers a delectable journey through the finest dishes crafted with passion and precision."
                    ctaText="Reserve Your Table"
                    secondaryCtaText="go where"
                />
            </HeroSplit>

            <HeroSplit>
                <HeroSplit.Image path="/src/assets/bg-hero.png" />
                <HeroSplit.HeroSplitContent
                    title="Browse Our Menu"
                    subtitle="Bistro Bliss offers a delectable journey through the finest dishes crafted with passion and precision."
                    ctaText="Reserve Your Table"
                    secondaryCtaText="go where"
                />
            </HeroSplit>

            <HeroSplit>
                <HeroSplit.HeroSplitContent
                    title="Browse Our Menu"
                    subtitle="Bistro Bliss offers a delectable journey through the finest dishes crafted with passion and precision."
                    ctaText="Reserve Your Table"
                    secondaryCtaText="go where"
                />
                <HeroSplit.Image path="/src/assets/bg-hero.png" />
            </HeroSplit>

            <Section title="Browse Our Menu">
                <CardContainer>
                    <Card></Card>
                </CardContainer>
            </Section>
        </main>
    );
}
