import type { ReactNode } from "react";
import Section from "../components/Section";
import GridContainer from "../components/GridContainer";
import { Card } from "../components/Card";
import { CardBody } from "../components/Card/CardBody";
import HeroContent from "../components/Hero/HeroContent";

export default function MenuPage(): ReactNode {
    return (
        <main>
            <Section title="Our Menu" className="justify-content-center align-items-center gap-4">
                <p>
                    We consider all the drivers of change gives you the
                    components you need to change to create a truly happens.
                </p>
                <div className="d-flex align-items-center gap-4">
                    <button className="theme-button">All</button>
                    <button className="theme-secondary-button">
                        Breakfast
                    </button>
                    <button className="theme-secondary-button">
                        Main Dishes
                    </button>
                    <button className="theme-secondary-button">Drinks</button>
                    <button className="theme-secondary-button">Desserts</button>
                </div>
                <GridContainer className="text-center g-5-4" numberOfColumns={4}>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 15.99</p>
                        <Card.Body
                            title="Hawaiian Pizza"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                    <Card>
                        <Card.Image src="/src/assets/bg-hero.png" />
                        <p>$ 9.99</p>
                        <Card.Body
                            title="Fried Eggs"
                            subtitle="Made with eggs, lettuce, salt, oil and other ingredients."
                        />
                    </Card>
                </GridContainer>
            </Section>

            {/* TODO!!!: finish the rest of the component(logo groups) */}
            <Section>
                <div className="row">
                    <div className="col">
                        <HeroContent
                            title="You Can Order Through Apps"
                            subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit enim bibendum sed et aliquet aliquet risus tempor semper."
                        />
                    </div>
                    <div className="col">

                    </div>
                </div>
            </Section>
        </main>
    );
}
