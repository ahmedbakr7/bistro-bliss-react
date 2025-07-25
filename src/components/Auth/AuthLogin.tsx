import { useState, type ReactNode } from "react";
import Form from "../Form/Form";
import { loginSchema } from "../../schemas/auth/loginSchema";
import { resetLogin, submitLogin } from "./AuthController";
import Input from "../Form/Input";
import { useMutation } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";

export interface LoginDataType {
    email: string;
    password: string;
}

export default function AuthLogin(): ReactNode {
    const emailSubmittions = useState<boolean>(true);

    const EmailComponent: ReactNode = (
        <>
            <label htmlFor="email" className="form-label">
                Email
            </label>
            <Input
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                id="email"
            />
        </>
    );

    const PasswordComponent: ReactNode = (
        <>
            <label htmlFor="email" className="form-label">
                Email
            </label>
            <Input
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                id="email"
            />
        </>
    );

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginDataType) => {
            return await submitLogin(loginData);
        },
        onSuccess: () => {
            // Handle successful login - UI will show success message
            console.log("Login successful!");
        },
        onError: (error) => {
            // Handle login error - UI will show error message
            console.error("Login failed:", error);
        },
    });

    // Custom submit handler that uses the mutation
    const handleSubmit = async (
        values: LoginDataType,
        { resetForm }: FormikHelpers<LoginDataType>
    ) => {
        try {
            await loginMutation.mutateAsync(values);
            // Reset form on successful submission
            resetForm();
        } catch (error) {
            // Error is handled by the mutation's onError callback
            console.log(error);
        }
    };

    return (
        <div
            className="p-4 theme-bg-main rounded shadow-lg"
            style={{ width: "100%", maxWidth: "500px" }}
        >
            <Form<LoginDataType>
                validationSchema={loginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                onReset={resetLogin}
            >
                {(formProps) => (
                    <>
                        <div className="mb-3">
                        {emailSubmittions ? EmailComponent : PasswordComponent}
                        </div>
                        <button type="submit" className="theme-button w-100">
                            Login
                        </button>
                        {loginMutation.isError && (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                Failed to sign in. Please check your credentials
                                and try again.
                                <br />
                                <b>Error:</b>{" "}
                                <span className="subtitle">
                                    {loginMutation.error.message}
                                </span>
                            </div>
                        )}

                        {/* Display success message if mutation succeeded */}
                        {loginMutation.isSuccess && (
                            <div
                                className="alert alert-success mt-3"
                                role="alert"
                            >
                                Successfully signed in! Welcome back.
                            </div>
                        )}
                    </>
                )}
            </Form>
        </div>
    );
}
