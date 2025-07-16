import type { ReactNode } from "react";
import SocialMedia from "./SocialMedia";
import Card from "./Card/Card";

export default function Footer(): ReactNode {
    return (
        <footer className="theme-icon p-5 ">
            <div className="row  row-cols-1 row-cols-sm-2 row-cols-lg-4">
                <div className="col">
                    <h1>Bistro Bliss</h1>
                    <SocialMedia />
                </div>

                <div className="col">
                    <div>Pages</div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href={"/"}>Home</a>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Menu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Delivery</a>
                        </li>
                    </ul>
                </div>

                <div className="col">
                    <div>Utility Pages</div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Start Here</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Styleguid</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Password Protected</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>404 Not Found</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Licenses</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>Changelog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"#"}>View More</a>
                        </li>
                    </ul>
                </div>

                <div className="col d-flex justify-content-between">
                    <h4 className="mb-3">Follow Us On Instagram</h4>
                    <div className="row g-2 row-cols-2">
                        <Card imageOverlay image={{src:"/src/assets/mac&cheese.png"}} />
                    </div>
                    <div className="row g-2 row-cols-2">
                        <Card imageOverlay image={{src:"/src/assets/fries.png"}} />
                    </div>
                    <div className="row g-2 row-cols-2">
                        <Card imageOverlay image={{src:"/src/assets/salad.png"}} />
                    </div>
                    <div className="row g-2 row-cols-2">
                        <Card imageOverlay image={{src:"/src/assets/pancakes.png"}} />
                    </div>
                </div>
            </div>
        </footer>
    );
}
