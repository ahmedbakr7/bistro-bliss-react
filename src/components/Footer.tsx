import type { ReactNode } from "react";
import Logo from "./Navbar/Logo";
import SocialMediaRoundels from "./SocialMedia/SocialMediaRoundels";

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
                        In the new era of technology we look in the futur with
                        certainty and rpide for our company
                    </p>
                    <SocialMediaRoundels />
                </div>

                <div className="col">
                    <b className="mb-4 theme-text-inverse">Pages</b>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href={"/"}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Menu
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Pricing
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Blog
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Contact
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Delivery
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col">
                    <b className="mb-4 theme-text-inverse">Utility Pages</b>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Start Here
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Styleguid
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Password Protected
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                404 Not Found
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Licenses
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                Changelog
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>
                                View More
                            </a>
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
