import type { ReactNode } from "react";
import Logo from "./Navbar/Logo";
import SocialMediaRoundels from "./SocialMedia/SocialMediaRoundels";
import { paths } from "../utils/routes/routePaths";
import { Link } from "react-router-dom";

export default function Footer(): ReactNode {
    return (
        <footer className="theme-icon d-flex flex-column justify-content-between theme-text-disabled p-5 ">
            <div className="row  row-cols-1 row-cols-sm-2 row-cols-lg-4">
                <div className="col theme-text-inverse">
                    <Logo
                        style={{ fontSize: "32.67px " }}
                        className="text-start"
                    />
                    <p>
                        In the new era of technology we look in the future with
                        certainty and pride for our company
                    </p>
                    <SocialMediaRoundels />
                </div>

                <div className="col">
                    <b className="mb-4 theme-text-inverse">Pages</b>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={paths.homePage} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.about} className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.menu} className="nav-link">
                                Menu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.pages} className="nav-link">
                                Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.contact} className="nav-link">
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.menu} className="nav-link">
                                Delivery
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col">
                    <b className="mb-4 theme-text-inverse">Utility Pages</b>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Start Here
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Styleguid
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Password Protected
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                404 Not Found
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Licenses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Changelog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                View More
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col d-flex flex-column ">
                    <b className="mb-4 theme-text-inverse">
                        Follow Us On Instagram
                    </b>
                    <div className="row p-2 g-4 row-cols-xl-2">
                        <div
                            className="col-xl "
                            style={{ height: "121.06px", width: "137.29px" }}
                        >
                            <img
                                className="rounded-4 h-100"
                                src="/src/assets/mac&cheese.png"
                                alt=""
                            />
                        </div>
                        <div
                            className="col-xl "
                            style={{ height: "121.06px", width: "137.29px" }}
                        >
                            <img
                                className="rounded-4 h-100"
                                src="/src/assets/fries.png"
                                alt=""
                            />
                        </div>
                        <div
                            className="col-xl "
                            style={{ height: "121.06px", width: "137.29px" }}
                        >
                            <img
                                className="rounded-4 h-100"
                                src="/src/assets/salad.png"
                                alt=""
                            />
                        </div>
                        <div
                            className="col-xl "
                            style={{ height: "121.06px", width: "137.29px" }}
                        >
                            <img
                                className="rounded-4 h-100"
                                src="/src/assets/pancakes.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-5 text-center">
                Copyright © 2023 Hashtag Developer. All Rights Reserved
            </p>
        </footer>
    );
}
