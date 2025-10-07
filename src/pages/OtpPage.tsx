import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { paths } from "../utils/routes/routePaths";
import Otp from "../components/otp/Otp";
import { verifyOtp } from "../services/otpApi";
import { toast } from "react-toastify";

export default function OtpPage(): ReactNode {
    const [resendCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [otpValue, setOtpValue] = useState("");

    const navigate = useNavigate();

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
        mutationFn: async (otp: string) => verifyOtp(otp),
        onSuccess: () => {
            toast.success("OTP verified. Redirecting to login...");
            setTimeout(() => {
                navigate(paths.login, { replace: true });
            }, 1500);
        },
        onError: (error) => {
            console.error("OTP verification failed:", error);
            toast.error("Invalid or expired OTP");
        },
    });

    // Resend OTP mutation
    const handleSubmit = () => {
        try {
            verifyMutation.mutateAsync(otpValue);
        } catch {
            // Error handled by mutation
        }
    };

    return (
        <div
            className="shadow-lg rounded p-5 align-items-center"
            style={{ maxWidth: 420 }}
        >
            <h4 className="mb-3">Enter the 6-digit code</h4>
            <p className="text-muted small mb-4">
                We have sent a one-time code to your email / phone. Please enter
                it below.
            </p>

            <div className="d-flex flex-column gap-3">
                <div>
                    <Otp
                        otpInputStyle={{ width: "50px", textAlign: "center" }}
                        length={6}
                        shouldAutoFocus
                        shouldAutoSubmit={false}
                        value={""}
                        onChangeOtp={(v) => {
                            // setFieldValue("otp", v);
                            setOtpValue(v);
                        }}
                        // RenderSeparator={<span className="mx-1">o</span>}
                        className="w-100"
                    />
                    {verifyMutation.isError && (
                        <div className="text-danger small mt-1">
                            {(verifyMutation.error as Error).message}
                        </div>
                    )}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <button
                        type="button"
                        className="btn btn-link theme-text-primary p-0"
                    >
                        {canResend ? "Resend Code" : `Resend in ${timeLeft}s`}
                    </button>
                    <span className="text-muted small">
                        Attempts: {resendCount}
                    </span>
                </div>
                <div className="d-flex gap-2">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="theme-button flex-grow-1"
                        disabled={
                            verifyMutation.isPending ||
                            otpValue.length !== 6 ||
                            !!verifyMutation.isError
                        }
                    >
                        {verifyMutation.isPending ? "Verifying..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
