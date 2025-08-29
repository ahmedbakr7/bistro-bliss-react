import { type ReactNode, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useOtpInput } from "./useOtpInput";

export interface OtpInputComponentProps {
    value: string;
    onChange: (otp: string) => void;
    length?: number;
    disabled?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    onComplete?: (otp: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    className?: string;
}

export default function OtpInputComponent({
    value,
    onChange,
    length = 6,
    disabled = false,
    hasError = false,
    errorMessage,
    onComplete,
    placeholder = "○",
    autoFocus = true,
    className = "",
}: OtpInputComponentProps): ReactNode {
    const { setOtp, clear, inputRef } = useOtpInput({
        length,
        onComplete,
        onOtpChange: onChange,
        autoFocus,
    });

    // Sync external value changes
    useEffect(() => {
        if (value !== "") {
            setOtp(value);
        }
    }, [value, setOtp]);

    const inputStyle: React.CSSProperties = {
        width: "3rem",
        height: "3rem",
        margin: "0 0.25rem",
        fontSize: "1.25rem",
        borderRadius: "8px",
        border: hasError
            ? "2px solid var(--color-danger-500, #dc3545)"
            : "2px solid var(--color-neutral-300, #dee2e6)",
        textAlign: "center",
        fontWeight: "600",
        backgroundColor: disabled
            ? "var(--color-neutral-100, #f8f9fa)"
            : "var(--color-neutral-50, #ffffff)",
        color: disabled
            ? "var(--color-neutral-400, #6c757d)"
            : "var(--color-neutral-800, #343a40)",
        transition: "all 0.2s ease-in-out",
        outline: "none",
    };

    return (
        <div className={`otp-input-container ${className}`}>
            <OtpInput
                value={value}
                onChange={onChange}
                numInputs={length}
                shouldAutoFocus={autoFocus}
                renderInput={(props, index) => (
                    <input
                        {...props}
                        ref={index === 0 ? inputRef : undefined}
                        disabled={disabled}
                        style={{
                            ...inputStyle,
                            ...(props.style || {}),
                        }}
                        onFocus={(e) => {
                            props.onFocus?.(e);
                            e.target.style.borderColor =
                                "var(--color-primary-500, #0d6efd)";
                            e.target.style.boxShadow =
                                "0 0 0 3px var(--color-primary-100, rgba(13, 110, 253, 0.25))";
                        }}
                        onBlur={(e) => {
                            props.onBlur?.(e);
                            e.target.style.borderColor = hasError
                                ? "var(--color-danger-500, #dc3545)"
                                : "var(--color-neutral-300, #dee2e6)";
                            e.target.style.boxShadow = "none";
                        }}
                        placeholder={placeholder}
                        aria-label={`OTP digit ${index + 1}`}
                        autoComplete="one-time-code"
                    />
                )}
                containerStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                }}
            />

            {hasError && errorMessage && (
                <div
                    className="invalid-feedback d-block text-center mt-2"
                    role="alert"
                    style={{
                        fontSize: "0.875rem",
                        color: "var(--color-danger-500, #dc3545)",
                    }}
                >
                    {errorMessage}
                </div>
            )}

            <div className="otp-actions mt-3 text-center">
                <button
                    type="button"
                    onClick={clear}
                    disabled={disabled || !value}
                    className="btn btn-link text-decoration-none p-0"
                    style={{
                        fontSize: "0.875rem",
                        color:
                            disabled || !value
                                ? "var(--color-neutral-400, #6c757d)"
                                : "var(--color-primary-500, #0d6efd)",
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
