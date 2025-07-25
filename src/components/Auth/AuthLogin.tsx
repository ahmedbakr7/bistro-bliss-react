import type { ReactNode } from "react";
import Form from "../Form/Form";
import { loginSchema } from "../../schemas/auth/loginSchema";
import { resetLogin, submitLogin } from "./AuthController";
import Input from "../Form/Input";

interface LoginDataType {
    email: string;
    password: string;
}

export default function AuthLogin(): ReactNode {
    return (
        <div
            className="p-4 theme-bg-main rounded shadow-lg"
            style={{ width: "100%", maxWidth: "500px" }}
        >
            <Form<LoginDataType>
                validationSchema={loginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={submitLogin}
                onReset={resetLogin}
            >
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
                <button type="submit" className="theme-button w-100">
                    Login
                </button>
            </Form>
        </div>
    );
}
