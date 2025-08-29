import { useState, useCallback, useRef, useEffect } from "react";

export interface UseOtpInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
    onOtpChange?: (otp: string) => void;
    autoFocus?: boolean;
}

export interface UseOtpInputReturn {
    otp: string;
    setOtp: (otp: string) => void;
    isComplete: boolean;
    clear: () => void;
    focus: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

export const useOtpInput = ({
    length = 6,
    onComplete,
    onOtpChange,
    autoFocus = true,
}: UseOtpInputProps = {}): UseOtpInputReturn => {
    const [otp, setOtp] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const isComplete = otp.length === length;

    // Handle OTP change
    const handleOtpChange = useCallback(
        (newOtp: string) => {
            setOtp(newOtp);
            onOtpChange?.(newOtp);

            // Call onComplete when OTP is fully entered
            if (newOtp.length === length) {
                onComplete?.(newOtp);
            }
        },
        [length, onComplete, onOtpChange]
    );

    // Clear OTP
    const clear = useCallback(() => {
        setOtp("");
        onOtpChange?.("");
    }, [onOtpChange]);

    // Focus input
    const focus = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    // Auto focus on mount
    useEffect(() => {
        if (autoFocus) {
            focus();
        }
    }, [autoFocus, focus]);

    return {
        otp,
        setOtp: handleOtpChange,
        isComplete,
        clear,
        focus,
        inputRef,
    };
};
