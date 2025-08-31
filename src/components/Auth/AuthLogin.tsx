import { type ReactNode } from "react";
import Form from "../Form/Form";
import { loginSchema } from "../../schemas/auth/loginSchema";
import { resetLogin } from "./AuthController";
import Input from "../Form/Input";
import { useMutation } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import useAuthContext from "../../stores/AuthContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/routes/routePaths";

export interface LoginDataType {
    email: string;
    password: string;
}

export default function AuthLogin(): ReactNode {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginDataType) => {
            await login(loginData.email, loginData.password);
        },
        onSuccess: () => {
            console.log("Login successful!");
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    const handleSubmit = async (
        values: LoginDataType,
        { resetForm }: FormikHelpers<LoginDataType>
    ) => {
        await loginMutation.mutateAsync(values);
        resetForm();
        navigate(paths.homePage, { replace: true });
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                id="password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="theme-button w-100"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending
                                ? "Logging in..."
                                : "Login"}
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
                                    {(loginMutation.error as Error).message}
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
