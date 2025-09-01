/**
 * Application route paths with TypeScript types
 */

// Define all route paths as a type
export type AppRoutePath =
    | "/"
    | "/about"
    | "/menu"
    | "/pages"
    | "/contact"
    | "/book"
    | "/page-details"
    | "/wishlist"
    | "/profile"
    | "/auth/login"
    | "/auth/register"
    | "/auth/otp"
    | "/admin"
    | "/admin/users"
    | "/admin/products"
    | "/admin/orders"
    | "/admin/contacts"
    | "/admin/bookings";

// Path constants for use throughout the application
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
    admin: "/admin",
    adminUsers: "/admin/users",
    adminProducts: "/admin/products",
    adminOrders: "/admin/orders",
    adminContacts: "/admin/contacts",
    adminBookings: "/admin/bookings",
};
