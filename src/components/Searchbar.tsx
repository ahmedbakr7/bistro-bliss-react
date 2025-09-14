import { useRef } from "react";
import type { ChangeEvent, JSX } from "react";

interface SearchbarProps {
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    debounce?: number; // ms
}

function Searchbar({
    onChange,
    placeholder = "Search for Movies...",
    className = "",
    debounce = 500,
}: SearchbarProps): JSX.Element {
    const lastChange = useRef<number | null>(null);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        if (lastChange.current !== null) {
            window.clearTimeout(lastChange.current);
        }

        lastChange.current = window.setTimeout(() => {
            lastChange.current = null;
            onChange(value);
        }, debounce);
    }

    return (
        <div className={`container my-4 ${className}`}>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="input-group shadow-sm rounded-pill overflow-hidden">
                        <span className="input-group-text bg-white border-0">
                            <i className="bi bi-search" />
                        </span>
                        <input
                            type="search"
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="form-control border-0"
                            aria-label={placeholder}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Searchbar;
