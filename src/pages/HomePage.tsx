import type { ReactNode } from "react";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section";
import CardContainer from "../components/CardContainer";
import Card from "../components/Card";
import HeroSplit from "../components/Hero/HeroSplit";

export default function HomePage(): ReactNode {
    return (
        <main>
            <Hero
                height="80vh"
                title="Experience Culinary Excellence"
                subtitle="Bistro Bliss offers a delectable journey through the finest dishes crafted with passion and precision."
                ctaText="Reserve Your Table"
                image="/src/assets/bg-hero.png"
                secondaryCtaText="go where"
            />

            <HeroSplit
                center
                height="100vh"
                title="Experience Culinary Excellence"
                subtitle="Bistro Bliss offers a delectable journey through the finest dishes crafted with passion and precision."
                ctaText="Reserve Your Table"
                image="/src/assets/bg-hero.png"
                secondaryCtaText="go where"
            />

            <Section title="Browse Our Menu">
                <CardContainer>
                    <Card></Card>
                </CardContainer>
            </Section>
        </main>
    );
}
