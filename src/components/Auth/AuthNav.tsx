import type { ReactNode } from "react";
import Logo from "../Navbar/Logo";
import { NavLink } from "react-router-dom";
import { paths } from "../../routes";

export default function AuthNavbar(): ReactNode {
    return (
        <header>
            <nav role="navigation" className="navbar navbar-expand">
                <div className="container">
                    <Logo />
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to={paths.login}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Login</b>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={paths.register}
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " active" : ""}`
                                }
                            >
                                <b>Register</b>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
