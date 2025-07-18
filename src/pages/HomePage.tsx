import type { ReactNode } from "react";
// import Hero from "../components/Hero/Hero";
import Section from "../components/Section";
import Card from "../components/Card/Card";
import { HeroFullScreen, HeroSplit } from "../components/Hero";
import { menuItem1, menuItem2, menuItem3 } from "../components/Card/test";
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

            <Section title="Browse Our Menu" className="text-center min-vh-100">
                <GridContainer
                    className="text-center"
                    numberOfColumns={3}
                    spacing={5}
                >
                    <Card sameHeight>
                        <Card.Body {...menuItem1} />
                    </Card>
                    <Card sameHeight>
                        <Card.Body {...menuItem2} />
                    </Card>
                    <Card sameHeight>
                        <Card.Body {...menuItem3} />
                    </Card>
                </GridContainer>
            </Section>

            <Section>
                <HeroSplit>
                    <HeroSplit.Image path="/src/assets/gyro.png" />
                    <HeroSplit.HeroSplitContent
                        title="We provide healthy food for you family."
                        subtitle="Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city's rich culinary culture, we aim to honor our local roots while infusing a global palate."
                        secondaryCtaText="More About Us"
                        secondaryCtaLink="#"
                        className="d-flex h-100 justify-content-center"
                    />
                </HeroSplit>
            </Section>

            <Section title="We also offer unique services for your events">
                <GridContainer numberOfColumns={4}>
                    <Card sameHeight>
                        <Card.Image src="/src/assets/kebab-set-table.png" />
                        <Card.Body
                            title="Caterings"
                            text="In the new era of technology we look in the future with certainty for life."
                        />
                    </Card>
                    <Card sameHeight>
                        <Card.Image src="/src/assets/charming-lady.png" />
                        <Card.Body
                            title="Birthdays"
                            text="In the new era of technology we look in the future with certainty for life."
                        />
                    </Card>
                    <Card sameHeight>
                        <Card.Image src="/src/assets/man-wife-sunnyday.png" />
                        <Card.Body
                            title="Weddings"
                            text="In the new era of technology we look in the future with certainty for life."
                        />
                    </Card>
                    <Card sameHeight>
                        <Card.Image src="/src/assets/group-friends-eating-restaurant.png" />
                        <Card.Body
                            title="Events"
                            text="In the new era of technology we look in the future with certainty for life."
                        />
                    </Card>
                </GridContainer>
            </Section>

            {/* refactor into compound pattern */}
            <Section>
                <HeroSplit>
                    <HeroSplit.Image path="/src/assets/chef.png" />
                    <HeroSplit.HeroSplitContent
                        title="Fastest Food Delivery in City"
                        subtitle="Our Visual designer lets you quickly and of drag a down your way to custom maps for both keep desktop."
                        className="d-flex h-100 justify-content-center"
                    />
                </HeroSplit>
            </Section>

            {/* TODO: add footer for the cards and refactor card Component into compound pattern */}
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

            <Section
                style={{ minHeight: "80vh" }}
                className=" d-flex flex-column justify-content-evenly"
            >
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h1>Our Blog Articles</h1>
                    <button className="theme-button">Read all articles</button>
                </div>
                <div className="row row-cols-md-2 g-3">
                    <div className="col ">
                        <Card sameHeight>
                            <Card.Image src="/src/assets/burger-sandwich.png" />
                            <Card.Body
                                title="The secret tips & tricks to prepare a perfect burger & pizza for our customers"
                                subtitle="Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas."
                            />
                        </Card>
                    </div>
                    <div className="col row row-cols-md-2 g-3">
                        <div className="col ">
                            <Card sameHeight>
                                <Card.Image src="/src/assets/fries.png" />
                                <Card.Body title="How to prepare the perfect french fries in an air fryer" />
                            </Card>
                        </div>
                        <div className="col ">
                            <Card sameHeight>
                                <Card.Image src="/src/assets/tenders.png" />
                                <Card.Body title="How to prepare delicious chicken tenders" />
                            </Card>
                        </div>
                        <div className="col ">
                            <Card sameHeight>
                                <Card.Image src="/src/assets/cupcakespng.png" />
                                <Card.Body title="7 delicious cheesecake recipes you can prepare" />
                            </Card>
                        </div>
                        <div className="col ">
                            <Card sameHeight>
                                <Card.Image src="/src/assets/pizza.png" />
                                <Card.Body title="5 great pizza restaurants you should visit this city" />
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
