import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Logo";
import { paths } from "../../utils/routes/routePaths";
import TopBar from "./TopBar";

export default function Navbar(): ReactNode {
    return (
        <header>
            <TopBar />
            {/* Main navigation bar */}
            <nav role="navigation" className="navbar navbar-expand">
                <div className="container-md">
                    <Logo />
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to={paths.homePage}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Home</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={paths.about}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>About</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={paths.menu}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Menu</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={paths.pages}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Pages</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={paths.contact}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Contact</b>
                            </NavLink>
                        </li>
                    </ul>
                    <Link to={paths.book} className="theme-secondary-button">
                        Book A Table
                    </Link>
                </div>
            </nav>
        </header>
    );
}
