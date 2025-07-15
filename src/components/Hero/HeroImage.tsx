import type { CSSProperties, ReactNode } from "react";
import { useHeroSplitContext } from "./useHeroSplitContext";

interface HeroImageProps{
    imageStyles?: CSSProperties;
    path: string;
}

export default function HeroImage({
    path="/public/images/placeholder_image.png",
    imageStyles = {
        aspectRatio: 16 / 9,
        backgroundColor: "grey",
        backgroundImage: path ? `url(${path})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
}:HeroImageProps): ReactNode {
    const {center} = useHeroSplitContext()

    return (
        <div
            className={`col-lg-6 ${
                center
                    ? "position-absolute top-0 start-0 vw-100 vh-100 z-n1"
                    : ""
            }`}
            style={imageStyles}
        ></div>
    );
}
