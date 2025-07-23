import type { ReactNode } from "react";
import Section from "../components/Section";
import { HeroSplit } from "../components/Hero";
import HeroContent from "../components/Hero/HeroContent";
import { Card } from "../components/Card";
import GridContainer from "../components/GridContainer";
import Roundel from "../components/Roundel/Roundel";

export default function AboutPage(): ReactNode {
    return (
        <main>
            <Section
                style={{ padding: "141px 0", width: "100%" }}
                className={`d-flex align-items-center justify-content-center position-relative `}
            >
                <HeroSplit
                    className="container align-items-center gap-5"
                    style={{ padding: "120px 150px" }}
                >
                    <HeroSplit.Image
                        path="/src/assets/gyro.png"
                        className="position-relative rounded-5"
                        style={{ width: "599px", height: "566px" }}
                    />
                    <div
                        className="d-none d-xxl-inline-flex rounded-5 p-4 theme-text-inverse w-auto position-absolute theme-icon d-flex flex-column justify-content-between "
                        style={{
                            width: "411px",
                            height: "281px",
                            left: "20vh",
                            top: "20vw",
                        }}
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
                        className="d-flex col h-100 justify-content-center"
                    />
                </HeroSplit>
            </Section>

            <Section className="p-5 theme-bg-surface" style={{maxWidth:"None"}}>
                <HeroSplit className="container">
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

            <Section
                center
                title="What Our Customers Say"
                className="p-5"
                style={{ minHeight: "766px" }}
            >
                <GridContainer
                    id="customers"
                    className="customers g-4"
                    numberOfColumns={3}
                >
                    <Card
                        sameHeight
                        className="justify-content-between  p-4 theme-bg-surface border-0"
                    >
                        <Card.Body
                            title='"The best restaurant"'
                            text="Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles."
                        />
                        <hr />
                        <div className="d-flex align-items-center">
                            <Roundel
                                className="me-2"
                                rounded
                                image={{
                                    className: "rounded-circle",
                                    src: "https://randomuser.me/api/portraits/men/32.jpg",
                                    alt: "Customer Avatar",
                                    style: { height: "81px" },
                                }}
                            />
                            <div className="d-flex flex-column">
                                <b>Sophire Robson</b>
                                <p className="mb-0">Los Angeles</p>
                            </div>
                        </div>
                    </Card>
                    <Card
                        sameHeight
                        className="justify-content-between p-4 theme-bg-surface border-0"
                    >
                        <Card.Body
                            title='"Simply delicious"'
                            text="Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented."
                        />
                        <hr />
                        <div className="d-flex align-items-center">
                            <Roundel
                                className="me-2"
                                rounded
                                image={{
                                    className: "rounded-circle",
                                    src: "https://randomuser.me/api/portraits/men/32.jpg",
                                    alt: "Customer Avatar",
                                    style: { height: "81px" },
                                }}
                            />
                            <div className="d-flex flex-column">
                                <b>Matt Cannon</b>
                                <p className="mb-0">San Diego, CA</p>
                            </div>
                        </div>
                    </Card>
                    <Card
                        sameHeight
                        className="justify-content-between p-4 theme-bg-surface border-0"
                    >
                        <Card.Body
                            title="“One of a kind restaurant”"
                            text="The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended."
                        />
                        <hr />
                        <div className="d-flex align-items-center">
                            <Roundel
                                className="me-2"
                                rounded
                                image={{
                                    className: "rounded-circle",
                                    src: "https://randomuser.me/api/portraits/men/32.jpg",
                                    alt: "Customer Avatar",
                                    style: { height: "81px" },
                                }}
                            />
                            <div className="d-flex flex-column">
                                <b>Andy Smith</b>
                                <p className="mb-0">San Francisco, CA</p>
                            </div>
                        </div>
                    </Card>
                </GridContainer>
            </Section>
        </main>
    );
}
