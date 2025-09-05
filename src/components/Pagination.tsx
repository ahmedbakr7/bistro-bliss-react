import type { ReactNode } from "react";

interface PaginationConfig {
    count: number; // total number of pages (>=1)
    index: number; // current page number (1-based)
}

interface PaginationProps extends PaginationConfig {
    ariaLabel?: string;
    handleChange: (pageNumber: number) => void; // now receives 1-based page number
    maxLength?: number; // optional max visible length before condensing with ellipsis
}

export default function Pagination({
    ariaLabel = "Search results pages",
    handleChange,
    count = 0,
    index = 1, // 1-based default
    maxLength = 7,
}: PaginationProps): ReactNode {
    // Guard: nothing to paginate
    if (count <= 1) return null;

    // Clamp current (1-based)
    const current = Math.min(Math.max(index, 1), count);

    type PageToken = number | "ellipsis";

    function buildPages(
        total: number,
        currentPage: number,
        max: number
    ): PageToken[] {
        if (total <= max) return Array.from({ length: total }, (_, i) => i + 1); // [1..total]

        const pages: PageToken[] = [];
        const showNeighbours = 1; // pages adjacent to current
        const first = 1;
        const last = total;
        const start = Math.max(currentPage - showNeighbours, first + 1); // keep first separate
        const end = Math.min(currentPage + showNeighbours, last - 1); // keep last separate

        pages.push(first);
        if (start > first + 1) pages.push("ellipsis");

        for (let p = start; p <= end; p++) pages.push(p);

        if (end < last - 1) pages.push("ellipsis");
        pages.push(last);
        return pages;
    }

    function goTo(p: number) {
        if (p !== current && p >= 1 && p <= count) handleChange(p);
    }

    const pages = buildPages(count, current, maxLength);

    const previousDisabled = current <= 1;
    const nextDisabled = current >= count;

    return (
        <nav aria-label={ariaLabel}>
            <ul className="pagination ">
                <li
                    className={`page-item${
                        previousDisabled ? " disabled" : ""
                    }`}
                >
                    <button
                        type="button"
                        className="page-link"
                        aria-label="Previous page"
                        onClick={() => !previousDisabled && goTo(current - 1)}
                        disabled={previousDisabled}
                    >
                        Previous
                    </button>
                </li>
                {pages.map((p, i) => {
                    if (p === "ellipsis") {
                        return (
                            <li key={`e-${i}`} className="page-item disabled">
                                <span className="page-link">…</span>
                            </li>
                        );
                    }
                    const isActive = p === current;
                    return (
                        <li
                            key={p}
                            className={`page-item${isActive ? " active" : ""}`}
                        >
                            <button
                                type="button"
                                className="page-link"
                                aria-current={isActive ? "page" : undefined}
                                onClick={() => goTo(p)}
                                aria-label={`Page ${p}`}
                            >
                                {p}
                            </button>
                        </li>
                    );
                })}
                <li className={`page-item${nextDisabled ? " disabled" : ""}`}>
                    <button
                        type="button"
                        className="page-link"
                        aria-label="Next page"
                        onClick={() => !nextDisabled && goTo(current + 1)}
                        disabled={nextDisabled}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
