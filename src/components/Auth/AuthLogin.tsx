import type { ReactNode } from "react";

export default function AuthLogin(): ReactNode {
    return <div
        className="p-4 theme-bg-main rounded shadow-lg"
        style={{ width: "100%", maxWidth: "500px" }}
    >
        <div className="mb-3">
            <label htmlFor="emailFormControl" className="form-label">
                Email
            </label>
            <input
                type="text"
                placeholder="Email"
                className="form-control"
                id="emailFormControl" />
        </div>
        <div className="mb-3">
            <label htmlFor="passwordFormControl" className="form-label">
                Password
            </label>
            <input
                type="text"
                placeholder="Password"
                className="form-control"
                id="passwordFormControl" />
        </div>
        <button className="theme-button w-100">Login</button>
    </div>;
}
