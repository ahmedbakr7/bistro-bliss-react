import type { ReactNode, ElementType, CSSProperties } from "react";
import "./Roundel.css";
import type { HTMLAttributes } from "react";

interface Image {
    src: string;
    alt?: string;
    className?: string;
    style?: CSSProperties;
}

interface RoundelProps extends HTMLAttributes<HTMLElement> {
    image?: Image;
    children?: ReactNode;
    className?: string;
    href?: string;
    rounded?: boolean;
    alt?: string;
}

export default function Roundel({
rounded,
    image,
    children,
    style = { padding: "3%" },
    className = "",
    href,
}: RoundelProps): ReactNode {
    let Wrapper: ElementType;
    let props: object = {
        style,
    };

    if (href) {
        Wrapper = "a";
        props = {
            ...props,
            href: { href },
            target: "_blank",
            rel: "noopener noreferrer",
        };
    } else {
        Wrapper = "div";
    }

    const content = children ?? <img {...image} />;

    return (
        <Wrapper
        className={`d-flex justify-content-center align-items-center ${className} ${rounded?"rounded-circle":""} `}
            {...props}
        >
            {content}
        </Wrapper>
    );
}
