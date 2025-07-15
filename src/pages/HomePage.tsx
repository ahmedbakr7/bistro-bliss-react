import type { ReactNode } from "react";
// import Hero from "../components/Hero/Hero";
import Section from "../components/Section";
import Card from "../components/Card/Card";
import { HeroFullScreen } from "../components/Hero";
import { dessertItem, menuItem1, specialItem } from "../components/Card/test";
import GridContainer from "../components/GridContainer";

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

            <Section title="Browse Our Menu">
                <GridContainer columnNumber={4} spacing={2}>
                    <Card
                        style={{ width: "19rem", height: "100%" }}
                        {...menuItem1}
                    />
                    <Card
                        style={{ width: "19rem", height: "100%" }}
                        {...dessertItem}
                    />
                    <Card
                        style={{ width: "19rem", height: "100%" }}
                        {...specialItem}
                    />
                </GridContainer>
            </Section>
        </main>
    );
}
