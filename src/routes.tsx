import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import PagesPage from "./pages/PagesPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/Homepage";

const paths = {
    homePage: "/",
    about: "/about",
    menu: "/menu",
    pages: "/pages",
    contact: "/contact",
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
                element: <ContactPage />,
                path: paths.contact,
            },
        ],
    },
]);
export default router;
