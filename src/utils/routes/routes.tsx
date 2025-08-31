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
} from "./routeImports";

import { paths } from "./routePaths";
import AuthProvider from "../../stores/AuthContext/AuthProvider";

// Example of route grouping for future use
/*
// Public routes - accessible by anyone
const routesForPublic = [
  {
    path: "/service",
    element: <div>Service Page</div>,
  },
  {
    path: "/about-us",
    element: <div>About Us</div>,
  },
];

// Protected routes - only for authenticated users
const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />, // You'll need to create this component
    children: [
      {
        path: "/",
        element: <div>User Home Page</div>,
      },
      {
        path: "/profile",
        element: <div>User Profile</div>,
      },
      {
        path: "/logout",
        element: <div>Logout</div>,
      },
    ],
  },
];

// Routes for non-authenticated users
const routesForNotAuthenticatedOnly = [
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
];
*/

// Example of how to use route grouping with authentication:
/*
const token = localStorage.getItem('authToken');

const router = createBrowserRouter([
  ...routesForPublic,
  ...(!token ? routesForNotAuthenticatedOnly : []),
  ...(token ? routesForAuthenticatedOnly : []),
]);
*/

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
        children: [],
    },
]);
export default router;
