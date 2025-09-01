import { createBrowserRouter } from "react-router-dom";
import {
    RootLayout,
    AboutPage,
    MenuPage,
    PagesPage,
    ContactPage,
    HomePage,
    BookPage,
    PageDetailsPage,
    WishlistPage,
    ProfilePage,
    AdminLayout,
    AuthLayout,
    AuthLogin,
    AuthRegister,
    OtpPage,
    Users,
    Products,
    Orders,
    Contacts,
    Bookingsx,
} from "./routeImports";

import { paths } from "./routePaths";
import AuthProvider from "../../stores/AuthContext/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <RootLayout />
            </AuthProvider>
        ),
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
        element: (
            <AuthProvider>
                <AuthLayout />
            </AuthProvider>
        ),
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
        element: (
            <AuthProvider>
                <AdminLayout />
            </AuthProvider>
        ),
        children: [
            {
                index: true,
                element: <Users />,
            },
            {
                path: paths.adminUsers,
                element: <Users />,
            },
            {
                path: paths.adminProducts,
                element: <Products />,
            },
            {
                path: paths.adminOrders,
                element: <Orders />,
            },
            {
                path: paths.adminContacts,
                element: <Contacts />,
            },
            {
                path: paths.adminBookings,
                element: <Bookingsx />,
            },
        ],
    },
]);
export default router;
