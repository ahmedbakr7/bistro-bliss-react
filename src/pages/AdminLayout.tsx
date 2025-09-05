import type { ReactNode } from "react";
import AdminNavbar from "../components/Admin/AdminNavBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout(): ReactNode {
    return (
        <>
            <AdminNavbar />
            <main style={{ height: "87vh" }}>
                {/* Flex container to allow sidebar (e.g., QueryBuilder) + main content */}
                <section className="w-100 h-100 d-flex flex-row overflow-hidden theme-bg-surface">
                    <Outlet />
                </section>
            </main>
        </>
    );
}
