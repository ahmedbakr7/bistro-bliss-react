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
import { toast } from "react-toastify";

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
            toast.success("Login successful");
        },
        onError: (error: unknown) => {
            const message =
                (typeof error === "object" && error && "message" in error
                    ? (error as { message?: string }).message
                    : undefined) || "Login failed";
            toast.error(message);
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
                {() => (
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
                    </>
                )}
            </Form>
        </div>
    );
}
