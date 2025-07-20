import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useHeroSplitContext } from "./useHeroSplitContext";

interface HeroImageProps extends HTMLAttributes<HTMLElement>{
    imageStyles?: CSSProperties;
    path: string;
}

export default function HeroImage({
    path="/public/images/placeholder_image.png",
    style,
    className=""
}:HeroImageProps): ReactNode {
    const {center} = useHeroSplitContext()
    style = {
        ...style,
        backgroundColor: "grey",
        backgroundImage: path ? `url(${path})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    return (
        <div
            className={`${className} col-lg-6 ${
                center
                    ? "position-absolute top-0 start-0 vw-100 vh-100 z-n1"
                    : ""
            }`}
            style={style}
        ></div>
    );
}
