import type { ReactNode } from "react";
// import Hero from "../components/Hero/Hero";
import Section from "../components/Section";
import Card from "../components/Card/Card";
import { HeroFullScreen, HeroSplit } from "../components/Hero";
import { menuItem1, menuItem2, menuItem3 } from "../components/Card/test";
import GridContainer from "../components/GridContainer";
import Roundel from "../components/Roundel/Roundel";
import {
    CoffecupIcon,
    DessertIcon,
    DishIcon,
    DrinkIcon,
} from "../common/constants/Svgs";

export default function HomePage(): ReactNode {
    return (
        <main>
            <HeroFullScreen
                height="85vh"
                title="Best food for
your taste"
                subtitle="Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven."
                ctaText="Reserve Your Table"
                image="/src/assets/bg-hero.png"
                secondaryCtaText="Explore Menu"
            />

            <Section title="Browse Our Menu" className="text-center my-5 py-5 ">
                <GridContainer
                    className="text-center"
                    numberOfColumns={4}
                    spacing={5}
                >
                    <Card sameHeight className="align-items-center theme-card-border p-4">
                        <Roundel
                            href="#"
                            className="theme-bg-surface rounded-circle"
                            style={{ padding: "8%" }}
                        >
                            <CoffecupIcon />
                        </Roundel>
                        <Card.Body {...menuItem1} />
                    </Card>
                    <Card sameHeight className="align-items-center theme-card-border p-4">
                        <Roundel
                            href="#"
                            className="theme-bg-surface rounded-circle"
                            style={{ padding: "8%" }}
                        >
                            <DishIcon />
                        </Roundel>
                        <Card.Body {...menuItem2} />
                    </Card>
                    <Card sameHeight className="align-items-center theme-card-border p-4">
                        <Roundel
                            href="#"
                            className="theme-bg-surface rounded-circle"
                            style={{ padding: "8%" }}
                        >
                            <DrinkIcon />
                        </Roundel>
                        <Card.Body {...menuItem3} />
                    </Card>
                    <Card sameHeight className="align-items-center theme-card-border p-4">
                        <Roundel
                            href="#"
                            className="theme-bg-surface rounded-circle"
                            style={{ padding: "8%" }}
                        >
                            <DessertIcon />
                        </Roundel>
                        <Card.Body {...menuItem3} />
                    </Card>
                </GridContainer>
            </Section>

            <Section
                className="theme-bg-surface "
                style={{ padding: "0", width: "100%", maxWidth: "None" }}
            >
                <HeroSplit
                    style={{ padding: "120px 150px" }}
                >
                    <HeroSplit.Image
                        path="/src/assets/gyro.png"
                        style={{ width: "599px", height: "566px" }}
                    />
                    <div
                        className="p-5 theme-text-inverse w-auto position-absolute theme-icon d-flex flex-column justify-content-between "
                        style={{ width: "411px", height: "321px" }}
                    >
                        <h3 className="mb-3">Come and visit us</h3>
                        <div className="d-flex">
                            <svg
                                className="me-3"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 3C1 1.89543 1.89543 1 3 1H6.27924C6.70967 1 7.09181 1.27543 7.22792 1.68377L8.72574 6.17721C8.88311 6.64932 8.66938 7.16531 8.22427 7.38787L5.96701 8.5165C7.06925 10.9612 9.03878 12.9308 11.4835 14.033L12.6121 11.7757C12.8347 11.3306 13.3507 11.1169 13.8228 11.2743L18.3162 12.7721C18.7246 12.9082 19 13.2903 19 13.7208V17C19 18.1046 18.1046 19 17 19H16C7.71573 19 1 12.2843 1 4V3Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <p>(414) 857 - 0107</p>
                        </div>
                        <div className="d-flex">
                            <svg
                                className="me-3"
                                width="20"
                                height="16"
                                viewBox="0 0 20 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 4L8.8906 9.2604C9.5624 9.70827 10.4376 9.70827 11.1094 9.2604L19 4M3 15H17C18.1046 15 19 14.1046 19 13V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>

                            <p>happytummy@restaurant.com</p>
                        </div>
                        <div className="d-flex">
                            <svg
                                className="me-3"
                                width="18"
                                height="21"
                                viewBox="0 0 18 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.6569 14.6569C13.7202 15.5935 11.7616 17.5521 10.4138 18.8999C9.63275 19.681 8.36768 19.6814 7.58663 18.9003C6.26234 17.576 4.34159 15.6553 3.34315 14.6569C0.218951 11.5327 0.218951 6.46734 3.34315 3.34315C6.46734 0.218951 11.5327 0.218951 14.6569 3.34315C17.781 6.46734 17.781 11.5327 14.6569 14.6569Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>

                            <p>
                                837 W. Marshall Lane Marshalltown, IA 50158, Los
                                Angeles
                            </p>
                        </div>
                    </div>
                    <HeroSplit.HeroSplitContent
                        title="We provide healthy food for you family."
                        subtitle="Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city's rich culinary culture, we aim to honor our local roots while infusing a global palate."
                        secondaryCtaText="More About Us"
                        secondaryCtaLink="#"
                        className="d-flex col h-100 justify-content-center"
                        // style={{flex:"1 0 0"}}
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
