import { useRef, type ReactNode } from "react";
import Form from "../Form/Form";
import { resetRegister, submitRegister } from "./AuthController";
import { registerSchema } from "../../schemas/auth/registerSchema";
import Input from "../Form/Input";
import { useMutation } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import FileUploader from "../FileUploader";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../utils/routes/routePaths";

export interface RegisterDataType {
    name: string;
    phoneNumber: string;
    termsOfServices: boolean;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: File;
}

export default function AuthRegister(): ReactNode {
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: async (values: RegisterDataType) => {
            return await submitRegister(values);
        },
        onSuccess: () => {
            console.log("Registration successful!");
            navigate(paths.otp);
        },
        onError: (error) => {
            // Handle registration error - UI will show error message
            console.error("Registration failed:", error);
        },
    });

    // Custom submit handler that uses the mutation
    const handleSubmit = async (
        values: RegisterDataType,
        { resetForm }: FormikHelpers<RegisterDataType>
    ) => {
        const newValues = { ...values };
        newValues.profileImage = fileUpload.current?.files?.[0];
        await registerMutation.mutateAsync(newValues);
        resetForm();
        navigate(paths.otp);
    };

    const fileUpload = useRef<HTMLInputElement>(undefined);

    return (
        <div
            className="p-5 theme-bg-main rounded shadow-lg"
            style={{ width: "100%", maxWidth: "800px" }}
        >
            <Form<RegisterDataType>
                initialValues={{
                    name: "",
                    phoneNumber: "",
                    termsOfServices: false,
                    email: "",
                    password: "",
                    confirmPassword: "",
                    profileImage: undefined,
                }}
                onReset={resetRegister}
                onSubmit={handleSubmit}
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
                                        name="name"
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
                            <div className="col-12">
                                <div className="mb-3">
                                    <label
                                        htmlFor="profileImageFormControl"
                                        className="form-label"
                                    >
                                        Profile Image (Optional)
                                    </label>
                                    <FileUploader
                                        ref={fileUpload}
                                        name="profileImage"
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

                        <button
                            type="submit"
                            className="theme-button w-100"
                            disabled={registerMutation.isPending}
                        >
                            Create Account
                        </button>

                        <div className="text-center mt-3">
                            <span className="text-muted small me-2">
                                Already have an account?
                            </span>
                            <Link to={paths.login} className="small theme-text-primary">
                                Sign In
                            </Link>
                        </div>

                        {registerMutation.isError && (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                Failed to create account. Please try again.
                                <br />
                                <b>Error:</b>{" "}
                                <span className="subtitle">
                                    {registerMutation.error.message}
                                </span>
                            </div>
                        )}

                        {/* Display success message if mutation succeeded */}
                        {registerMutation.isSuccess && (
                            <div
                                className="alert alert-success mt-3"
                                role="alert"
                            >
                                Account created successfully! You can now sign
                                in with your credentials.
                            </div>
                        )}
                    </>
                )}
            </Form>
        </div>
    );
}
