import { Card } from "../components/Card";
import type { ReactNode } from "react";
import GridContainer from "../components/GridContainer";
import Section from "../components/Section";

// Related blog posts data
const relatedPosts = [
    {
        id: 1,
        date: "January 3, 2023",
        title: "How to prepare a delicious gluten free sushi",
        image: "/src/assets/curry-plate.png",
    },
    {
        id: 2,
        date: "January 3, 2023",
        title: "Exclusive baking lessons from the pastry king",
        image: "/src/assets/cupcakespng.png",
    },
    {
        id: 3,
        date: "January 3, 2023",
        title: "How to prepare the perfect fries in an air fryer",
        image: "/src/assets/fries.png",
    },
    {
        id: 4,
        date: "January 3, 2023",
        title: "How to prepare delicious chicken tenders",
        image: "/src/assets/tenders.png",
    },
];

export default function PageDetailsPage(): ReactNode {
    return (
        <main className="py-5">
            <Section title="The secret tips & tricks to prepare a perfect burger & pizza for our customers">
                <div
                    className="w-100 "
                    style={{
                        top: "350px",
                        height: "700px",
                        backgroundColor: "grey",
                        backgroundImage: "url(/src/assets/map.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: -1,
                    }}
                ></div>
                <h4>what do you need to prepare a home-made burger?</h4>
                <p>
                    Creating the perfect burger and pizza is an art, combining
                    ingredients, techniques, and passion to craft dishes that
                    truly delight the palate. Today, we'll unveil some closely
                    guarded secrets and insider tips for mastering these beloved
                    staples of the culinary world.
                </p>
                <ol>
                    <li>
                        Quality Beef: The heart of a perfect burger is top-notch
                        beef. Opt for fresh, high-quality ground beef with a fat
                        content of about 20% for the juiciest, most flavorful
                        results.
                    </li>
                    <li>
                        Seasoning: Simplicity is key here. A generous pinch of
                        salt and black pepper just before cooking will enhance
                        the beef's natural flavors without overshadowing them.
                    </li>
                    <li>
                        Don’t Overwork the Meat: When forming your patties, be
                        gentle. Overworking the meat can lead to dense, tough
                        burgers. You want a patty that's firm enough to hold
                        together, but not compressed.
                    </li>
                    <li>
                        Cooking: High heat is crucial. Whether you're grilling
                        or pan-searing, make sure your cooking surface is hot
                        enough to form a nice crust on the patty, sealing in
                        those delicious juices.
                    </li>
                    <li>
                        Resting: Allow your cooked burgers to rest for a few
                        minutes before serving. This lets the juices
                        redistribute throughout the patty, ensuring a moist and
                        flavorful bite.
                    </li>
                </ol>
                <p>What are the right ingredients to make it delicious?</p>
                <ol>
                    <li>
                        Quality Beef: The heart of a perfect burger is top-notch
                        beef. Opt for fresh, high-quality ground beef with a fat
                        content of about 20% for the juiciest, most flavorful
                        results.
                    </li>
                    <li>
                        Seasoning: Simplicity is key here. A generous pinch of
                        salt and black pepper just before cooking will enhance
                        the beef's natural flavors without overshadowing them.
                    </li>
                    <li>
                        Don’t Overwork the Meat: When forming your patties, be
                        gentle. Overworking the meat can lead to dense, tough
                        burgers. You want a patty that's firm enough to hold
                        together, but not compressed.
                    </li>
                    <li>
                        Cooking: High heat is crucial. Whether you're grilling
                        or pan-searing, make sure your cooking surface is hot
                        enough to form a nice crust on the patty, sealing in
                        those delicious juices.
                    </li>
                    <li>
                        Resting: Allow your cooked burgers to rest for a few
                        minutes before serving. This lets the juices
                        redistribute throughout the patty, ensuring a moist and
                        flavorful bite.
                    </li>
                </ol>

                <div
                    className="w-100 "
                    style={{
                        top: "350px",
                        height: "700px",
                        backgroundColor: "grey",
                        backgroundImage: "url(/src/assets/map.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: -1,
                    }}
                ></div>
                <h4>
                    What are the right ingredients to make it delicious?What are
                    the right ingredients to make it delicious?
                </h4>
                <p>
                    Proin faucibus nec mauris a sodales, sed elementum mi
                    tincidunt. Sed eget viverra egestas nisi in consequat. Fusce
                    sodales augue a accumsa Cras sollicitudin, le ligula,
                    porttitor eu, consequat vitae, eleifend ac, enim. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit lobortis
                    arcu enim urna adipiscing praesent velit viverra sit semper
                    lorem eu cursus ve of all hendrerit elementum morbi
                    curabitur etiam nibh justo, lorem aliquet donec sed sit mi
                    dignissim at ante massa mattis magna sit amet purus gravida
                    quis blandit turpis..
                </p>
            </Section>
            <Section title="Read More Articles">
                <p>
                    We consider all the drivers of change gives you the
                    components you need to change to create a truly happens.
                </p>
                <GridContainer numberOfColumns={4}>
                    {relatedPosts.map((post) => (
                        <Card sameHeight className="text-start" key={post.id}>
                            <Card.Image src={post.image} />
                            <h6 className="card-subtitle m-2 text-muted">
                                {post.date}
                            </h6>
                            <Card.Body title={post.title} />
                        </Card>
                    ))}
                </GridContainer>
            </Section>
        </main>
    );
}
