import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import PagesPage from "./pages/PagesPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import PageDetailsPage from "./pages/PageDetailsPage";

const paths = {
    homePage: "/",
    about: "/about",
    menu: "/menu",
    pages: "/pages",
    contact: "/contact",
    book: "/book",
    pageDetails: "/page-details",
    wishlist: "/wishlist",
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                element: <AboutPage />,
                path: paths.about,
            },
            {
                element: <MenuPage />,
                path: paths.menu,
            },
            {
                element: <PagesPage />,
                path: paths.pages,
            },
            {
                element: <BookPage />,
                path: paths.book,
            },
            {
                element: <PageDetailsPage />,
                path: paths.pageDetails,
            },
            {
                element: <Wishlist />,
                path: paths.wishlist,
            },
            {
                element: <ContactPage />,
                path: paths.contact,
            },
        ],
    },
]);
export default router;
