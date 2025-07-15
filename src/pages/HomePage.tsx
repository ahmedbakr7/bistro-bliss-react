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
                <GridContainer spacing={4}>
                    <Card style={{width:"10rem"}} {...menuItem1} />
                    <Card style={{width:"10rem"}} {...dessertItem} />
                    <Card style={{width:"10rem"}} {...specialItem} />
                </GridContainer>
            </Section>
        </main>
    );
}
