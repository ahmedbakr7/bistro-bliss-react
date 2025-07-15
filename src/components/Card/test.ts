// Basic Menu Item Card
export const menuItem1 = {
    title: "Fettuccine Alfredo",
    subtitle: "$16.99",
    text: "Creamy Alfredo sauce with perfectly cooked fettuccine pasta, topped with grated parmesan and fresh parsley.",
};

// Card with Footer
export const menuItem2 = {
    image: {
        src: "/images/menu/steak.jpg",
        alt: "Premium Ribeye Steak",
    },
    title: "Premium Ribeye Steak",
    subtitle: "$28.99",
    text: "10oz premium cut ribeye steak, grilled to perfection and served with roasted vegetables and mashed potatoes.",
    footer: "Chef's special",
};

// Card with Links
export const menuItem3 = {
    title: "Mediterranean Salad",
    subtitle: "$12.99",
    text: "Fresh mixed greens with feta cheese, olives, cherry tomatoes, and our house dressing.",
    links: [
        { text: "Nutrition Info", href: "#nutrition-info" },
        { text: "Allergens", href: "#allergens" },
    ],
};

// Card with Header
export const dessertItem = {
    image: {
        src: "/images/menu/tiramisu.jpg",
        alt: "Classic Tiramisu",
    },
    header: "Desserts",
    title: "Classic Tiramisu",
    subtitle: "$8.99",
    text: "Traditional Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.",
};

// Card with Image Overlay
export const specialItem = {
    image: {
        src: "/images/menu/seafood-platter.jpg",
        alt: "Seafood Platter",
    },
    imageOverlay: true,
    title: "Seafood Platter",
    subtitle: "$34.99",
    text: "A delightful assortment of fresh seafood including shrimp, mussels, and calamari, served with our signature sauce.",
};
