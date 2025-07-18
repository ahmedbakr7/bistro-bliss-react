import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import SocialMedia from "../SocialMedia";
import "./Navbar.css";

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
                        <li className="nav-item">
                            <div className="d-flex align-items-center">
                                <FiPhone color="white" className="me-2" />
                                <span className="text-white">
                                    (414) 857 - 0107
                                </span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="d-flex align-items-center">
                                <FiPhone color="white" className="me-2" />
                                <span className="">yummy@bistrobliss</span>
                            </div>
                        </li>
                    </ul>
                    <SocialMedia />
                </div>
            </nav>

            <nav role="navigation" className="navbar navbar-expand">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to={"/"}>
                        <img src="/public/images/logo.png" className="me-2" alt="" />
                        <h1 className="bistro-brand text-center m-0 fst-italic" style={{
                            fontWeight:"600"
                        }}>Bistro Bliss</h1>
                    </Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to={"/"}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={"/favorites"}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                Favorites
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
