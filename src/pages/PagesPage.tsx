import type { ReactNode } from "react";
import Section from "../components/Section";
import GridContainer from "../components/GridContainer";
import { Card } from "../components/Card";

// Blog post data with titles, dates, content and images
const blogPosts = [
    {
        id: 1,
        date: "January 3, 2023",
        title: "How to prepare a delicious gluten free sushi",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/curry-plate.png",
    },
    {
        id: 2,
        date: "January 3, 2023",
        title: "Exclusive baking lessons from the pastry king",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/cupcakespng.png",
    },
    {
        id: 3,
        date: "January 3, 2023",
        title: "How to prepare the perfect fries in an air fryer",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/fries.png",
    },
    {
        id: 4,
        date: "January 3, 2023",
        title: "How to prepare delicious chicken tenders",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/tenders.png",
    },
    {
        id: 5,
        date: "January 3, 2023",
        title: "5 great cooking gadgets you can buy to save time",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/chef.png",
    },
    {
        id: 6,
        date: "January 3, 2023",
        title: "The secret tips & tricks to prepare a perfect burger",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/burger-sandwich.png",
    },
    {
        id: 7,
        date: "January 3, 2023",
        title: "7 delicious cheesecake recipes you can prepare",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/pancakes.png",
    },
    {
        id: 8,
        date: "January 3, 2023",
        title: "5 great pizza restaurants you should visit this city",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/pizza.png",
    },
    {
        id: 9,
        date: "January 3, 2023",
        title: "5 great cooking gadgets you can buy to save time",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/meats-plate.png",
    },
    {
        id: 10,
        date: "January 3, 2023",
        title: "How to prepare a delicious gluten free sushi",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/gyro.png",
    },
    {
        id: 11,
        date: "January 3, 2023",
        title: "Top 20 simple and quick desserts for kids",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/mac&cheese.png",
    },
    {
        id: 12,
        date: "January 3, 2023",
        title: "Top 20 simple and quick desserts for kids",
        text: "In the new era of technology we look in the future with certainty for life.",
        image: "/src/assets/salad.png",
    },
];

export default function PagesPage(): ReactNode {
    return (
        <main>
            <Section title="Our Blog & Articles" className="text-center p-5 theme-bg-surface" style={{maxWidth:"none"}}>
                <div className="container">
                                    <p>
                    We consider all the drivers of change gives you the
                    components you need to change to create a truly happens.
                </p>
                <GridContainer numberOfColumns={4} className="g-4 my-4 mb-5">
                    {blogPosts.map((post) => (
                        <Card sameHeight className="rounded-4 text-start" key={post.id}>
                            <Card.Image src={post.image} style={{height:"200px", width:"306px"}} />
                            <h6 className="card-subtitle m-2 text-muted">
                                {post.date}
                            </h6>
                            <Card.Body title={post.title} />
                        </Card>
                    ))}
                </GridContainer>
            </div>
            </Section>
        </main>
    );
}
