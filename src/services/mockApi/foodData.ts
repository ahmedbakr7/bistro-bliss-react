// Define food category types as string constants
export const FoodCategory = {
    MainDish: "Main Dish",
    Appetizer: "Appetizer",
    Dessert: "Dessert",
    Beverage: "Beverage",
    SideDish: "Side Dish",
    Breakfast: "Breakfast",
} as const;

// Define type for food categories
export type FoodCategory = (typeof FoodCategory)[keyof typeof FoodCategory];

// Define food item interface
export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    isPopular?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    spicyLevel?: number; // 0-3, where 0 is not spicy and 3 is very spicy
}

// Create mock food data
export const foodItems: FoodItem[] = [
    // Main Dishes
    {
        id: "burger-1",
        name: "Signature Burger",
        description:
            "Premium beef patty with lettuce, tomato, cheese and our secret sauce on a brioche bun",
        price: 12.99,
        imageUrl: "/src/assets/burger-sandwich.png",
        category: FoodCategory.MainDish,
        isPopular: true,
        spicyLevel: 1,
    },
    {
        id: "pizza-1",
        name: "Margherita Pizza",
        description:
            "Classic pizza with tomato sauce, mozzarella, fresh basil, and olive oil",
        price: 14.5,
        imageUrl: "/src/assets/pizza.png",
        category: FoodCategory.MainDish,
        isVegetarian: true,
    },
    {
        id: "curry-1",
        name: "Chicken Curry",
        description:
            "Tender chicken in a rich curry sauce served with basmati rice",
        price: 16.99,
        imageUrl: "/src/assets/curry-plate.png",
        category: FoodCategory.MainDish,
        spicyLevel: 2,
    },
    {
        id: "salmon-1",
        name: "Grilled Salmon",
        description:
            "Fresh salmon fillet grilled to perfection with lemon herb butter",
        price: 18.95,
        imageUrl: "/src/assets/meats-plate.png",
        category: FoodCategory.MainDish,
        isGlutenFree: true,
    },
    {
        id: "stirfry-1",
        name: "Vegetable Stir Fry",
        description:
            "Seasonal vegetables stir-fried in a savory sauce with steamed rice",
        price: 13.5,
        imageUrl: "/src/assets/salad.png",
        category: FoodCategory.MainDish,
        isVegetarian: true,
        isGlutenFree: true,
    },

    // Appetizers
    {
        id: "tenders-1",
        name: "Chicken Tenders",
        description:
            "Crispy breaded chicken tenders served with honey mustard sauce",
        price: 8.95,
        imageUrl: "/src/assets/tenders.png",
        category: FoodCategory.Appetizer,
    },
    {
        id: "fries-1",
        name: "Loaded Fries",
        description:
            "Crispy fries topped with cheese, bacon bits, and green onions",
        price: 7.5,
        imageUrl: "/src/assets/fries.png",
        category: FoodCategory.Appetizer,
        isPopular: true,
        spicyLevel: 1,
    },
    {
        id: "gyro-1",
        name: "Gyro Platter",
        description: "Traditional gyro meat with tzatziki sauce and pita bread",
        price: 9.99,
        imageUrl: "/src/assets/gyro.png",
        category: FoodCategory.Appetizer,
    },

    // Side Dishes
    {
        id: "mac-1",
        name: "Mac & Cheese",
        description:
            "Creamy macaroni and cheese with a crispy breadcrumb topping",
        price: 6.5,
        imageUrl: "/src/assets/mac&cheese.png",
        category: FoodCategory.SideDish,
        isVegetarian: true,
    },
    {
        id: "salad-1",
        name: "Greek Salad",
        description:
            "Fresh salad with tomatoes, cucumbers, olives, and feta cheese",
        price: 8.95,
        imageUrl: "/src/assets/salad.png",
        category: FoodCategory.SideDish,
        isVegetarian: true,
        isGlutenFree: true,
    },

    // Breakfast
    {
        id: "pancake-1",
        name: "Pancake Stack",
        description:
            "Fluffy pancakes served with maple syrup and fresh berries",
        price: 10.95,
        imageUrl: "/src/assets/pancakes.png",
        category: FoodCategory.Breakfast,
        isVegetarian: true,
    },
    {
        id: "breakfast-1",
        name: "Breakfast Platter",
        description: "Eggs, bacon, hash browns, and toast served with coffee",
        price: 12.99,
        imageUrl: "/src/assets/meats-plate.png",
        category: FoodCategory.Breakfast,
        isPopular: true,
    },

    // Desserts
    {
        id: "cupcake-1",
        name: "Chocolate Cupcake",
        description: "Rich chocolate cupcake with buttercream frosting",
        price: 4.5,
        imageUrl: "/src/assets/cupcakespng.png",
        category: FoodCategory.Dessert,
        isVegetarian: true,
    },
    {
        id: "cheesecake-1",
        name: "Cheesecake",
        description: "Creamy New York style cheesecake with berry compote",
        price: 6.95,
        imageUrl: "/src/assets/pancakes.png",
        category: FoodCategory.Dessert,
        isVegetarian: true,
        isPopular: true,
    },

    // Beverages
    {
        id: "lemonade-1",
        name: "Fresh Lemonade",
        description: "Freshly squeezed lemonade with mint leaves",
        price: 3.5,
        imageUrl: "/src/assets/placeholder_image.png",
        category: FoodCategory.Beverage,
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: "coffee-1",
        name: "Iced Coffee",
        description: "Cold brewed coffee served over ice with cream and sugar",
        price: 4.25,
        imageUrl: "/src/assets/placeholder_image.png",
        category: FoodCategory.Beverage,
        isVegetarian: true,
        isGlutenFree: true,
    },
];

// Mock API functions
export const getFoodItems = (): Promise<FoodItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(foodItems);
        }, 500); // Simulate network delay
    });
};

export const getFoodItemById = (id: string): Promise<FoodItem | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = foodItems.find((item) => item.id === id);
            resolve(item);
        }, 300);
    });
};

export const getFoodItemsByCategory = (
    category: string
): Promise<FoodItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items = foodItems.filter(
                (item) => item.category === category
            );
            resolve(items);
        }, 400);
    });
};

export const getPopularFoodItems = (): Promise<FoodItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const popularItems = foodItems.filter((item) => item.isPopular);
            resolve(popularItems);
        }, 400);
    });
};
