import { type ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function RootLayout(): ReactNode {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
