import type { ReactNode } from "react";
import Logo from "../Navbar/Logo";
import { NavLink } from "react-router-dom";
import { paths } from "../../utils/routes/routePaths";

export default function AdminNavbar(): ReactNode {
    const adminLinks = [
        { to: paths.adminUsers, label: "Users" },
        { to: paths.adminProducts, label: "Products" },
        { to: paths.adminOrders, label: "Orders" },
        { to: paths.adminBookings, label: "Bookings" },
        { to: paths.adminContacts, label: "Contacts" },
    ];

    return (
        <header>
            <nav role="navigation" className="navbar navbar-expand">
                <div className="container">
                    <Logo />
                    <ul className="navbar-nav m-auto">
                        {adminLinks.map((l) => (
                            <li key={l.to} className="nav-item">
                                <NavLink
                                    to={l.to}
                                    className={({ isActive }) =>
                                        `nav-link${isActive ? " active" : ""}`
                                    }
                                >
                                    <b>{l.label}</b>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <h3 className="m-0">Admin</h3>
                </div>
            </nav>
        </header>
    );
}
