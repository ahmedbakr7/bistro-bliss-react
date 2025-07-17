import React, { type HTMLAttributes } from "react";
import Roundel from "./Roundel/Roundel";

// You would typically import these from your assets
// Example: import facebookIcon from "../assets/icons/facebook.svg";
const socialIcons = {
    facebook: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg",
    twitter: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg",
    instagram:
        "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg",
    youtube: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/youtube.svg",
};

interface SocialMediaProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export default function SocialMedia({
    className = "",
}: SocialMediaProps): React.ReactNode {
    return (
        <div
            className={`social-media-container ${className}`}
            style={{ display: "flex", gap: "12px" }}
        >
            <Roundel
                image={socialIcons.facebook}
                href="https://facebook.com"
                alt="Facebook"
                size={36}
                bgColor="white"
                borderColor="var(--color-border)"
                style={{
                    boxShadow: "var(--shadow-sm)",
                    transition: "transform 0.2s",
                }}
                className="social-icon hover-effect"
            />

            <Roundel
                image={socialIcons.twitter}
                href="https://twitter.com"
                alt="Twitter"
                size={36}
                bgColor="white"
                borderColor="var(--color-border)"
            />

            <Roundel
                image={socialIcons.instagram}
                href="https://instagram.com"
                alt="Instagram"
                size={36}
                bgColor="white"
                borderColor="var(--color-border)"
            />

            <Roundel
                image={socialIcons.youtube}
                href="https://youtube.com"
                alt="YouTube"
                size={36}
                bgColor="white"
                borderColor="var(--color-border)"
            />

        </div>
    );
}
