import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import PagesPage from "./pages/PagesPage";
import ContactPage from "./pages/contact/ContactPage";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/book/BookPage";
import PageDetailsPage from "./pages/PageDetailsPage";
import WishlistPage from "./pages/Wishlist";
import ProfilePage from "./pages/Profile";
import AdminLayout from "./pages/AdminLayout";
import AuthLayout from "./pages/AuthLayout";
import AuthLogin from "./components/Auth/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister";
import OtpPage from "./pages/OtpPage";

export const paths = {
    homePage: "/",
    about: "/about",
    menu: "/menu",
    pages: "/pages",
    contact: "/contact",
    book: "/book",
    pageDetails: "/page-details",
    wishlist: "/wishlist",
    profile: "/profile",
    login: "/auth/login",
    register: "/auth/register",
    otp: "/auth/otp",
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
                element: <WishlistPage />,
                path: paths.wishlist,
            },
            {
                element: <ProfilePage />,
                path: paths.profile,
            },
            {
                element: <ContactPage />,
                path: paths.contact,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                element: <AuthLogin />,
                index: true,
            },
            {
                element: <AuthLogin />,
                path: paths.login,
            },
            {
                element: <AuthRegister />,
                path: paths.register,
            },
            {
                element: <OtpPage />,
                path: paths.otp,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [],
    },
]);
export default router;
