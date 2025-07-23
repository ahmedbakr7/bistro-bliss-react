import type { ReactNode } from "react";
import Logo from "../Navbar/Logo";
import { NavLink } from "react-router-dom";

export default function AuthNavbar(): ReactNode {
    return (
        <header>
            <nav role="navigation" className="navbar navbar-expand">
                <div className="container">
                    <Logo />
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to={"/"}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Home</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={"/"}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>About</b>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
