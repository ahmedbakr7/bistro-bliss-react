import { useState, useEffect, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { type FormikHelpers } from "formik";
import { otpSchema, type OtpFormData } from "../schemas/auth";
import OtpInputComponent from "../components/otp/OtpInput";
import { paths } from "../utils/routes/routes";
import { otpApi } from "../services/otpApi";
import Form from "../components/Form/Form";

interface OtpLocationState {
    email?: string;
    phone?: string;
    type?: "email" | "phone";
}

export default function OtpPage(): ReactNode {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as OtpLocationState;

    const [resendCount, setResendCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Extract email or phone from state
    const contactInfo = state?.email || state?.phone;
    const contactType = state?.type || (state?.email ? "email" : "phone");

    // Countdown timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    // OTP verification mutation
    const verifyMutation = useMutation({
        mutationFn: (otp: string) =>
            otpApi.verify({
                otp,
                email: state?.email,
                phone: state?.phone,
            }),
        onSuccess: () => {
            // Redirect to dashboard or intended page
            navigate(paths.homePage, { replace: true });
        },
        onError: (error) => {
            console.error("OTP verification failed:", error);
        },
    });

    // Resend OTP mutation
    const resendMutation = useMutation({
        mutationFn: () =>
            otpApi.resend({
                email: state?.email,
                phone: state?.phone,
            }),
        onSuccess: () => {
            setResendCount(resendCount + 1);
            setTimeLeft(60);
            setCanResend(false);
        },
        onError: (error) => {
            console.error("Resend OTP failed:", error);
        },
    });

    // Redirect if no contact info provided
    if (!contactInfo) {
        navigate(paths.login, { replace: true });
        return null;
    }

    const handleSubmit = async (
        values: OtpFormData,
        { setSubmitting }: FormikHelpers<OtpFormData>
    ) => {
        try {
            await verifyMutation.mutateAsync(values.otp);
        } catch {
            // Error handled by mutation
        } finally {
            setSubmitting(false);
        }
    };

    const handleResend = () => {
        if (canResend && !resendMutation.isPending) {
            resendMutation.mutate();
        }
    };

    const formatContactInfo = (info: string, type: string) => {
        if (type === "email") {
            const [username, domain] = info.split("@");
            return `${username.slice(0, 2)}****@${domain}`;
        } else {
            return `****${info.slice(-4)}`;
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center theme-bg-main">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4 p-md-5">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <h2 className="h3 theme-text-primary fw-bold mb-2">
                                    Verify Your
                                    {contactType === "email"
                                        ? "Email"
                                        : "Phone"}
                                </h2>
                                <p className="text-muted mb-0">
                                    We've sent a 6-digit verification code to
                                </p>
                                <p className="fw-semibold theme-text-secondary">
                                    {formatContactInfo(
                                        contactInfo,
                                        contactType
                                    )}
                                </p>
                            </div>

                            <Form
                                initialValues={{ otp: "" }}
                                validationSchema={otpSchema}
                                onSubmit={handleSubmit}
                                onReset={() => {}}
                            >
                                {({
                                    values,
                                    setFieldValue,
                                    errors,
                                    touched,
                                    isSubmitting,
                                }) => (
                                    <>
                                        <div className="mb-4">
                                            <label className="form-label text-center d-block mb-3">
                                                Enter verification code
                                            </label>
                                            <OtpInputComponent
                                                value={values.otp}
                                                onChange={(otp) =>
                                                    setFieldValue("otp", otp)
                                                }
                                                length={6}
                                                disabled={isSubmitting}
                                                hasError={
                                                    !!(
                                                        errors.otp &&
                                                        touched.otp
                                                    )
                                                }
                                                errorMessage={errors.otp}
                                                onComplete={(otp) => {
                                                    setFieldValue("otp", otp);
                                                }}
                                                autoFocus
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={
                                                isSubmitting ||
                                                values.otp.length !== 6
                                            }
                                            className="btn theme-button w-100 mb-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Verifying...
                                                </>
                                            ) : (
                                                "Verify Code"
                                            )}
                                        </button>

                                        {/* Error Message */}
                                        {verifyMutation.isError && (
                                            <div
                                                className="alert alert-danger"
                                                role="alert"
                                            >
                                                <small>
                                                    {
                                                        verifyMutation.error
                                                            ?.message
                                                    }
                                                </small>
                                            </div>
                                        )}

                                        {/* Success Message */}
                                        {resendMutation.isSuccess && (
                                            <div
                                                className="alert alert-success"
                                                role="alert"
                                            >
                                                <small>
                                                    New verification code sent!
                                                </small>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Form>

                            {/* Resend Section */}
                            <div className="text-center">
                                <p className="text-muted mb-2">
                                    Didn't receive the code?
                                </p>
                                {canResend ? (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={resendMutation.isPending}
                                        className="btn btn-link p-0 theme-text-primary text-decoration-none"
                                    >
                                        {resendMutation.isPending ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-1"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Sending...
                                            </>
                                        ) : (
                                            "Resend Code"
                                        )}
                                    </button>
                                ) : (
                                    <span className="text-muted">
                                        Resend in {timeLeft}s
                                    </span>
                                )}

                                {resendCount > 0 && (
                                    <div className="text-muted mt-1">
                                        <small>
                                            Resent {resendCount} time
                                            {resendCount > 1 ? "s" : ""}
                                        </small>
                                    </div>
                                )}
                            </div>

                            {/* Back to Login */}
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(paths.login)}
                                    className="btn btn-link text-decoration-none theme-text-secondary"
                                >
                                    ← Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
