import type { CSSProperties, ReactNode } from "react";

interface LinkType {
    text: string;
    href: string;
    [key: string]: unknown;
}

interface CardContainerProps {
    style?: CSSProperties;
    classes?: string;
    className?: string;
    imageOverlay?: boolean;
    image?: {
        src: string;
        alt?: string;
        [key: string]: unknown;
    };
    header?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    footer?: string;
    links?: LinkType[];
    [key: string]: unknown;
}

export default function Card({
imageOverlay=false,
    style,
    classes = "",
    className = "",
    image,
    header,
    title,
    subtitle,
    text,
    footer,
    links,
    ...props
}: CardContainerProps): ReactNode {

    return (
        <div
            style={style}
            className={className ? className : `card ${classes}`}
            {...props}
        >
                {image && <img className="card-img-top" {...image} />}
                <div className="card-header">{header}</div>
                <div className={ `card-${imageOverlay?"img-Overlay":"body"}` }>
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {subtitle}
                    </h6>
                    <p className="card-text">{text}</p>
                    {links?.map((link: LinkType, index) => {
                        const { text, href, ...restProps } = link;
                        return (
                            <a
                                key={index}
                                href={href}
                                className="card-link"
                                {...restProps}
                            >
                                {text}
                            </a>
                        );
                    })}
                </div>
                <div className="card-footer text-muted">{footer}</div>
        </div>
    );
}
