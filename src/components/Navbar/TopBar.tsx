import type { ReactNode } from "react";
import { FiPhone, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import SocialMediaRoundels from "../SocialMedia";
import { Link } from "react-router-dom";
import { paths } from "../../utils/routes/routePaths";
import useAuthContext from "../../stores/AuthContext/useAuthContext";

export default function TopBar(): ReactNode {
    const { authState } = useAuthContext();
    const isAuthenticated = !!authState.user;

    // Slightly smaller square icon button style with rounded edges
    const iconBtnStyle: React.CSSProperties = {
        width: 34,
        height: 34,
        padding: 0,
        borderRadius: 8,
    };

    return (
        <nav role="navigation" className="navbar theme-icon navbar-expand">
            <div className="container d-flex align-items-center justify-content-between">
                <ul className="navbar-nav g-2 flex-row">
                    <li className="nav-item me-3">
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

                <div className="d-flex align-items-center gap-3">
                    <SocialMediaRoundels />
                    {isAuthenticated ? (
                        <div className="d-flex align-items-center gap-2">
                            {/* Notifications */}
                            <button
                                type="button"
                                aria-label="Notifications"
                                className="theme-btn-primary btn-sm d-flex align-items-center justify-content-center"
                                style={iconBtnStyle}
                                onClick={() => {
                                    // TODO: open notifications panel
                                }}
                            >
                                <IoNotificationsOutline size={18} />
                            </button>
                            {/* Cart */}
                            <Link
                                to={paths.cart}
                                aria-label="Cart"
                                className="theme-btn-primary btn-sm d-flex align-items-center justify-content-center position-relative"
                                style={iconBtnStyle}
                            >
                                <FiShoppingCart size={16} />
                                {/* <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle">2</span> */}
                            </Link>
                            {/* Favourites / Wishlist */}
                            <Link
                                to={paths.wishlist}
                                aria-label="Favourites"
                                className="theme-btn-primary btn-sm d-flex align-items-center justify-content-center"
                                style={iconBtnStyle}
                            >
                                <FiHeart size={16} />
                            </Link>
                            {/* Profile */}
                            <Link
                                to={paths.profile}
                                aria-label="Profile"
                                className="theme-btn-primary btn-sm d-flex align-items-center justify-content-center"
                                style={iconBtnStyle}
                            >
                                <FiUser size={16} />
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-2">
                            <Link
                                to={paths.login}
                                className="theme-btn-secondary btn-sm px-3"
                                style={{ borderRadius: 8 }}
                            >
                                Sign In
                            </Link>
                            <Link
                                to={paths.register}
                                className="theme-btn-primary btn-sm px-3"
                                style={{ borderRadius: 8 }}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
