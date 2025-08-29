import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import "./Navbar.css";
import Logo from "./Logo";
import { MdOutlineMail } from "react-icons/md";
import SocialMediaRoundels from "../SocialMedia";
import { paths } from "../../utils/routes/routes";

// interface NavbarProps {
//     children: ReactNode;
//     [key: string]: unknown;
// }

export default function Navbar(): ReactNode {
    return (
        <header>
            <nav role="navigation" className="navbar theme-icon navbar-expand">
                <div className="container">
                    <ul className="navbar-nav g-2">
                        <li className="nav-item me-2">
                            <div className="d-flex align-items-center">
                                <FiPhone color="white" className="me-2" />
                                <span className="theme-text-inverse">
                                    (414) 857 - 0107
                                </span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="d-flex align-items-center">
                                <MdOutlineMail color="white" className="me-2" />
                                <span className="theme-text-inverse">
                                    yummy@bistrobliss
                                </span>
                            </div>
                        </li>
                    </ul>
                    <SocialMediaRoundels className="" />
                </div>
            </nav>

            <nav role="navigation" className="navbar navbar-expand">
                <div className="container">
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
