import type { ReactNode } from "react";
import AdminNavbar from "../components/Admin/AdminNavBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout(): ReactNode {
    return (
        <>
            <AdminNavbar />
            <main style={{ height: "89vh" }}>
                <section className="w-100 h-100 container theme-bg-surface justify-content-center align-items-center">
                    <Outlet />
                </section>
            </main>
        </>
    );
}
