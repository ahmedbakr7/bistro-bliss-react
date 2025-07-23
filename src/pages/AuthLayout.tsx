import type { ReactNode } from "react";
import AuthNavbar from "../components/Auth/AuthNav";
import { Outlet } from "react-router-dom";

export default function AuthLayout(): ReactNode {
    return (
        <>
            <AuthNavbar />
            <main style={{ height: "85vh" }}>
                <section className="w-100 h-100 theme-bg-surface d-flex justify-content-center align-items-center">
                    <Outlet />
                </section>
            </main>
        </>
    );
}
