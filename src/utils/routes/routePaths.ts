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
  | "/admin";

// Path constants for use throughout the application
export const paths: Record<string, AppRoutePath> = {
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
};
