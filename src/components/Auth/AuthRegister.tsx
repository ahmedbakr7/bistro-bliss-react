import { type ReactNode } from "react";

export default function AuthRegister(): ReactNode {
    return (
        <div
            className="p-5 theme-bg-main rounded shadow-lg"
            style={{ width: "100%", maxWidth: "800px" }}
        >
            <div className="row g-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label
                            htmlFor="fullNameFormControl"
                            className="form-label"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="form-control"
                            id="fullNameFormControl"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label
                            htmlFor="emailFormControl"
                            className="form-label"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="form-control"
                            id="emailFormControl"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label
                            htmlFor="phoneFormControl"
                            className="form-label"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="form-control"
                            id="phoneFormControl"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label
                            htmlFor="passwordFormControl"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="form-control"
                            id="passwordFormControl"
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label
                            htmlFor="confirmPasswordFormControl"
                            className="form-label"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="form-control"
                            id="confirmPasswordFormControl"
                        />
                    </div>
                </div>
            </div>

            <div className="form-check mb-3 mt-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheck"
                />
                <label className="form-check-label small" htmlFor="termsCheck">
                    I agree to the Terms of Service and Privacy Policy
                </label>
            </div>

            <button className="theme-button w-100">Create Account</button>

            <div className="text-center mt-3">
                <span className="text-muted small">
                    Already have an account?{" "}
                </span>
                <a href="#" className="small theme-text-primary">
                    Sign In
                </a>
            </div>
        </div>
    );
}
