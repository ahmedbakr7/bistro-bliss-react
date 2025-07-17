import type { ReactNode } from "react";
import Section from "../components/Section";
import { HeroSplit } from "../components/Hero";
import HeroContent from "../components/Hero/HeroContent";
import { Card } from "../components/Card";
import GridContainer from "../components/GridContainer";

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

            <Section>
                <HeroSplit>
                    <div className="col-lg-6">
                        <HeroContent
                            title="A little information for our valuable guest"
                            subtitle="At place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event."
                        />
                        <div className="row col row-cols-2 text-center g-2">
                            <Card
                                className="col"
                                style={{ width: "150px", height: "108.38px" }}
                                // sameHeight
                            >
                                <Card.Body title="3" subtitle="Locations" />
                            </Card>
                            <Card
                                className="col"
                                style={{ width: "150px", height: "108.38px" }}
                                // sameHeight
                            >
                                <Card.Body title="1995" subtitle="Founded" />
                            </Card>
                            <Card
                                className="col"
                                style={{ width: "150px", height: "108.38px" }}
                                // sameHeight
                            >
                                <Card.Body
                                    title="64+"
                                    subtitle="Staff Members"
                                />
                            </Card>
                            <Card
                                className="col"
                                style={{ width: "150px", height: "108.38px" }}
                                // sameHeight
                            >
                                <Card.Body
                                    title="100%"
                                    subtitle="Satisfied Customers"
                                />
                            </Card>
                        </div>
                    </div>
                    <HeroSplit.Image path="/src/assets/chef.png" />
                </HeroSplit>
            </Section>

            <Section title="What Our Customers Say">
                <GridContainer numberOfColumns={3}>
                    <Card sameHeight>
                        <Card.Body
                            title='"The best restaurant"'
                            text="Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles."
                        />
                    </Card>
                    <Card sameHeight>
                        <Card.Body
                            title="Birthdays"
                            text="Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented."
                        />
                    </Card>
                    <Card sameHeight>
                        <Card.Body
                            title="Weddings"
                            text="The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended."
                        />
                    </Card>
                </GridContainer>
            </Section>
        </main>
    );
}
