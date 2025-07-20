import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
    className?: string;
    style?: CSSProperties;
    [key: string]: unknown;
}

export default function Logo({
    className = "",
    style,
    ...restProps
}: LogoProps): ReactNode {
    return (
        <Link
            {...restProps}
            className={`navbar-brand d-flex align-items-center ${className}`}
            to={"/"}
        >
            <img src="/public/images/logo.png" className="me-2" alt="" />
            <h1
                className="bistro-brand text-center m-0 fst-italic"
                style={{
                    fontWeight: "600",
                    fontSize: style?.fontSize,
                }}
            >
                Bistro Bliss
            </h1>
        </Link>
    );
}
