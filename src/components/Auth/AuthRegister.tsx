import { type ReactNode } from "react";
import Form from "../Form/Form";
import { resetRegister, submitRegister } from "./AuthController";
import { registerSchema } from "../../schemas/auth/registerSchema";
import Input from "../Form/Input";

export interface RegisterDataType {
    fullname: string;
    phoneNumber: string;
    termsOfServices: boolean;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function AuthRegister(): ReactNode {
    return (
        <div
            className="p-5 theme-bg-main rounded shadow-lg"
            style={{ width: "100%", maxWidth: "800px" }}
        >
            <Form<RegisterDataType>
                initialValues={{
                    fullname: "",
                    phoneNumber: "",
                    termsOfServices: false,
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                onReset={resetRegister}
                onSubmit={submitRegister}
                validationSchema={registerSchema}
            >
                {(formProps) => (
                    <>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="fullNameFormControl"
                                        className="form-label"
                                    >
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="form-control"
                                        name="fullname"
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
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="form-control"
                                        name="email"
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
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="form-control"
                                        name="phoneNumber"
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
                                    <Input
                                        type="password"
                                        placeholder="Create a password"
                                        className="form-control"
                                        name="password"
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
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="form-control"
                                        name="confirmPassword"
                                        id="confirmPasswordFormControl"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-check mb-3 mt-2">
                            <Input
                                className="form-check-input"
                                type="checkbox"
                                name="termsOfServices"
                                id="termsCheck"
                            />
                            <label
                                className="form-check-label small"
                                htmlFor="termsCheck"
                            >
                                I agree to the Terms of Service and Privacy
                                Policy
                            </label>
                        </div>

                        <button type="submit" className="theme-button w-100">
                            Create Account
                        </button>

                        <div className="text-center mt-3">
                            <span className="text-muted small">
                                Already have an account?{" "}
                            </span>
                            <a href="#" className="small theme-text-primary">
                                Sign In
                            </a>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
