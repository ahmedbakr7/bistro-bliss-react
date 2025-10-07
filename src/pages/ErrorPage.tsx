import type { ReactNode } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import Section from "../components/Section";
import { paths } from "../utils/routes/routePaths";

interface ErrorPageProps {
    status?: number;
    title?: string;
    message?: string;
}

// Centralized App Error Page styled with existing theme utilities
export default function ErrorPage(props: ErrorPageProps): ReactNode {
    const routeError = useRouteError();
    let status = props.status ?? 500;
    let title = props.title ?? "Something went wrong";
    let message =
        props.message ?? "An unexpected error occurred. Please try again.";

    if (isRouteErrorResponse(routeError)) {
        status = routeError.status;
        if (status === 404) {
            title = "Page Not Found";
            message =
                "The page you are looking for might have been removed, had its name changed or is temporarily unavailable.";
        } else if (status === 401) {
            title = "Unauthorized";
            message = "You are not authorized to view this page.";
        } else if (status === 403) {
            title = "Forbidden";
            message = "You don't have permission to access this resource.";
        } else if (status >= 500) {
            title = "Server Error";
            message =
                "We're experiencing issues right now. Please try again later.";
        }
    }

    return (
        <main
            className="theme-bg-surface d-flex align-items-center justify-content-center"
            style={{ minHeight: "75vh" }}
        >
            <Section
                className="w-100 d-flex justify-content-center"
                style={{ maxWidth: "980px" }}
            >
                <div className="w-100 theme-card-border theme-bg-surface-elevated p-5 d-flex flex-column flex-lg-row align-items-center gap-5">
                    <div className="flex-fill text-center text-lg-start">
                        <p
                            className="mb-1 theme-text-secondary"
                            style={{ letterSpacing: "0.15em" }}
                        >
                            ERROR {status}
                        </p>
                        <h1
                            className="mb-3"
                            style={{
                                fontFamily: "var(--font-family-heading)",
                                fontSize: "clamp(2rem,5vw,3.5rem)",
                                lineHeight: 1.1,
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            className="theme-text-tertiary mb-4"
                            style={{ maxWidth: 560 }}
                        >
                            {message}
                        </p>
                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                            <Link
                                to={paths.homePage}
                                className="theme-btn theme-btn-primary"
                            >
                                Go Home
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
                                className="theme-btn theme-btn-outline"
                            >
                                Reload
                            </button>
                            <Link
                                to={paths.contact}
                                className="theme-btn theme-btn-secondary"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                    <div className="flex-fill d-flex justify-content-center">
                        <div
                            className="theme-bg-primary d-flex flex-column justify-content-center align-items-center p-4 p-md-5 theme-rounded-lg theme-shadow-md"
                            style={{ minWidth: 260, aspectRatio: "1 / 1" }}
                        >
                            <span
                                style={{
                                    fontSize: "5rem",
                                    fontFamily: "var(--font-family-heading)",
                                    lineHeight: 1,
                                }}
                            >
                                {status}
                            </span>
                            <span className="mt-2" style={{ fontWeight: 500 }}>
                                Error
                            </span>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
